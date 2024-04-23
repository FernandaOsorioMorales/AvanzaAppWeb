package controllers

import (
	"backend/models"

	"gorm.io/gorm"
)

// Creates a new workout exercise in the database.
// Returns error if an error occurs when creating
// the exercise.
func CreateWorkoutExercise(db *gorm.DB, w *models.WorkoutExercise) error {

	err := db.Create(w).Error

	if err != nil {
		return err
	}

	return nil
}

// Returns all the exercises by workout id.
func GetWorkoutExerciseByWkId(db *gorm.DB, idWorkout uint64) (*[]models.WorkoutExercise, error) {
	var wk_exercises []models.WorkoutExercise

	err := db.Find(&wk_exercises, "id_workout = ?", idWorkout).Error

	if err != nil {
		return nil, err
	}

	return &wk_exercises, nil
}

// Updates a workout exercise in the database.
func UpdateWorkoutExercise(db *gorm.DB, w *models.WorkoutExercise) {
	db.Save(w)
}

// Deletes records by workout id
func DeleteWorkoutExercises(db *gorm.DB, idWk uint64) {
	db.Delete(&models.WorkoutExercise{}, "id_workout = ?",idWk)
}