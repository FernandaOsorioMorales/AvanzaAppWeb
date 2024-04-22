package models

import (
	"gorm.io/gorm"
)

type Trainer struct {
	gorm.Model

	// Focus of the personal trainer
	Specialty string

	// base user id (FK)
	BaseUserId int
	//base user linked to actual trainee user
	BaseUser BaseUser
}
