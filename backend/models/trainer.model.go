package models

import (
	"gorm.io/gorm"
)

// A trainer of athletes in the app
type Trainer struct {
	gorm.Model

	// specialties of the personal trainer
	Specialties []*TrainerSpecialty `gorm:"many2many:specialty_trainer;"`

	// Posts liked by the trainer
	Likes []*Post `gorm:"many2many:likes;"`

	// base user id (FK)
	BaseUserId uint
	// base user linked to this trainer
	BaseUser BaseUser
}
