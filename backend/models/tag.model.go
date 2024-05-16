package models

import (
	"gorm.io/gorm"
)

// Structure to represent a Tag.
// It will be the main structure to join workouts with tags.
type Tag struct {
	gorm.Model
	Value      string // Tag name.
}

// Build a new Value
func NewTag(
	Value string,
) Tag {
	return Tag{
		Value: Value,
	}
}
