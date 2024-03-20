package models

import (
	"gorm.io/gorm"
)

// Structure to represent contact, either Traineer or Trainee.
type Contact struct {
	gorm.Model
	IdUser    uint64 // Id of the user who's requesting contacts
	IdContact uint64 // Id of contact
}

// Build a new baseContact
func NewContact(
	id uint64,
	idContact uint64,
) Contact {
	return Contact{
		IdUser:    id,
		IdContact: idContact,
	}
}
