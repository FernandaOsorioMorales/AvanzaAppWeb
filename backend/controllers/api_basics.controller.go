package controllers

import (
	"github.com/gofiber/fiber/v2"
)

// Returns an error from the API in JSON.
// The status is the http status and the message should
// be unique enough to be handled by front-end. These are not
// user facing messages.
func ApiError(c *fiber.Ctx, message string, status int) error {
	return c.Status(status).JSON(fiber.Map{
		"errorMessage": message,
	})
}

func ApiSuccess(c *fiber.Ctx, data fiber.Map) error {
	return c.Status(200).JSON(data)
}
