package controllers

import (
	"backend/models"

	"gorm.io/gorm"
)

// Creates a new training plan in the database.
// Returns error if an error occurs when creating
// the training plan.
func CreateTrainingPlan(db *gorm.DB, tp *models.TrainingPlan) error {

	err := db.Create(tp).Error

	if err != nil {
		return err
	}

	return nil
}

// Returns all the training plans by trainer id.
func GetTrainingPlansByTrainer(db *gorm.DB, idTrainer uint64) (*[]models.TrainingPlan, error) {
	var tps []models.TrainingPlan

	err := db.Find(&tps, "id_trainer = ?", idTrainer).Error

	if err != nil {
		return nil, err
	}

	return &tps, nil
}

// Returns all the training plans by trainer id
// and trainer.
func GetTrainingPlanByIdAndTrainer(db *gorm.DB, idTp uint64, idTrainer uint64) (*models.TrainingPlan, error) {
	var tp models.TrainingPlan

	err := db.Where("id = ? and id_trainer = ?", idTp, idTrainer).Find(&tp).Error

	if err != nil {
		return nil, err
	}

	return &tp, nil
}

// Returns trining plan by id
func GetTrainingPlanById(db *gorm.DB, id uint64) (*models.TrainingPlan, error) {
	var tp models.TrainingPlan

	err := db.First(&tp, "id = ?", id).Error

	if err != nil {
		return nil, err
	}

	return &tp, nil
}

// Updates a trainig plan in the database.
func UpdateTrainingPlan(db *gorm.DB, tp *models.TrainingPlan) {
	db.Save(tp)
}

// Deletes records by workout id
func DeleteTrainingPlan(db *gorm.DB, idTp uint64) {
	db.Delete(&models.TrainingPlan{}, "id = ?",idTp)
}