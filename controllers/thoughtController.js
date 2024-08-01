const { ObjectId } = require("mongoose").Types;
const mongoose = require("mongoose");
// require the thought model
const { Thought, User } = require("../models");

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find().populate("reactions");

      res.json(thoughtData);
    } catch {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      // creating the new thought
      const newThought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
        userId: req.body.userId,
      });

      // adding it to the user
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } },
        { new: true } // return the updated user doc
      );

      if (!updatedUser) {
        console.log(newThought);
        return res
          .status(404)
          .json({ message: "Sorry No user found with that Id" });
      }
      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    try {
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      };

      thought.reactions.push({ reactionBody, username });

      await thought.save();

      return res.status(200).json({ message: "reaction created", thought });
    } catch (err) {
      console.error(err);
      return res.statsus(500).json({ message: "server error" });
    }
  },

  async getReaction(req, res) {
    const { thoughtId, reactionId } = req.params;

    try {
      const thought = await Thought.findOne({
        _id: thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      const reaction = thought.reactions.find(
        (reaction) => reaction._id.toString() === reactionId
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "no reaction found in this thought with this id" });
      }

      res.json(reaction);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    const { thoughtId, reactionId } = req.params;

    try {
      const thought = await Thought.findOne({
        _id: thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      const reactionIndex = thought.reactions.findIndex(
        (reaction) => reaction._id.toString() === reactionId
      );

      if (reactionIndex === -1) {
        return res
          .status(404)
          .json({ message: "No reaction found in this thought with this ID" });
      }

      thought.reactions.splice(reactionIndex, 1);
      await thought.save();

      res.json({ message: "Reaction deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
