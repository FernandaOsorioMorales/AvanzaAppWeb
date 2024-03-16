package routes

import (
	"github.com/gofiber/fiber/v2"
)

// TODO - Connect the GetTrainers function to database
func GetTrainers(c *fiber.Ctx) error {
	return c.SendString("Getting all trainers")
}

// TODO - Connect the GetTrainerByID function to database
func GetTrainerByID(c *fiber.Ctx) error {
	// var trainer models.Trainer
	params := c.Params("id")
	// db.DB.First(&trainer, params["id"])

	// if trainer.ID == 0 {
	// 	c.Status(fiber.StatusNotFound)
	// 	return c.SendString("Trainer not found")
	// }

	return c.SendString("Getting trainer by ID: " + params)
}

// TODO - Connect the PostNewTrainer function to database
func PostNewTrainer(c *fiber.Ctx) error {
	// var trainer models.Trainer
	// if err := c.BodyParser(&trainer); err != nil {
	// 	return err
	// }
	// createdTrainer := db.DB.Create(&trainer)
	// err := createdTrainer.Error

	// if err != nil {
	// 	c.SendStatus(fiber.StatusBadRequest) //400
	// 	return c.SendString(err.Error())
	// }

	// return c.JSON(trainer)

	return c.SendString("Creating a new trainer in DB")
}

// TODO - Connect the DeleteTrainer function to database
func DeleteTrainer(c *fiber.Ctx) error {
	// var trainer models.Trainer
	params := c.Params("id")
	// db.DB.First(&trainer, params["id"])
	// if trainer.ID == 0 {
	// 	c.Status(fiber.StatusNotFound)
	// 	return c.SendString("Trainer not found")
	// } else {
	// 	db.DB.Unscoped().Delete(&trainer)
	// }
	// return c.SendStatus(fiber.StatusOK)
	return c.SendString("deleting trainer by ID:" + params)
}
