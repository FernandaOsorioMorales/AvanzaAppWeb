package controllers

import (
	"backend/models"
	"backend/tools"
	"backend/tools/db"

	"github.com/gofiber/fiber/v2"
)

func GetAvailableTrainers(c *fiber.Ctx) error {
	isLoggedIn, id := tools.GetCurrentUserId(c) 
	if !isLoggedIn {
		return ApiError(c, "Not logged in", 400)
	}

	// trainers to be filtered out of response
	unavailableTrainerIds := make([]uint, 0)
	db.Orm().Model(&models.Request{}).Joins("User").Where("base_user_id = ?", id).Pluck("trainer_id", &unavailableTrainerIds)
	unavailableTrainers := make(map[uint]struct{})
	for _,id := range unavailableTrainerIds {
		unavailableTrainers[id] = struct{}{}
	}


	trainers := make([]models.Trainer, 0)
	query := db.Orm().Model(&models.Trainer{}).Preload("BaseUser").Preload("Specialties").Find(&trainers)
	if query.Error != nil {
		return ApiError(c, "Trouble getting trainers", 500)
	}

	data := make([](map[string]interface{}), 0)
	for _,t := range trainers {

		_, ok := unavailableTrainers[t.ID]
		if ok {
			continue
		}

		tags := make([]string, 0)
		for _,s := range t.Specialties {
			tags = append(tags, s.Name)
		}

		data = append(data, map[string]interface{} {
			"alias": t.BaseUser.Alias,
			"description": t.BaseUser.Description,
			"id": t.ID,
			"photo": t.BaseUser.Photo,
			"specialties": tags,
		})
	}

	return c.Status(200).JSON(data)
}
