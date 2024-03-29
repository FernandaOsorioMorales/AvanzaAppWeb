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

// TODO - Implement function

// Returns the user contact list based on the user session.
// Returns 418 if the user is not logged in.
// Returns 500 HTTP Status Code if tan error occurs when
// querying the contact list.
func GetContacts(c *fiber.Ctx) error {
	dbase := db.Orm()
	logged, id := tools.GetCurrentUserId(c)

	if !logged {
		return controllers.ApiError(c, "I'm a teapot", 418)
	}

	type user_contact struct {
		Id    uint64
		Alias string
	}

	var contacts []user_contact

	result := dbase.Raw("SELECT "+
		"contacts.id_contact AS id, "+
		"base_users.alias AS alias "+
		"FROM "+
		"contacts "+
		"JOIN "+
		"base_users "+
		"ON "+
		"contacts.id_contact = base_users.id "+
		"WHERE "+
		"contacts.id_user = ?", id).Scan(&contacts)

	if result.Error != nil {
		return controllers.ApiError(c, "Failed to retrieve user contacts", 500)
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
		c.WriteMessage(websocket.TextMessage, []byte("id param missing"))
		return
	}

	userId, err := strconv.ParseUint(user, 10, 64)

	if err != nil {
		log.Print("The user id could not be parsed to int")
		c.WriteMessage(websocket.TextMessage, []byte("The userId sent must be uint"))
		return
	}

	socket.NewConnection(userId, c)

	err = c.WriteMessage(mt, []byte("Successful connection"))

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
