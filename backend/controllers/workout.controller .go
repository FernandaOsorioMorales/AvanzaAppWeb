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

// Returns all the workouts by trainer id.
func GetWorkoutByNameAndTrainer(db *gorm.DB, idT uint64, name string) (*models.Workout, error) {
	var workout models.Workout

	err := db.Where("name = ? and id_trainer = ?", name, idT).Find(&workout).Error

	if err != nil {
		return nil, err
	}

	return &workout, nil
}

// Returns workout by id
func GetWorkoutById(db *gorm.DB, id uint64) (*models.Workout, error) {
	var workout models.Workout

	err := db.First(&workout, "id = ?", id).Error

	if err != nil {
		return nil, err
	}

	return &workout, nil
}

// Updates a workout in the database.
func UpdateWorkout(db *gorm.DB, w *models.Workout) {
	db.Save(w)
}