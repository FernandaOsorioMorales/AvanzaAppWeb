package routes

import (
	"backend/controllers"
	"backend/models"
	"backend/tools"
	"backend/tools/db"
	"encoding/json"
	"log"
	"strconv"

	"backend/tools/socket"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/Jeffail/gabs"
)

// Returns the user contact list based on the user session.
// Returns 418 if the user is not logged in.
// Returns 500 HTTP Status Code if tan error occurs when
// querying the contact list.
func GetContacts(c *fiber.Ctx) error {
	dbase := db.Orm()
	logged, id := tools.GetCurrentUserId(c)

	var user models.BaseUser
	result := db.Orm().Where("id = ?", id).First(&user)
	if result.Error != nil {
		return controllers.ApiError(c, "Something wen wrong when retrieving user", 500)
	}

	if !logged {
		return controllers.ApiError(c, "Must be logged in", 401)
	}

	kind := controllers.UserKind(user)

	if kind == "" {
		return controllers.ApiError(c, "Couldn't retrieve kind", 500)
	}

	type user_contact struct {
		Id    uint64
		Alias string
	}

	var contacts []user_contact

	if kind == "trainer" {
		result := dbase.Table("contacts").
			Select("DISTINCT contacts.id_user AS id, base_users.alias AS alias").
			Joins("JOIN base_users ON contacts.id_user = base_users.id").
			Where("contacts.id_trainer = ?", id).
			Find(&contacts)
		if result.Error != nil {
			return controllers.ApiError(c, "Failed to retrieve user contacts", 500)
		}
	} else {
		result := dbase.Table("contacts").
			Select("DISTINCT contacts.id_trainer AS id, base_users.alias AS alias").
			Joins("JOIN base_users ON contacts.id_trainer = base_users.id").
			Where("contacts.id_user = ?", id).
			Find(&contacts)
		if result.Error != nil {
			return controllers.ApiError(c, "Failed to retrieve user contacts", 500)
		}
	}

	return c.JSON(fiber.Map{
		"contacts": contacts,
	})
}

// TODO - Handle errors
// TODO - Logging
// TODO - Retrieve messages
// TODO - Find a better way to get email from connection-
// Send message to the specified contact using websockets.
func ChatHandler(c *websocket.Conn) {
	var (
		mt      int
		message []byte
		err     error
	)

	user := c.Query("id", "")

	if user == "" {
		log.Print("Failed to connect to client")
		c.WriteMessage(websocket.TextMessage, []byte("{\"error\":\"Id param missing\"}"))
		return
	}

	userId, err := strconv.ParseUint(user, 10, 64)

	if err != nil {
		log.Print("The user id could not be parsed to int")
		log.Print(err)
		c.WriteMessage(websocket.TextMessage, []byte("{\"error\":\"The user id must be uint\"}"))
		return
	}

	socket.NewConnection(userId, c)

	err = c.WriteMessage(mt, []byte("{\"success\":\"The user id must be uint\"}"))

	for {
		mt, message, err = c.ReadMessage()

		if err != nil {
			break
		}

		var m models.Message
		err = json.Unmarshal(message, &m)
		if err != nil {
			c.WriteMessage(websocket.TextMessage, []byte("{\"error\":\"The message could not be parsed\"}"))
			continue
		}

		err = controllers.CreateMessage(db.Orm(), &m)
		if err != nil {
			c.WriteMessage(websocket.TextMessage, []byte("{\"error\":\"The message could not be saved\"}"))
			continue
		}

		addressee := m.GetIdAddressee()

		addrConn := socket.GetConnection(addressee)
		if addrConn != nil {
			addrConn.WriteMessage(websocket.TextMessage, message)
		}
	}

	socket.RemoveConnection(userId)
}

// Shares a workout to a user: Creates a new training plan
// if there isn´t any between the trainer and the user and 
// adds the workou to the training plan.
func ShareWorkout(c *fiber.Ctx) error {
	dbase := db.Orm()
	logged, id_trainer := tools.GetCurrentUserId(c)

	if !logged {
		return controllers.ApiError(c, "Must be logged in", 401)
	}

	body, parseErr := gabs.ParseJSON([]byte(c.Body()))
	if parseErr != nil {
		return controllers.ApiError(c, "Something went wrong when "+
									"parsing request body", 500)
	}

	user_id, exists_id := body.Search("IdUser").Data().(float64)
	if !exists_id {
		log.Print(body)
		log.Print(exists_id)
		log.Print(user_id)
		return controllers.ApiError(c, "Id must not be empty", 404)
	}

	userId := uint64(user_id)

	var user models.BaseUser
	result := db.Orm().Where("id = ?", userId).First(&user)
	if result.Error != nil {
		return controllers.ApiError(c, "Something wen wrong when retrieving user", 500)
	}
	
	kind := controllers.UserKind(user)
	log.Print(kind)
	if kind == "" {
		return controllers.ApiError(c, "Couldn't retrieve kind", 500)
	} else if kind != "athlete" {
		return controllers.ApiError(c, "IdUser kind must be 'user'", 400)
	}

	var trainer models.BaseUser
	result = db.Orm().Where("id = ?", id_trainer).First(&trainer)
	if result.Error != nil {
		return controllers.ApiError(c, "Something wen wrong when retrieving trainer", 500)
	}

	kind = controllers.UserKind(trainer)

	if kind == "" {
		return controllers.ApiError(c, "Couldn't retrieve kind", 500)
	} else if kind != "trainer" {
		return controllers.ApiError(c, "Must be a trainer to share workouts", 403)
	}

	tp := models.TrainingPlan{}

	result = dbase.Table("training_plans").
		Select("training_plans.id AS id, training_plans.id_trainer as id_trainer").
		Joins("JOIN user_training_plans AS utp ON utp.id_training_plan = training_plans.id").
		Where("id_user = ? AND id_trainer = ?", user.ID, trainer.ID).
		First(&tp)
	if result.Error != nil {
		tp.IdTrainer = uint64(trainer.ID)
		err := controllers.CreateTrainingPlan(dbase, &tp)
		if err != nil {
			return controllers.ApiError(c, "Something went wrong when creating tp", 500)
		}
		utp := models.NewUserTrainingPlan(uint64(tp.ID), uint64(user.ID))
		err = controllers.CreateUserTrainingPlan(dbase, &utp)
		if err != nil {
			return controllers.ApiError(c, "Something went wrong when creating utp", 500)
		}
	}

	controllers.DeleteTrainingPlanWkByTpId(dbase, uint64(tp.ID))

	tp_workouts, arrayErr := body.Search("trainingPlanWorkout").Children()

	log.Print(tp_workouts)

	if arrayErr != nil {
		log.Print("The exercise array is empty")
		return controllers.ApiError(c, "Something went wrong when reading array", 500)
	}

	for _, tp_workout := range tp_workouts {
		idWk, exists := tp_workout.Path("IdWorkout").Data().(float64)
		if !exists {continue}
		day, exists := tp_workout.Path("WeekDay").Data().(float64)
		if !exists {continue}

		newTpWk, tpErr := models.NewTrainingPlanWk(uint64(idWk), 
											uint64(tp.ID),
											uint8(day))
		
		if tpErr != nil {
			return controllers.ApiError(c, "Invalid WeekDay", 400)
		}

		controllers.CreateTrainingPlanWk(dbase, &newTpWk)
	}

	return c.JSON(fiber.Map{
		"success": true,
	})
}