package models

import (
	"gorm.io/gorm"
)

// Structure to represent contact, either Traineer or Trainee.
type Contact struct {
	gorm.Model
	IdTrainer    uint // Id of trainer
	IdUser		 uint // Id of user
}

// Build a new baseContact
func NewContact(
	IdTrainer uint,
	IdUser uint,
) Contact {
	return Contact{
		IdTrainer: IdTrainer,
		IdUser: IdUser,
	}
}
