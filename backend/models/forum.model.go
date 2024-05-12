package models

import (
	"gorm.io/gorm"
)

// A place where the comunity of trainers join up to discuss a topic.
// This topic may be whatever they choose.
type Forum struct {
	gorm.Model

	// Subject of the forum
	Topic string `gorm:"unique"`

	// Posts inside this forum
	Posts []Post
}
