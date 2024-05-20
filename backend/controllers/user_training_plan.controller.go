package controllers

import (
	"backend/models"

	"gorm.io/gorm"
)

// Creates a new user training plan in the database.
// Returns error if an error occurs when creating
// the user training plan.
func CreateUserTrainingPlan(db *gorm.DB, tp *models.UserTrainingPlan) error {

	err := db.Create(tp).Error

	if err != nil {
		return err
	}

	return nil
}

// Returns all the training plans by user id.
func GetUserTrainingPlansByUser(db *gorm.DB, idUser uint64) (*[]models.UserTrainingPlan, error) {
	var tps []models.UserTrainingPlan

	err := db.Find(&tps, "id_user = ?", idUser).Error

	if err != nil {
		return nil, err
	}

	return &tps, nil
}

// Returns all the training plans by user id
// and id.
func GetUserTrainingPlanByIdAndUser(db *gorm.DB, idTp uint64, idUser uint64) (*models.UserTrainingPlan, error) {
	var tp models.UserTrainingPlan

	err := db.Where("id_training_plan = ? and id_user = ?", idTp, idUser).Find(&tp).Error

	if err != nil {
		return nil, err
	}

	return &tp, nil
}

// Returns trining plan by training plan id
func GetUserTrainingPlanById(db *gorm.DB, idTp uint64) (*models.UserTrainingPlan, error) {
	var tp models.UserTrainingPlan

	err := db.First(&tp, "id_training_plan = ?", idTp).Error

	if err != nil {
		return nil, err
	}

	return &tp, nil
}

// Updates a trainig plan in the database.
func UpdateUserTrainingPlan(db *gorm.DB, tp *models.UserTrainingPlan) {
	db.Save(tp)
}

// Deletes records by workout id
func DeleteUserTrainingPlan(db *gorm.DB, idTp uint64) {
	db.Delete(&models.TrainingPlan{}, "id_training_plan = ?",idTp)
}