package controllers

import (
	"backend/models"

	"gorm.io/gorm"
)

// Creates a new training plan workout in the database.
// Returns error if an error occurs when creating
// the exercise.
func CreateTrainingPlanWk(db *gorm.DB, w *models.TrainingPlanWk) error {

	err := db.Create(w).Error

	if err != nil {
		return err
	}

	return nil
}

// Returns all the training plan workouts by 
// trining plan id.
func GetTrainingPlanWkbyTrainingPlanId(db *gorm.DB, idTp uint64) (*[]models.TrainingPlanWk, error) {
	var training_plan_wks []models.TrainingPlanWk

	err := db.Find(&training_plan_wks, "id_training_plan = ?", idTp).Error

	if err != nil {
		return nil, err
	}

	return &training_plan_wks, nil
}

// Returns a training plan workout by workout id and
// trining plan id.
func GetTrainingPlanWkbyIds(db *gorm.DB, idWk uint64, idTp uint64) (*models.TrainingPlanWk, error) {
	var training_plan_wk models.TrainingPlanWk

	err := db.Where("id_training_plan = ? and id_workout = ?", idTp, idWk).
			Find(&training_plan_wk).Error

	if err != nil {
		return nil, err
	}

	return &training_plan_wk, nil
}

// Updates a training plan workout in the database.
func UpdateTrainingplanWorkout(db *gorm.DB, w *models.TrainingPlanWk) {
	db.Save(w)
}

// Deletes records by workout id
func DeleteTrainingPlanWkByWkId(db *gorm.DB, idWk uint64) {
	db.Delete(&models.TrainingPlanWk{}, "id_workout = ?",idWk)
}

// Deletes records by training plan id
func DeleteTrainingPlanWkByTpId(db *gorm.DB, idTp uint64) {
	db.Delete(&models.TrainingPlanWk{}, "id_training_plan = ?",idTp)
}