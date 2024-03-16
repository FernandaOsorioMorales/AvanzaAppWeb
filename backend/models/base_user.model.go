package models

import (
	"time"

	"gorm.io/gorm"
)

// A user of the application, be a Trainer or Trainee.
// Enables the common functionality needed for all users.
type BaseUser struct {
	gorm.Model
	BirthDate	time.Time // Date of birth
	Alias 		string // Name by which the user want's to be referred as
	Email 		string `gorm: "unique"` // Acts as the main identifier of the user on the platform
	PhoneNumber string // Phone number of the user, to be shared with trainers
	Password 	string // Hashed password for the user (see tools/password.go)
}

// Build a new baseUser
func BaseUserNew(
	birth time.Time,
	alias string,
	email string,
	phone string,
	password string,
) BaseUser {
	return BaseUser {
		BirthDate: birth,
		Alias: alias,
		Email: email,
		PhoneNumber: phone,
		Password: password,
	}
}
