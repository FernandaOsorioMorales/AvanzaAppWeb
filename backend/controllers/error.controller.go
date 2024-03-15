package controllers

import (
	"github.com/gofiber/fiber/v2"
)

func ApiError(c *fiber.Ctx, message string) error {
	return c.Status(400).JSON(fiber.Map {
		"success": false,
		"errorMessage": message,
		"data": nil,
	})
}
