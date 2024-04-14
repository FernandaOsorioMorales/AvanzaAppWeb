package models

import (
	"gorm.io/gorm"
)

// Structure to join exercises with workouts.
type WorkoutExercise struct {
	gorm.Model
	IdExercise uint64 // Id of the exercise
	IdWorkout  uint64 // Id of the workout.
	Ordinal    uint8  // Ordinal of the exercise (first, second...).
	Sets       uint8  // Number of sets.
	Reps       uint16 // Number of repetitions.
}

// Build a new Training Plan.
func NewWorkoutExercise(
	IdExercise uint64,
	IdWorkout uint64,
	Ordinal uint8,
	Sets uint8,
	Reps uint16,
) WorkoutExercise {
	return WorkoutExercise{
		IdExercise: IdExercise,
		IdWorkout:  IdWorkout,
		Ordinal:    Ordinal,
		Sets:       Sets,
		Reps:       Reps,
	}
}
