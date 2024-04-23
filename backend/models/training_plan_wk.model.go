package models

import (
	"errors"

	"gorm.io/gorm"
)

// Structure to join training plan with workout.
type TrainingPlanWk struct {
	gorm.Model
	IdWorkout      uint64 // Id of the workout.
	IdTrainingPlan uint64 // Id of the training plan.
	DayOfWeek      uint8  // Day of the week (Day in [1,7]).
}

// Build a new Training Plan.
func NewTrainigPlanWk(
	IdWorkout uint64,
	IdTrainingPlan uint64,
	DayOfWeek uint8,
) (TrainingPlanWk, error) {
	if DayOfWeek < 1 || DayOfWeek > 7 {
		return TrainingPlanWk{}, errors.New("DayOfWeek must be integer in [1,7]")
	}
	return TrainingPlanWk{
		IdWorkout:      IdWorkout,
		IdTrainingPlan: IdTrainingPlan,
		DayOfWeek:      DayOfWeek,
	}, nil
}
