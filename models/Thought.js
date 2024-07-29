const { ObjectId } = require("bson");
const { Schema } = require("mongoose");

// Schema to create Thought model
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    // 1-280 char
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    // default to current time stamp
    default: Date.now,
    // getter method to format the timestamp on query
    // get: timeFormat
  },
  // user that created this thought
  userName: {
    type: String,
    required: true,
  },
  // array of nested docs created with the reactionSchema
  reactions: [
    {
      reactionId: {
        // Use Mongoose's ObjectId data type
        type: Schema.Types.ObjectId,
        // Default value is set to a new ObjectId
        default: new ObjectId
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
      },
      userName: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        // default to current time stamp
        default: Date.now,
        // getter method to format the timestamp on query
        // get: timeFormat
      },
    },
  ],
});

// Virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length();
});

// function timeFormat(createdAt) {

// }