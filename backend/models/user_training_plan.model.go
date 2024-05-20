package models

import (
	"gorm.io/gorm"
)

// Structure to represent Trainig Plans of a user.
// It will be the main structure to join users with
// their workouts.
type UserTrainingPlan struct {
	gorm.Model
	IdTrainingPlan uint64 //Id of the training plan
	IdUser uint64 // Id of the trainer.
}

// Build a new User Training Plan.
func NewUserTrainingPlan(
	IdTrainingPlan uint64,
	IdUser uint64,
) UserTrainingPlan {
	return UserTrainingPlan{
		IdTrainingPlan: IdTrainingPlan,
		IdUser: IdUser,
	}
}
