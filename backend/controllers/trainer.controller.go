package controllers

import (
	"backend/models"
	"backend/tools"
	"backend/tools/db"

	"github.com/gofiber/fiber/v2"
)

func GetAvailableTrainers(c *fiber.Ctx) error {
	if !tools.IsLoggedIn(c) {
		return ApiError(c, "Not logged in", 400)
	}

	trainers := make([]models.Trainer, 0)
	query := db.Orm().Model(&models.Trainer{}).Preload("BaseUser").Preload("Specialties").Find(&trainers)
	if query.Error != nil {
		return ApiError(c, "Trouble getting trainers", 500)
	}

	data := make([](map[string]interface{}), 0)
	for _,t := range trainers {
		tags := make([]string, 0)
		for _,s := range t.Specialties {
			tags = append(tags, s.Name)
		}

		data = append(data, map[string]interface{} {
			"alias": t.BaseUser.Alias,
			"description": t.BaseUser.Description,
			"id": t.BaseUserId,
			"photo": t.BaseUser.Photo,
			"specialty": tags,
		})
	}

	return c.Status(200).JSON(data)
}
