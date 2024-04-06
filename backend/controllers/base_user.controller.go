package controllers

import (
	"backend/models"
	"backend/tools"
	"backend/tools/db"

	"github.com/gofiber/fiber/v2"
)

// Get the user currently logged in
func GetBaseUser(c *fiber.Ctx) error {
	isLogged, id := tools.GetCurrentUserId(c)
	if !isLogged {
		return ApiError(c, "Not logged in", 400)
	}

	var user models.BaseUser
	err := db.Orm().First(&user, id).Error
	if err != nil {
		return ApiError(c, "DB error", 500)
	}
	return ApiSuccess(c, fiber.Map{
		"alias":       user.Alias,
		"birthday":    user.BirthDate,
		"photo":       user.Photo,
		"description": user.Description,
	})
}

func UpdateBaseUser(c *fiber.Ctx) error {
	isLogged, id := tools.GetCurrentUserId(c)
	if !isLogged {
		return ApiError(c, "Not logged in", 400)
	}

	field := c.FormValue("field")
	if field != "alias" && field != "photo" {
		return ApiError(c, "not a valid field", 400)
	}

	var user models.BaseUser
	getUserErr := db.Orm().First(&user, id).Error
	if getUserErr != nil {
		return ApiError(c, "DB error", 500)
	}

	if field == "alias" {
		user.Alias = c.FormValue("alias")
		if db.Orm().Save(&user).Error != nil {
			return ApiError(c, "Db Error", 500)
		}
	}

	if field == "photo" {
		//TODO
	}

	return ApiSuccess(c, nil)
}

func DeleteBaseUser(c *fiber.Ctx) error {
	isLogged, id := tools.GetCurrentUserId(c)
	if !isLogged {
		return ApiError(c, "Not logged in", 400)
	}

	if db.Orm().Delete(&models.BaseUser{}, id).Error != nil {
		return ApiError(c, "Db error", 500)
	}
	return ApiSuccess(c, fiber.Map{"id": id})
}
