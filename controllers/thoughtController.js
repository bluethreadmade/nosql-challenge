// require the thought model
const { Thought } = require("../../models");

// /api/thoughts
// GET to get all thoughts
router.get("/", async (req, res) => {
  try {
    const thoughtData = await Thought.find({});
    res.json(thoughtData);
  } catch {
    console.log(err);
    res.status(500).json(err);
  }
});


