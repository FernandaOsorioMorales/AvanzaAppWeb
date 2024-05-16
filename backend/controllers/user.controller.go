package controllers

import (
	"backend/models"
	"backend/tools"
	"backend/tools/db"
	va "backend/tools/validation"

	"github.com/gofiber/fiber/v2"

	"log"
	"strconv"
)

func GetMeasurements(c *fiber.Ctx) error {
	isLoggedIn, id := tools.GetCurrentUserId(c)
	if !isLoggedIn {
		return ApiError(c, "Not logged in", 400)
	}

	// Get the athlete
	var athlete models.User
	query := db.Orm().Where("base_user_id = ?", id).First(&athlete)
	if query.Error != nil {
		return ApiError(c, "DB error", 500)
	}

	return c.Status(200).JSON(fiber.Map {
		"height": athlete.Height,
		"weight": athlete.Weight,
		"arms": athlete.Arms,
		"waist": athlete.Waist,
		"hips": athlete.Hips,
	})
}

func SetMeasurements(c *fiber.Ctx) error {
	isLoggedIn, id := tools.GetCurrentUserId(c)
	if !isLoggedIn {
		return ApiError(c, "Not logged in", 400)
	}

	// Validation
	vaErr := va.Check(c, va.Rmap {
		"height":	"required,numeric,gte=0",
		"weight":	"required,numeric,gte=0",
		"arms":		"required,numeric,gte=0",
		"waist":	"required,numeric,gte=0",
		"hips":		"required,numeric,gte=0",
	})
	if vaErr != nil {
		log.Printf("%v <- %v", vaErr, c.FormValue("weight"))
		return ApiError(c, "Invalid values in measurements", 400)
	}

	// Get the athlete
	var athlete models.User
	query := db.Orm().Where("base_user_id = ?", id).First(&athlete)
	if query.Error != nil {
		return ApiError(c, "DB error", 500)
	}

	// I'm not doing this with a list and mapping cause that seems like useless complexity, maybe if this were js I'd be willing to do it.
	height, heightErr	:= strconv.ParseUint(c.FormValue("height"), 10, 32)
	arms, armsErr		:= strconv.ParseUint(c.FormValue("arms"), 10, 32)
	waist, waistErr		:= strconv.ParseUint(c.FormValue("waist"), 10, 32)
	hips, hipsErr		:= strconv.ParseUint(c.FormValue("hips"), 10, 32)
	weight, weightErr	:= strconv.ParseFloat(c.FormValue("weight"), 32)
	if heightErr != nil || armsErr != nil || waistErr != nil || hipsErr != nil || weightErr != nil {
		log.Printf("%v <- %v", weightErr, c.FormValue("weight"))
		return ApiError(c, "Invalid formats in measurements", 400)
	}

	athlete.Height = uint(height)
	athlete.Arms = uint(arms)
	athlete.Waist = uint(waist)
	athlete.Hips = uint(hips)
	athlete.Weight = float32(weight)

	saveQuery := db.Orm().Save(&athlete)
	if saveQuery.Error != nil {
		return ApiError(c, "DB error", 500)
	}

	return ApiSuccess(c, nil)
}
