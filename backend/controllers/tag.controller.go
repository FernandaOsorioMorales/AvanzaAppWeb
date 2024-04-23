package controllers

import (
	"backend/models"

	"gorm.io/gorm"
)

// Creates a new Tag in the database.
// Returns error if an error occurs when creating
// the exercise.
func CreateTag(db *gorm.DB, t *models.Tag) error {

	err := db.Create(t).Error

	if err != nil {
		return err
	}

	return nil
}

// Returns all the exercises.
func GetTags(db *gorm.DB) (*[]models.Tag, error) {
	var tags []models.Tag

	err := db.Find(&tags).Error

	if err != nil {
		return nil, err
	}

	return &tags, nil
}
