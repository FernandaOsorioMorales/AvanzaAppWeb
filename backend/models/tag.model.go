package models

import (
	"gorm.io/gorm"
)

type Tag struct {
	gorm.Model
	// Description of the tag
	Name string
	// Trainers belonging to this tag
	Trainers []*Trainer `gorm:"many2many:trainer_tags;"`
}
