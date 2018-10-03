
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");

var router = express.Router();

var db = require("../models");


// Route for saving/updating an comments  associated a headline
router.post("/article/:id", function (req, res) {
  // Create a new comment in the db
  //pulling this from line for of index.js (models)
  db.Comment.create(req.body)
    .then(function (dbComment) {
      //pushing comments to the headline with the associated ID
      //on line 9 {_id: req.params.id} pulling id from whatever the user selected in the post route "/articles/:id"
      //pushing to comments field in headlines.js(models)
      console.log(dbComment);
      return db.Headline.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: dbComment._id } }, { new: true });
    })
    .then(function (dbHeadline) {
      // sending the information back to the client as a json object
      res.redirect(`/article/${req.params.id}`);
    })
    .catch(function (err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

router.get("/scrape", function (req, res) {
  // Make a request for the news section of `ycombinator`
  request("https://old.reddit.com/", function (error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $(".title").each(function (i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element).children("a").text();
      var link = $(element).children("a").attr("href");

      // If this found element had both a title and a link
      if (title && link) {
        // Insert the data in the scrapedData db
        db.Headline.create({
          headline: title,
          url: link,
          comments: []
        },
          function (err, inserted) {
            if (err) {
              // Log the error if one is encountered during the query
              console.log(err);
            }
            else {
              // Otherwise, log the inserted data
              console.log(inserted);
            }
          });
      }
    });
  });
  // Send a "Scrape Complete" message to the browser
  res.redirect('/');
});

// Export routes for server.js to use.
module.exports = router;

