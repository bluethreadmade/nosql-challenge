const { Schema } = require("mongoose");

// Schema to create User model
const usernameSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    // trimmed
  },
  email: {
    type: String,
    unique: true,
    required: true,
    // must be a valid email
  },
  thoughts: {
    // array of _id values referencing Thought model
  },
  friends: {
    // array of _id values referencing User model
  },
  // Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
});
