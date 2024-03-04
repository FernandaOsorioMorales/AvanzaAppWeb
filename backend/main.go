package main

import (
//	"fmt"
//	"log"
//	"net/http"
//	"os"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Static("/static", "/app/static")

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello world")
	})

	app.Listen(":9090")
}
