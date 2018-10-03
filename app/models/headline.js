// Require mongoose
var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ExampleSchema object
// This is similar to a Sequelize model
var HeadlineSchema = new Schema({

  headline: {
    type: String,
    trim: true,
    required: "String is Required"
  },
  url: {
    type: String,
    trim: true,
    required: "String is Required"
  }, 

    // `"comments.js"s` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the "comments.js" model
  // This allows us to populate the User with any associated "comments.js"s
  comments: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the "comments.js" model
      ref: "Comment"
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
// "Headline" is the name of the collection
var HeadlineModel = mongoose.model("Headline", HeadlineSchema);

// Export the Example model
module.exports = HeadlineModel;
