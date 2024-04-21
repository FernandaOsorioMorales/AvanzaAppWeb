package controllers

import (
	"backend/models"

	"gorm.io/gorm"
)

// Creates a new exercise in the database.
// Returns error if an error occurs when creating
// the exercise.
func CreateExercise(db *gorm.DB, e *models.Exercise) error {

	err := db.Create(e).Error

	if err != nil {
		return err
	}

	return nil
}

// Returns all the exercises.
func GetExercises(db *gorm.DB) (*[]models.Exercise, error) {
	var exercises []models.Exercise

	err := db.Find(&exercises).Error

	if err != nil {
		return nil, err
	}

	return &exercises, nil
}
