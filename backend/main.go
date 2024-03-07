package main

import (
	"os"
	"log"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Static("/static", "/app/static")
	//kk
	entries, e := os.ReadDir("/app/static")
	if e != nil {
		log.Fatal(e)
	}
	//t
	for _,e := range entries {
		fmt.Println(e.Name())
	}


	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Good night")
	})

	app.Listen(":9090")
}
