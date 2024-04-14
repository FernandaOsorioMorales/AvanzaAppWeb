package models

import (
	"gorm.io/gorm"
)

// Structure to represent a workout.
// It will be the main structure to join workouts with exercise.
// their workouts.
type Workout struct {
	gorm.Model
	IdTrainer uint64 // Id of the workout.
	Name      string // Workout name.
}

// Build a new Workout
func NewWorkout(
	IdTrainer uint64,
	Name string,
) Workout {
	return Workout{
		IdTrainer: IdTrainer,
		Name:      Name,
	}
}
