package controllers

import (
	"backend/models"

	"gorm.io/gorm"
)

// Creates a new base contact and inserts it in the database.
func CreateContact(db *gorm.DB,
	Id uint64,
	IdContact uint64) (*models.Contact, error) {

	c := models.NewContact(Id, IdContact)

	err := db.Create(c).Error

	if err != nil {
		return nil, err
	}

	return &c, nil
}

// TODO return only idContact field
// Returns the contact list of a user.
func GetContactList(db *gorm.DB, id uint64) ([]models.Contact, error) {
	var contacts []models.Contact

	err := db.Where("Id = ?", id).Find(&contacts).Error

	if err != nil {
		return nil, err
	}

	return contacts, nil
}
