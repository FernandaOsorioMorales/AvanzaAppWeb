package models

import (
	"time"

	"gorm.io/gorm"
)

// A user of the application, be a Trainer or Trainee.
// Enables the common functionality needed for all users.
type BaseUser struct {
	gorm.Model
	// Date of birth
	BirthDate	time.Time
	// Name by which the user want's to be referred as
	Alias 		string
	// Acts as the main identifier of the user on the platform
	Email 		string `gorm:"unique"` 
	// Phone number of the user, to be shared with trainers
	PhoneNumber string
	// Hashed password for the user (see tools/password.go)
	Password 	string
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
