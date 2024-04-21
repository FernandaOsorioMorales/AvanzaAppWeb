package models

import (
	"gorm.io/gorm"
)

// Structure to represent Trainig Plans of a trainer.
// It will be the main structure to join trainer with
// their workouts.
type TrainingPlan struct {
	gorm.Model
	IdTrainer uint64 // Id of the trainer.
}

// Build a new Training Plan.
func NewTrainigPlan(
	IdTrainer uint64,
) TrainingPlan {
	return TrainingPlan{
		IdTrainer: IdTrainer,
	}
}
