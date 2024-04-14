package models

import (
	"gorm.io/gorm"
)

// Structure to represent exercises.
type Exercise struct {
	gorm.Model
	Name        string // Name of the exercise.
	Description string // Exercise description.
}

// Build a new Training Plan.
func NewExercise(
	Name string,
	Description string,
) Exercise {
	return Exercise{
		Name:        Name,
		Description: Description,
	}
}
