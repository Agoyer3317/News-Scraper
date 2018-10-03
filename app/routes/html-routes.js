
var express = require("express");

var router = express.Router();

var db = require("../models");


// Route for retrieving all Notes from the db
router.get("/", function (req, res) {
  // Find all Notes
  db.Headline.find({})
    .then(function (dbHeadline) {
      // 2nd param {headline: dbHeadline} headline comes from line 5 in index.handlebars
      //dbHeadline comes from line 12 in this file
      res.render("index", {headline: dbHeadline});

    })
    .catch(function (err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});



router.get("/article/:id", function (req, res) {
  //finding headlines by id
  db.Headline.findById(req.params.id)
    //populating from line 25 in headline.js
    .populate("comments")
    .then(function (dbHeadline) {
      // 2nd param {headline: dbHeadline} headline comes from line 5 in index.handlebars
      //dbHeadline comes from line 12 in this file
      res.render("article", dbHeadline);
      // res.json(dbHeadline);

    })
    .catch(function (err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

module.exports = router;