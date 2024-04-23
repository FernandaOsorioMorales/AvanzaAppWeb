package controllers

import (
	"backend/models"
	"backend/tools"
	"backend/tools/db"
	va "backend/tools/validation"

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
	vaErr := va.Check(c, va.Rmap{
		"alias":     "required",
		"email":     "required,email",
		"phone":     "required", //add more ?
		"birthDate": "required,datetime=2006-01-02",
		"password":  "required",
		"kind":      "required",
	})

	if vaErr != nil {
		return ApiError(c, "Wrong data", 400)
	}

	birthDate := c.FormValue("birthDate")
	alias := c.FormValue("alias")
	mail := c.FormValue("email")
	phone := c.FormValue("phone")
	password := c.FormValue("password")
	kind := c.FormValue("kind")

	if kind != "athlete" && kind != "trainer" {
		return ApiError(c, "Wrong data", 400)
	}

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

	if kind == "trainer" {
		trainer := models.Trainer {
			BaseUserId: user.ID,
		}
		if db.Orm().Create(&trainer).Error != nil {
			return ApiError(c, "Could not register user", 400)
		}
	} else {
		athlete := models.User {
			BaseUserId: user.ID,
		}
		if db.Orm().Create(&athlete).Error != nil {
			return ApiError(c, "Could not register user", 400)
		}
	}

	logInErr := tools.LogIn(c, &user)
	if logInErr != nil {
		return ApiError(c, "User registered, session failed", 500)
	}

	return c.JSON(fiber.Map{
		"success": true,
		"userId":  user.ID,
		"alias":   user.Alias,
		"kind": kind,
	})
}

// Login a user into the app (if their credentials are correct),
// setting up a session and putting the username into the session.
// Returns _json_ with success set to true or the error message.
func AttemptLogin(c *fiber.Ctx) error {
	if tools.IsLoggedIn(c) {
		return c.JSON(fiber.Map{
			"success": true,
		})
	}

	vaErr := va.Check(c, va.Rmap{
		"email":    "required,email",
		"password": "required",
	})
	if vaErr != nil {
		return ApiError(c, "Wrong data", 400)
	}

	mail := c.FormValue("email")
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

	return c.JSON(fiber.Map{
		"success": true,
		"userId":  user.ID,
		"alias":   user.Alias,
		"kind": userKind(user),
	})
}

// If a user has already logged into the app and has an active
// session on the server then we return their id. If they don't
// have an active session we return a message
func ContinueUserSession(c *fiber.Ctx) error {
	loggedIn, id := tools.GetCurrentUserId(c)
	if loggedIn {
		var user models.BaseUser
		result := db.Orm().Where("id = ?", id).First(&user)
		if result.Error == nil {
			return c.JSON(fiber.Map{
				"success": true,
				"userId":  id,
				"alias":   user.Alias,
				"kind": userKind(user),
			})
		}
	}

	return c.JSON(fiber.Map{
		"success": false,
	})
}
