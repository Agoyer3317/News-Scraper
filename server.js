// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var path = require('path');
var bodyParser = require('body-parser');
// Require request and cheerio. This makes the scraping possible


// Initialize Express
var app = express();

var PORT = process.env.PORT || 8080;

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: path.join(__dirname, 'app/views/layouts/main.handlebars') }));
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'app/views'));

// Hook mongojs configuration to the db variable
var db = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/MongoScraper", {useNewUrlParser: true});

// Import routes and give the server access to them.
var apiRoutes = require("./app/routes/api-routes.js");
var htmlRoutes = require("./app/routes/html-routes.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(apiRoutes);
app.use(htmlRoutes);


app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
