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

	// Height of the user in cm
	Height uint
	// Weight of the user in kilograms
	Weight float32
	// Arm circumference in cm
	Arms uint
	// Waist circumference in cm
	Waist uint
	// Hip circumference in cm
	Hips uint
}
