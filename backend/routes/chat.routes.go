package routes

import (
	"backend/controllers"
	"backend/models"
	"backend/tools/db"
	"encoding/json"
	"log"
	"strconv"

	"backend/tools/socket"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

// TODO - Get email from session (?)

// Returns the user contacts based on the user session.
// Returns 500 HTTP Status Code if the session can't get
// retrieved or an error occurs when querying the contact list.
func GetContacts(c *fiber.Ctx) error {
	// dbase := db.Orm()
	// id, sessErr := tools.GetCurrentUserId(c)

	// if sessErr != nil {
	// 	return controllers.ApiError(c, "Failed to get session", 500)
	// }

	// mail := "¡¡¡REPLACE WITH EMAIL FROM SESSION!!!" // TODO - Get email from session
	// contactList, err := controllers.GetContactList(dbase, mail)

	// if err != nil {
	// 	return controllers.ApiError(c, "Failed to retrieve user contacts", 500)
	// }

	return c.JSON(fiber.Map{
		"contacts": "",
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
		c.WriteMessage(websocket.TextMessage, []byte("email param missing"))
		return
	}

	userId, err := strconv.ParseUint(user, 10, 64)

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
			break
		}

		addressee := m.GetIdAddressee()

		addrConn := socket.GetConnection(addressee)
		if addrConn != nil {
			addrConn.WriteMessage(websocket.TextMessage, message)
		}

		controllers.CreateMessage(db.Orm(), &m)
	}

	socket.RemoveConnection(userId)
}
