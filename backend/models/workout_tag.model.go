package models

import (
	"gorm.io/gorm"
)

// Structure to join exercises with tags.
type WorkoutTag struct {
	gorm.Model
	IdTag uint64 // Id of the tag.
	IdWorkout  uint64 // Id of the workout.
}

// Build a new Training Plan.
func NewWorkoutTag(
	IdTag uint64,
	IdWorkout uint64,
) WorkoutTag {
	return WorkoutTag{
		IdTag: IdTag,
		IdWorkout:  IdWorkout,
	}
}
