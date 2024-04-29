package controllers

import (
	"backend/models"
	"backend/tools"
	"backend/tools/db"
	va "backend/tools/validation"

	"github.com/gofiber/fiber/v2"

	"time"
)

// Respond with requests belonging to the currently logged in athlete
func GetAthleteRequests(c *fiber.Ctx) error {
	isLogged, id := tools.GetCurrentUserId(c)
	if !isLogged {
		return ApiError(c, "Not logged in", 400)
	}

	var athlete models.User
	athleteQuery := db.Orm().Where("base_user_id = ?", id).First(&athlete)
	if athleteQuery.Error != nil {
		return ApiError(c, "Db Error", 500)
	}

	// Requests made by athlete with their linked trainer
	requests := make([]models.Request, 0)
	query := db.Orm().Where("user_id = ?", athlete.ID).Joins("Trainer").Joins("Trainer.BaseUser").Find(&requests)
	if query.Error != nil {
		return ApiError(c, "Db Error", 500)
	}

	data := make([]map[string]interface{}, 0)
	for _,r := range requests {
		data = append(data, map[string]interface{} {
			"status": r.Status,

			"alias": r.Trainer.BaseUser.Alias,
			"description": r.Trainer.BaseUser.Description,
			"trainer_id": r.Trainer.ID,
			"photo": r.Trainer.BaseUser.Photo,
		})
	}

	return c.Status(200).JSON(data)
}

// Respond with requests belonging to the currently logged in trainer
func GetTrainerRequests(c *fiber.Ctx) error {
	isLogged, id := tools.GetCurrentUserId(c)
	if !isLogged {
		return ApiError(c, "Not logged in", 400)
	}

	var trainer models.Trainer
	trainerQuery := db.Orm().Where("base_user_id = ?", id).First(&trainer)
	if trainerQuery.Error != nil {
		return ApiError(c, "Db Error", 500)
	}

	requests := make([]models.Request, 0)
	query := db.Orm().Where("trainer_id = ? AND status <> 'denied'", trainer.ID).Joins("User").Joins("User.BaseUser").Find(&requests)
	if query.Error != nil {
		return ApiError(c, "Db Error", 500)
	}

	data := make([]map[string]interface{}, 0)
	for _,r := range requests {
		data = append(data, map[string]interface{} {
			"status": r.Status,

			"alias": r.User.BaseUser.Alias,
			"description": r.User.BaseUser.Description,
			"athlete_id": r.User.ID,
			"photo": r.User.BaseUser.Photo,
		})
	}

	return c.Status(200).JSON(data)
}

// An athlete requests to be trained by an athlete
func RequestTraining(c *fiber.Ctx) error {
	isLogged, id := tools.GetCurrentUserId(c)
	if  !isLogged {
		return ApiError(c, "Not logged in", 400)
	}

	vaErr := va.Check(c, va.Rmap {
		"trainer_id": "required,number",
	})
	if vaErr != nil {
		return ApiError(c, "Wrong data", 400)
	}

	var athlete models.User
	var trainer models.Trainer

	aErr := db.Orm().First(&athlete, "base_user_id = ?", id).Error
	tErr := db.Orm().First(&trainer, "id = ?", c.FormValue("trainer_id")).Error
	if aErr != nil || tErr != nil {
		return ApiError(c, "Wrong data", 400)
	}

	request := models.Request {
		Status: "waiting",
		TrainerId: trainer.ID,
		UserId: athlete.ID,
	}
	createResult := db.Orm().Create(&request)
	if createResult.Error != nil {
		return ApiError(c, "Db err", 500)
	}

	return ApiSuccess(c, nil)
}

// A trainer accepts the request to train somebody or denies it
func ResolveRequest(c *fiber.Ctx) error {
	isLogged, id := tools.GetCurrentUserId(c)
	if !isLogged {
		return ApiError(c, "Not logged in", 400)
	}

	vaErr := va.Check(c, va.Rmap {
		"athlete_id": "required,number",
		"status": "required",
	})
	if vaErr != nil {
		return ApiError(c, "Wrong data", 400)
	}
	newStatus := c.FormValue("status")
	if newStatus != "accepted" && newStatus != "denied" {
		return ApiError(c, "Wrong data", 400)
	}

	//getting the trainer id from the base user id
	var trainer models.Trainer
	trainerQuery := db.Orm().First(&trainer, "base_user_id = ?", id)
	if trainerQuery.Error != nil {
		return ApiError(c, "Db error", 500)
	}

	//ensuring there exists an athlete with athlete_id
	var athlete models.User
	athleteQuery := db.Orm().First(&athlete, "id = ?", c.FormValue("athlete_id"))
	if athleteQuery.Error != nil {
		return ApiError(c, "Db error", 500)
	}

	updateQuery := db.Orm().Model(&models.Request{}).Where("user_id = ? AND trainer_id = ?", athlete.ID, trainer.ID).Update("status", c.FormValue("status"))
	if updateQuery.Error != nil {
		return ApiError(c, "Db error", 500)
	}

	if c.FormValue("status") == "accepted" {
		contact := models.NewContact(trainer.BaseUserId, athlete.BaseUserId)
		contactResult := db.Orm().Create(&contact)
		if contactResult.Error != nil {
			return ApiError(c, "Db err", 500)
		}
		// ok now finally send a greeting message
		message := models.NewMessage(
			uint64(athlete.BaseUserId),
			uint64(trainer.BaseUserId),
			time.Now().UTC(),
			"Solicitud aceptada !! ")
		CreateMessage(db.Orm(), &message)
	}

	return ApiSuccess(c, nil)
}
