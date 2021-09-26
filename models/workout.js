const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: { 
      type: Date,
      default: Date.now 
    },
    exercises: [
        {
          type: Schema.Types.ObjectId,
          ref: "exercise"
        }
    ],
    totalDuration: {
      type: Number,
      default: 0
    }    
});

WorkoutSchema.methods.getTotalDuration = function() {
  this.totalDuration = this.exercises.reduce((a, b) => { return a + b.duration }, 0);
  return this.totalDuration;
};

const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;
