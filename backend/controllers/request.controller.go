package controllers

import (
	"backend/models"
	"backend/tools"
	"backend/tools/db"

	"github.com/gofiber/fiber/v2"
)

func GetAthleteRequests(c *fiber.Ctx) error {
	isLogged, id := tools.GetCurrentUserId(c)
	if !isLogged {
		return ApiError(c, "Not logged in", 400)
	}

	// Requests made by athlete with their linked trainer
	requests := make([]models.Request, 0)
	query := db.Orm().Where("user_id = ?", id).Joins("Trainer").Joins("Trainer.BaseUser").Find(&requests)
	if query.Error != nil {
		return ApiError(c, "Db Error", 500)
	}

	data := make([]map[string]interface{}, 0)
	for _,r := range requests {
		data = append(data, map[string]interface{} {
			"status": r.Status,

			"alias": r.Trainer.BaseUser.Alias,
			"description": r.Trainer.BaseUser.Description,
			"trainer_id": r.Trainer.BaseUser.ID,
			"photo": r.Trainer.BaseUser.Photo,
		})
	}

	return c.Status(200).JSON(data)
}
