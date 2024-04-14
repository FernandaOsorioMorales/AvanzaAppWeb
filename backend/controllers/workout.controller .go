package controllers

import (
	"backend/models"

	"gorm.io/gorm"
)

// Creates a new workout in the database.
// Returns error if an error occurs when creating
// the exercise.
func CreateWorkout(db *gorm.DB, w *models.Workout) error {

	err := db.Create(w).Error

	if err != nil {
		return err
	}

	return nil
}

// Returns all the workouts by trainer id.
func GetWorkoutsByTrainer(db *gorm.DB, idTrainer uint64) (*[]models.Workout, error) {
	var workouts []models.Workout

	err := db.Find(&workouts, "id_trainer = ?", idTrainer).Error

	if err != nil {
		return nil, err
	}

	return &workouts, nil
}
