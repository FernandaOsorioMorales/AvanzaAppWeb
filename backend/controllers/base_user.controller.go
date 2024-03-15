package controllers

import (
	"backend/tools"
	"backend/tools/db"
	"backend/models"

	"github.com/gofiber/fiber/v2"

	"time"
)

func Register(c *fiber.Ctx) error {
	sess, sessErr := tools.GetCurrentSession(c)
	if sessErr != nil {
		return ApiError(c, "Failed to get session")
	}

	mail := c.FormValue("mail")
	password := c.FormValue("password")
	if mail == "" || password == "" {
		// TODO: I belive we could improve this by responding with the name of the empty fields
		return ApiError(c, "Incomplete data")
	}
	//TODO: MISSING INPUT VALIDATION

	hashedPassword, e := tools.GeneratePasswordHash(password)
	if e != nil {
		return ApiError(c, "Could not register user")
	}

	user := models.BaseUserNew(time.Now(), "", "", mail, "", hashedPassword)
	dbres := db.Orm().Create(&user)
	if dbres.Error != nil {
		return ApiError(c, "Could not register user")
	}

	sess.Set("loggedIn", true)
	if sess.Save() != nil {
		return ApiError(c, "User registered, session failed")
	}
	return c.JSON(fiber.Map {
		"success": true,
	})

}

func AttemptLogin(c *fiber.Ctx) error {
	sess, sessErr := tools.GetCurrentSession(c)
	if sessErr != nil {
		return ApiError(c, "Failed to get session")
	}

	if sess.Get("loggedIn") != nil {
		return c.JSON(fiber.Map {
			"success": true,
		})
	}

	mail := c.FormValue("mail")
	password := c.FormValue("password")
	if mail == "" || password == "" {
		// TODO: I belive we could improve this by responding with the name of the empty fields
		return ApiError(c, "Incomplete data")
	}
	//TODO: MISSING INPUT VALIDATION

	var user models.BaseUser
	result := db.Orm().Where("email = ?", mail).First(&user)
	if result.Error != nil {
		return ApiError(c, "User password combination inexistent")
	}

	if !tools.DoesPasswordMatch(password, user.GetPassword()) {
		return ApiError(c, "User password combination inexistent")
	}

	sess.Set("loggedIn", true)
	if sess.Save() != nil {
		return ApiError(c, "User registered, session failed")
	}
	return c.JSON(fiber.Map {
		"success": true,
	})
}

