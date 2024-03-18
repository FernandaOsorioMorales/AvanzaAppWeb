package main

import (
	"backend/controllers"
	"backend/routes"
	"backend/tools"
	"backend/tools/db"
	"backend/tools/validation"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {

	app := fiber.New()

	app.Static("/static", "/app/static")

	// *Middleware for logging
	app.Use(logger.New())

	// !Landing Page Routes
	app.Get("/", routes.HandleRoot)

	app.Get("/chat", routes.GetContacts)
	app.Get("/chat/conn", websocket.New(routes.MessageHandler))

	//auth
	app.Post("/login", controllers.AttemptLogin)
	app.Post("/register", controllers.Register)

	// !User Routes
	userGroup := app.Group("/user")
	userGroup.Get("", routes.GetUsers)
	userGroup.Get("/:id", routes.GetUserByID)
	userGroup.Post("", routes.PostNewUser)
	userGroup.Delete("/:id", routes.DeleteUser)

	// !User Routes
	trainerGroup := app.Group("/trainer")
	trainerGroup.Get("", routes.GetTrainers)
	trainerGroup.Get("/:id", routes.GetTrainerByID)
	trainerGroup.Post("", routes.PostNewTrainer)
	trainerGroup.Delete("/:id", routes.DeleteTrainer)

	db.Init()
	validation.Init()
	tools.InitSessions()
	app.Listen(":9090")
}
