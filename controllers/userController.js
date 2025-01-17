const { ObjectId } = require("mongoose").Types;
// require the user model
const { User, Thought } = require("../models");

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const userData = await User.find()
        .populate("thoughts")
        .populate({
          path: "friends",
          select: "-__v"
        })
        .select("-__v -password") // Exclude __v and password fields
        .exec();

        const usersWithFriendCount = userData.map(user => {
          const userObj = user.toObject(); // Convert Mongoose document to plain JavaScript object
          userObj.friendCount = user.friendCount; // Add the friendCount to the user object
          return userObj;
        });

      res.json(usersWithFriendCount);
    } catch (err) {
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
        .populate("friends");

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
    const { userId, friendId } = req.params;

    try {
      // creating the friend
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "no user with that id" });
      }

      user.friends.push(friendId);

      await user.save();

      return res.status(200).json({ message: "friend created", user });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a friend
  async deleteFriend(req, res) {
    const { userId, friendId } = req.params;

    try {
      const user = await User.findOne({
        _id: userId,
      });

      if (!user) {
        return res.status(404).json({ message: "no user with that id" });
      }

      const friendIndex = user.friends.findIndex(
        (friend) => friend._id.toString() === friendId
      );

      if (friendIndex === -1) {
        return res
          .status(404)
          .json({ message: "no friend with that id for this user" });
      }

      user.friends.splice(friendIndex, 1);
      await user.save();

      res.json({ message: "friend deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
