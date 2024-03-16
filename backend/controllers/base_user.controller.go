package controllers

import (
	"backend/tools"
	"backend/tools/db"
	"backend/models"

	"github.com/gofiber/fiber/v2"

	"time"
)

// Register a user into the app.
// Adds the user to the database with a hashed password
// and also sets up user in session, logging them in.
//
// Returns a json object with _success_ set to true or
// the message for the error pased.
func Register(c *fiber.Ctx) error {
	sess, sessErr := tools.GetCurrentSession(c)
	if sessErr != nil {
		return ApiError(c, "Failed to get session", 500)
	}

	mail := c.FormValue("mail")
	password := c.FormValue("password")
	if mail == "" || password == "" {
		// TODO: I belive we could improve this by responding with the name of the empty fields
		return ApiError(c, "Incomplete data", 400)
	}
	//TODO: MISSING INPUT VALIDATION

	hashedPassword, e := tools.GeneratePasswordHash(password)
	if e != nil {
		return ApiError(c, "Could not register user", 500)
	}

	user := models.BaseUserNew(time.Now(), "", mail, "", hashedPassword)
	dbres := db.Orm().Create(&user)
	if dbres.Error != nil {
		return ApiError(c, "Could not register user", 400)
	}

	sess.Set("loggedIn", true)
	if sess.Save() != nil {
		return ApiError(c, "User registered, session failed", 500)
	}
	return c.JSON(fiber.Map {
		"success": true,
	})

}

// Login a user into the app (if their credentials are correct),
// setting up a session and putting the username into the session.
// Returns _json_ with success set to true or the error message.
func AttemptLogin(c *fiber.Ctx) error {
	sess, sessErr := tools.GetCurrentSession(c)
	if sessErr != nil {
		return ApiError(c, "Failed to get session", 500)
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
		return ApiError(c, "Incomplete data", 400)
	}
	//TODO: MISSING INPUT VALIDATION

	var user models.BaseUser
	result := db.Orm().Where("email = ?", mail).First(&user)
	if result.Error != nil {
		return ApiError(c, "User password combination inexistent", 400)
	}

	if !tools.DoesPasswordMatch(password, user.Password) {
		return ApiError(c, "User password combination inexistent", 400)
	}

	sess.Set("loggedIn", true)
	if sess.Save() != nil {
		return ApiError(c, "User registered, session failed", 500)
	}
	return c.JSON(fiber.Map {
		"success": true,
	})
}

