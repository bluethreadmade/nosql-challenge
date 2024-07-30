// require router function of express
const router = require('express').Router();

// point userRoutes const to the userRoutes file
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');


router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;