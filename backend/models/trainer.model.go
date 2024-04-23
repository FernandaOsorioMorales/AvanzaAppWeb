package models

import (
	"gorm.io/gorm"
)

// A trainer of athletes in the app
type Trainer struct {
	gorm.Model

	// specialties of the personal trainer
	Specialties []*TrainerTag `gorm:"many2many:trainer_tags;"`

	// base user id (FK)
	BaseUserId uint
	// base user linked to this trainer
	BaseUser BaseUser
}
