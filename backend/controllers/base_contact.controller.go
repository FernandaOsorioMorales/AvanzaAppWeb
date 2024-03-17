package controllers

import (
	"backend/models"

	"gorm.io/gorm"
)

// Creates a new base contact and inserts it in the database.
func CreateBaseContact(db *gorm.DB,
	email string,
	emailContact string) (*models.BaseContact, error) {

	c := models.NewBaseContact(email, emailContact)

	err := db.Create(c).Error

	if err != nil {
		return nil, err
	}

	return &c, nil
}

// TODO return only emailContact field
// Returns the contact list of a usar.
func GetContactList(db *gorm.DB, email string) ([]models.BaseContact, error) {
	var contacts []models.BaseContact

	err := db.Where("email = ?", email).First(&contacts).Error

	if err != nil {
		return nil, err
	}

	return contacts, nil
}
