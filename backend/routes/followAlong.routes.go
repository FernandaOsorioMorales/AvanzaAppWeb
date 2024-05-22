package routes

import (
	"backend/controllers"
	"backend/models"
	"backend/tools"
	"backend/tools/db"
	"log"

	"github.com/gofiber/fiber/v2"
)

// Returns the training plan of a user.
// Returns 401 if the user is not logged in.
// Returns 500 HTTP Status Code if tan error occurs when
// querying the tp.
func GetTrainingPlan(c *fiber.Ctx) error {
	dbase := db.Orm()
	logged, id := tools.GetCurrentUserId(c)

	if !logged {
		return controllers.ApiError(c, "Login required", 401)
	}

	userId := uint64(id)

	var user models.BaseUser
	result := db.Orm().Where("id = ?", userId).First(&user)
	if result.Error != nil {
		return controllers.ApiError(c, "Something wen wrong when retrieving user", 500)
	}
	
	kind := controllers.UserKind(user)

	log.Print(kind)

	if kind == "" {
		return controllers.ApiError(c, "Couldn't retrieve kind", 500)
	} else if kind != "athlete" {
		return controllers.ApiError(c, "IdUser kind must be 'user'", 400)
	}

	user_plans, err := controllers.GetUserTrainingPlansByUser(dbase, userId)
	if err != nil {
		return controllers.ApiError(c, "Something wen wrong when retrieving user tps", 500)
	}
 
	type user_workout struct {
		Id int
		DayOfWeek   int
		Name      string

	}

	type utp struct {
		IdTrainingPlan uint64
		IdTrainer      uint64
		TrainingPlanWorkouts  []user_workout
	}

	var user_training_plans *[]utp
	user_training_plans = new([]utp)
	var uws *[]user_workout
	uws = new([]user_workout)

	for _, plan := range *user_plans {
		result := dbase.Table("workouts").
			Select("workouts.id, training_plan_wks.day_of_week, workouts.name").
			Joins("JOIN training_plan_wks ON workouts.id = training_plan_wks.id_workout").
			Where("training_plan_wks.id_training_plan = ? AND workouts.deleted_at IS NULL AND training_plan_wks.deleted_at IS NULL", plan.ID).
			Find(uws)
		log.Print(*uws)
		if result.Error != nil {
			return controllers.ApiError(c, "Failed to retrieve user contacts", 500)
		}

		tp, tpErr := controllers.GetTrainingPlanById(dbase, uint64(plan.ID))
		if tpErr != nil {
			return controllers.ApiError(c, "Failed to retrieve user contacts", 500)
		}

		training_plan := utp{IdTrainingPlan:uint64(plan.ID), 
							 IdTrainer:tp.IdTrainer,
							 TrainingPlanWorkouts:*uws}
		*user_training_plans = append(*user_training_plans, training_plan)
	}

	return c.JSON(fiber.Map{
		"TrainingPlans": *user_training_plans,
	})
}

