const router = require('express').Router();

const userRoutes = require('./workouts');

router.use('/workouts', userRoutes);

module.exports = router;