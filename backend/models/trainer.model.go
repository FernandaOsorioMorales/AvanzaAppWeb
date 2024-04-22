package models

import (
	"gorm.io/gorm"
)

type Trainer struct {
	gorm.Model

	// specialties of the personal trainer
	Specialties []*Tag `gorm:"many2many:trainer_tags;"`

	// base user id (FK)
	BaseUserId int
	//base user linked to actual trainee user
	BaseUser BaseUser
}
