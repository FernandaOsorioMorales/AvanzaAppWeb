package controllers

import (
	"backend/tools"
	"backend/tools/db"
	va "backend/tools/validation"
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
	vaErr := va.Check(c, va.Rmap {
		"birthDate": "required,datetime=2006-01-02",
		"alias": "required",
		"mail": "required,email",
		"phone": "required",//add more ?
		"password": "required",
	})

	if vaErr != nil {
		return ApiError(c, "Wrong data", 400)
	}

	birthDate := c.FormValue("birthDate")
	alias := c.FormValue("alias")
	mail := c.FormValue("mail")
	phone := c.FormValue("phone")
	password := c.FormValue("password")

	hashedPassword, e := tools.GeneratePasswordHash(password)
	if e != nil {
		return ApiError(c, "Could not register user", 500)
	}

	birthday, pErr := time.Parse(time.DateOnly, birthDate)
	if pErr != nil {
		return ApiError(c, "Could not register user", 500)
	}

	user := models.BaseUserNew(birthday, alias, mail, phone, hashedPassword)
	dbres := db.Orm().Create(&user)
	if dbres.Error != nil {
		return ApiError(c, "Could not register user", 400)
	}

	logInErr := tools.LogIn(c, &user)
	if logInErr != nil {
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
	if tools.IsLoggedIn(c) {
		return c.JSON(fiber.Map {
			"success": true,
		})
	}

	vaErr := va.Check(c, va.Rmap {
		"mail": "required,email",
		"password": "required",
	})
	if vaErr != nil {
		return ApiError(c, "Wrong data", 400)
	}

	mail := c.FormValue("mail")
	password := c.FormValue("password")

	var user models.BaseUser
	result := db.Orm().Where("email = ?", mail).First(&user)
	if result.Error != nil {
		return ApiError(c, "User password combination inexistent", 400)
	}

	if !tools.DoesPasswordMatch(password, user.Password) {
		return ApiError(c, "User password combination inexistent", 400)
	}

	logInErr := tools.LogIn(c, &user)
	if logInErr != nil {
		return ApiError(c, "User registered, session failed", 500)
	}

	return c.JSON(fiber.Map {
		"success": true,
	})
}
