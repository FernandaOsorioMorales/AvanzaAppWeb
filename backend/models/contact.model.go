package models

import (
	"gorm.io/gorm"
)

// Structure to represent contact, either Traineer or Trainee.
type Contact struct {
	gorm.Model
	IdUser    uint // Id of the user who's requesting contacts
	IdContact uint // Id of contact
}

// Build a new baseContact
func NewContact(
	id uint,
	idContact uint,
) Contact {
	return Contact{
		IdUser:    id,
		IdContact: idContact,
	}
}
