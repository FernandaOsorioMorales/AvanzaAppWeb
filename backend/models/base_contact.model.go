package models

import (
	"gorm.io/gorm"
)

// Structure to represent contact, either Traineer or Trainee.
type BaseContact struct {
	gorm.Model
	Email        string // Email of the user who's requesting contacts
	EmailContact string // Email of contact
}

// Build a new baseContact
func NewBaseContact(
	email string,
	emailContact string,
) BaseContact {
	return BaseContact{
		Email:        email,
		EmailContact: emailContact,
	}
}
