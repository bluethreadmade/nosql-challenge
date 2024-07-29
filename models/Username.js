const { Schema } = require("mongoose");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// Schema to create User model
const usernameSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  // array of _id values referencing Thought model
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought'}],
      
  // array of _id values referencing User model
  friends:[{ type: Schema.Types.ObjectId, ref: 'User'}],

});

// Virtual called friendCount that retrieves the length of the user's friends array field on query.
usernameSchema.virtual('friendCount').get(function() {
    return this.friends.length();
})