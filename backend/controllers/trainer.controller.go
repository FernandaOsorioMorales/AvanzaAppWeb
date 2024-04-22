package controllers

import (
	"backend/models"
	//"backend/tools"
	"backend/tools/db"

	"github.com/gofiber/fiber/v2"
)

func GetTrainers(c *fiber.Ctx) error {
	//if !tools.IsLoggedIn(c) {
	//	return ApiError(c, "Not logged in", 400)
	//}

	trainers := make([]models.Trainer, 0)
	query := db.Orm().Preload("BaseUser").Find(&trainers)
	if query.Error != nil {
		return ApiError(c, "Trouble getting trainers", 500)
	}

	data := make([](map[string]interface{}), 0)
	for _,t := range trainers {
		data = append(data, map[string]interface{} {
			"id": t.BaseUserId,
			"specialty": t.Specialty,
			"alias": t.BaseUser.Alias,
			"description": t.BaseUser.Description,
			"photo": t.BaseUser.Photo,
		})
	}

	return c.Status(200).JSON(data)
}
