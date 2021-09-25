const router = require('express').Router();
const { Workout, Exercise } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find({}).populate('exercises');
        res.json(workouts);
    }
    catch (err) {
      res.status(500).json(err);
    };
  });

  router.get('/range', async (req, res) => {
    try {
        const workouts = await Workout.find({}).populate('exercises');
        res.json(workouts.slice(-7));
    }
    catch (err) {
      res.status(500).json(err);
    };
  });

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newWorkout = await Workout.create(data);
        res.json(newWorkout);
    }
    catch (err) {
        res.status(500).json(err);
    };
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
    
        const newExercise = await Exercise.create(data);
        const currentWorkout = await Workout.findById(id);
        
        const addition = await currentWorkout.update({ $push: { exercises: newExercise } }, { new: true });
        res.json(addition);
    }
    catch (err) {
        res.status(500).json(err);
    }
  });
  

module.exports = router;