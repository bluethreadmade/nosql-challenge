// require router function of express
const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  getReaction,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

module.exports = router;

// /api/thoughts - create a thought
// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
router.route("/").get(getThoughts).post(createThought);

// GET to get a single thought by its _id /api/:thoughtId
// PUT to update a thought by its _id
// DELETE to remove a thought by its _id
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field
router
  .route("/:thoughtId/reactions")
  .get(getSingleThought)
  .post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
// DELETE to pull and remove a reaction by the reaction's reactionId value
router
  .route("/:thoughtId/reactions/:reactionId")
  .get(getReaction)
  .delete(deleteReaction);
