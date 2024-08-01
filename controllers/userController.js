const { ObjectId } = require("mongoose").Types;
// require the user model
const { User, Thought } = require("../models");

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const userData = await User.find()
        .populate("thoughts")
        .populate("friends");

      res.json(userData);
    } catch {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      })
        .populate("thoughts")
        .populate("friends")


      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body }
      );

      if (!user) {
        res.status(404).json({ message: "No user with this Id" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: "No user with that Id" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a friend
  async createFriend(req, res) {
    const { userId, friendId} = req.params;

    try {
      // creating the friend
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "no user with that id"});
      }

      user.friends.push(friendId);

      await user.save();

      return res.status(200).json({ message: "friend created", user });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a friend
};
