package controllers

import (
	"backend/models"

	"gorm.io/gorm"
)

// Creates a new workout taq in the database.
// Returns error if an error occurs when creating
// the tag.
func CreateWorkoutTag(db *gorm.DB, w *models.WorkoutTag) error {

	err := db.Create(w).Error

	if err != nil {
		return err
	}

	return nil
}

// Returns all the tags by workout id.
func GetWorkoutTagByWkId(db *gorm.DB, idWorkout uint64) (*[]models.WorkoutTag, error) {
	var wk_tags []models.WorkoutTag

	err := db.Find(&wk_tags, "id_workout = ?", idWorkout).Error

	if err != nil {
		return nil, err
	}

	return &wk_tags, nil
}

// Updates a workout tag in the database.
func UpdateWorkoutTag(db *gorm.DB, w *models.WorkoutTag) {
	db.Save(w)
}

// Deletes records by workout id
func DeleteWorkoutTag(db *gorm.DB, idWk uint64) {
	db.Delete(&models.WorkoutTag{}, "id_workout = ?",idWk)
}