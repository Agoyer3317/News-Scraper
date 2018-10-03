// Require mongoose
var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ExampleSchema object
// This is similar to a Sequelize model
var CommentsSchema = new Schema({

  comment: {
    type: String,
    trim: true,
    required: "String is Required"
  },
});

/**
 * // Before populating
 * {
 *  url: "https://whatever.com",
 *  headline: "SUp",
 *  comments: [13412341, 2351, 2, 5124, 612, 6]
 * }
 * 
 * // After populating
 * {
 *  url: "https://whatever.com",
 *  headline: "SUp",
 *  comments: [{_id: 13412341, comment: 'some comment' }, ...]
 * }
 */

// This creates our model from the above schema, using mongoose's model method
// "Headline" is the name of the collection
var CommentModel = mongoose.model("Comment", CommentsSchema);

// Export the Example model
module.exports = CommentModel;
