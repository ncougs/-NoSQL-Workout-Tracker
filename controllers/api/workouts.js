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

        const workout = new Workout(data);
        workout.getTotalDuration();
     
        const newWorkout = await Workout.create(workout);
        
        res.json(newWorkout);
    }
    catch (err) {
        res.status(500).json(err);
    };
});

router.put("/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const data = req.body;
    
        const newExercise = await Exercise.create(data);
        const updatedExercise = await Workout.findOneAndUpdate({ _id }, { $push: { exercises: newExercise } }, { new: true });

        const currentWorkout = await Workout.findById(_id).populate('exercises');
        const totalDuration = currentWorkout.getTotalDuration();
   
        const updatedDuration = await Workout.updateOne({ _id }, { totalDuration });
        
        res.json(updatedDuration);
    }
    catch (err) {
        res.status(500).json(err);
    }
  });
  

module.exports = router;