package models

import (
	"gorm.io/gorm"
)

// Structure to represent contact, either Traineer or Trainee.
type BaseContact struct {
	gorm.Model
	Id        uint64 // Id of the user who's requesting contacts
	IdContact uint64 // Id of contact
}

// Build a new baseContact
func NewBaseContact(
	id uint64,
	idContact uint64,
) BaseContact {
	return BaseContact{
		Id:        id,
		IdContact: idContact,
	}
}
