package controllers

import (
	"backend/models"
	"backend/tools"
	"backend/tools/db"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"encoding/json"
)

func GetAvailableSpecialties(c *fiber.Ctx) error {
	if !tools.IsLoggedIn(c) {
		return ApiError(c, "Not logged in", 400)
	}

	specialties := make([]models.TrainerSpecialty, 0)
	query := db.Orm().Find(&specialties)
	if query.Error == gorm.ErrRecordNotFound {
		return c.Status(200).JSON([]string{})
	}
	if query.Error != nil {
		return ApiError(c, "Db error", 500)
	}

	data := make([]fiber.Map, 0)
	for _, specialty := range specialties {
		data = append(data, fiber.Map {
			"id": specialty.ID,
			"name": specialty.Name,
		})
	}

	return c.Status(200).JSON(data)
}

func GetSelectedSpecialties(c *fiber.Ctx) error {
	isLogged, id := tools.GetCurrentUserId(c)
	if !isLogged {
		return ApiError(c, "Not logged in", 400)
	}

	// get the trainer
	var trainer models.Trainer
	trainerQuery := db.Orm().Where("base_user_id = ?", id).First(&trainer)
	if trainerQuery.Error != nil {
		return ApiError(c, "Db error", 500)
	}

	// get tags related to that trainer
	specialties := make([]models.TrainerSpecialty, 0)
	tagQueryErr := db.Orm().Model(&trainer).Association("Specialties").Find(&specialties)
	if tagQueryErr != nil {
		return ApiError(c, "Db error", 500)
	}

	//Map specialties
	data := make([]fiber.Map, 0)
	for _, specialty := range specialties {
		data = append(data, fiber.Map {
			"id": specialty.ID,
			"name": specialty.Name,
		})
	}

	return c.Status(200).JSON(data)
}

func SetSpecialties(c *fiber.Ctx) error {
	isLogged, id := tools.GetCurrentUserId(c)
	if !isLogged {
		return ApiError(c, "Not logged in", 400)
	}

	// Getting related trainer
	var trainer models.Trainer
	trainerQuery := db.Orm().First(&trainer, id)
	if trainerQuery.Error != nil {
		return ApiError(c, "Db Error", 500)
	}

	// Parsing selected tags ( cause they were sent as json)
	tagsJSON := c.FormValue("tags")
	var tags interface{}
	if json.Unmarshal([]byte(tagsJSON), &tags) != nil {
		return ApiError(c, "Could not parse tags json", 400)
	}
	tagIds := make([]uint, 0)
	for _,tag := range tags.([]interface{}) {
		tagMap := tag.(map[string]interface{})
		tagId := uint(tagMap["id"].(float64))
		tagIds = append(tagIds, tagId)
	}

	// Getting the selected specialties
	specialties := make([]models.TrainerSpecialty, 0)
	query := db.Orm().Where("id IN ?", tagIds).Find(&specialties)
	if query.Error != nil {
		return ApiError(c, "Db Error", 500)
	}

	// Re-setting selected specialties
	queryClearErr := db.Orm().Model(&trainer).Association("Specialties").Clear()
	if queryClearErr != nil {
		return ApiError(c, "Db Error", 500)
	}
	querySetErr := db.Orm().Model(&trainer).Association("Specialties").Append(&specialties)
	if querySetErr != nil {
		return ApiError(c, "Db Error", 500)
	}

	return ApiSuccess(c, nil)
}
