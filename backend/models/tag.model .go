package models

import (
	"gorm.io/gorm"
)

// Structure to represent a Tag.
// It will be the main structure to join workouts with tags.
// their workouts.
type Tag struct {
	gorm.Model
	Value      string // Workout name.
}

// Build a new Value
func NewValue(
	Value string,
) Tag {
	return Tag{
		Value: Value,
	}
}
