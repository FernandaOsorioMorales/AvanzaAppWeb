package routes

import (
	"backend/controllers"
	"backend/models"
	"backend/tools"
	"backend/tools/db"

	"github.com/gofiber/fiber/v2"
)

// Returns the exercise list.
// Returns 401 if the user is not logged in.
// Returns 500 HTTP Status Code if tan error occurs when
// querying the exercises.
func GetExerciseList(c *fiber.Ctx) error {
	dbase := db.Orm()
	logged, _ := tools.GetCurrentUserId(c)

	if !logged {
		return controllers.ApiError(c, "Login required", 401)
	}

	var exercises *[]models.Exercise

	exercises, err := controllers.GetExercises(dbase)

	if err != nil {
		return controllers.ApiError(c, "Failed to retrieve exercises", 500)
	}

	return c.JSON(fiber.Map{
		"exercises": exercises,
	})
}

// Returns the workout list of a trainer.
// Returns 401 if the user is not logged in.
// Returns 500 HTTP Status Code if tan error occurs when
// querying the workouts.
func GetWorkoutList(c *fiber.Ctx) error {
	dbase := db.Orm()
	logged, id := tools.GetCurrentUserId(c)

	idTrainer := uint64(id)

	if !logged {
		return controllers.ApiError(c, "Login required", 401)
	}

	var workouts *[]models.Workout

	workouts, err := controllers.GetWorkoutsByTrainer(dbase, idTrainer)

	if err != nil {
		return controllers.ApiError(c, "Failed to retrieve user workouts", 500)
	}

	return c.JSON(fiber.Map{
		"workouts": workouts,
	})
}
