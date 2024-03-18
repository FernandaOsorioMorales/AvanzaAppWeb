package routes

import (
	"github.com/gofiber/fiber/v2"
)

// TODO - Connect the GetUsers function to database to database
func GetUsers(c *fiber.Ctx) error {
	return c.SendString("Getting all users")
}

// TODO - Connect the GetUserByID function to database
func GetUserByID(c *fiber.Ctx) error {
	// var user models.User
	params := c.Params("id")
	// db.DB.First(&user, params["id"])

	// if user.ID == 0 {
	// 	c.Status(fiber.StatusNotFound)
	// 	return c.SendString("User not found")
	// }

	return c.SendString("Getting user by ID: " + params)
}

// TODO - Connect the PostNewUser function to database
func PostNewUser(c *fiber.Ctx) error {
	// var user models.User
	// if err := c.BodyParser(&user); err != nil {
	// 	return err
	// }
	// createdUser := db.DB.Create(&user)
	// err := createdUser.Error

	// if err != nil {
	// 	c.SendStatus(fiber.StatusBadRequest) //400
	// 	return c.SendString(err.Error())
	// }

	// return c.JSON(user)

	return c.SendString("Creating a new user in DB")
}

// TODO - Connect the DeleteUser function to database
func DeleteUser(c *fiber.Ctx) error {
	// var user models.User
	params := c.Params("id")
	// db.DB.First(&user, params["id"])
	// if user.ID == 0 {
	// 	c.Status(fiber.StatusNotFound)
	// 	return c.SendString("User not found")
	// } else {
	// 	db.DB.Unscoped().Delete(&user)
	// }
	// return c.SendStatus(fiber.StatusOK)
	return c.SendString("deleting user by ID:" + params)
}
