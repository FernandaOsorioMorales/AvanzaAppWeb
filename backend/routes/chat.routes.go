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
		return controllers.ApiError(c, "I'm a teapot", 418)
	}

	kind := controllers.UserKind(user)

	if kind == "" {
		return controllers.ApiError(c, "Missing kind param", 400)
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
