// require router function of express
const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController');

module.exports = router;

// /api/users
// GET all users
router.route('/').get(getUsers);

// GET a single user by its _id and populated thought and friend data
//router.route('/:userId').get(getUsers).get(getThoughts)

// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }

// POST to create a user
router.route('/').get(getUsers).post(createUser);

// PUT to update a user by its _id
router.route('/:userId').get(getSingleUser).put(updateUser);

// DELETE to remove user by its _id
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// BONUS: Remove a user's associated thoughts when deleted.

// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list

module.exports = router;
