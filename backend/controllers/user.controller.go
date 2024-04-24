package controllers

import (
	"backend/models"
	"backend/tools"
	"backend/tools/db"
	va "backend/tools/validation"

	"github.com/gofiber/fiber/v2"
)

func RequestTraining(c *fiber.Ctx) error {
	_, sessERR := tools.GetCurrentSession(c)
	if sessERR != nil {
		return ApiError(c, "Not logged in", 400)
	}

	vaErr := va.Check(c, va.Rmap {
		"athlete_id": "required,number",
		"trainer_id": "required,number",
	})
	if vaErr != nil {
		return ApiError(c, "Wrong data", 400)
	}

	var athlete models.User
	var trainer models.Trainer

	aErr := db.Orm().First(&athlete, "base_user_id = ?", c.FormValue("athlete_id")).Error
	tErr := db.Orm().First(&trainer, "base_user_id = ?", c.FormValue("trainer_id")).Error
	if aErr != nil || tErr != nil {
		return ApiError(c, "Wrong data", 400)
	}

	request := models.Request {
		Accepted: true,
		TrainerId: trainer.ID,
		UserId: athlete.ID,
	}
	createResult := db.Orm().Create(&request)
	if createResult.Error != nil {
		return ApiError(c, "Db err", 500)
	}

	contact := models.NewContact(trainer.BaseUserId, athlete.BaseUserId)
	contactResult := db.Orm().Create(&contact)
	if contactResult.Error != nil {
		return ApiError(c, "Db err", 500)
	}

	return ApiSuccess(c, nil)
}
