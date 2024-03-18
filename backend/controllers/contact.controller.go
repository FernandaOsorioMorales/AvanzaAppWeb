package controllers

import (
	"backend/models"

	"gorm.io/gorm"
)

// Creates a new base contact and inserts it in the database.
func CreateBaseContact(db *gorm.DB,
	Id uint64,
	IdContact uint64) (*models.BaseContact, error) {

	c := models.NewBaseContact(Id, IdContact)

	err := db.Create(c).Error

	if err != nil {
		return nil, err
	}

	return &c, nil
}

// TODO return only idContact field
// Returns the contact list of a user.
func GetContactList(db *gorm.DB, id uint64) ([]models.BaseContact, error) {
	var contacts []models.BaseContact

	err := db.Where("Id = ?", id).First(&contacts).Error

	if err != nil {
		return nil, err
	}

	return contacts, nil
}
