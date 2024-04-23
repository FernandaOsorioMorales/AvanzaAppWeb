package models

import (
	"gorm.io/gorm"
)

// Athlete, a user that wants training in a sport or discipline
type User struct {
	gorm.Model

	// base user id (FK)
	BaseUserId uint
	// base user linked to this athlete
	BaseUser BaseUser
}
