package routes

import (
	"backend/controllers"
	"backend/tools"
	"backend/tools/db"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

// TODO - Get email from session (?)

// Returns the user contacts based on the user session.
// Returns 500 HTTP Status Code if the session can't get
// retrieved or an error occurs when querying the contact list.
func GetContacts(c *fiber.Ctx) error {
	dbase := db.Orm()
	_, sessErr := tools.GetCurrentSession(c)

	if sessErr != nil {
		return controllers.ApiError(c, "Failed to get session", 500)
	}

	mail := "¡¡¡REPLACE WITH EMAIL FROM SESSION!!!" // TODO - Get email from session
	contactList, err := controllers.GetContactList(dbase, mail)

	if err != nil {
		return controllers.ApiError(c, "Failed to retrieve user contacts", 500)
	}

	return c.JSON(fiber.Map{
		"contacts": contactList,
	})
}

//TODO - Handle errors
//TODO - Logging

// Send message to the specified contact using websockets.
func MessageHandler(c *websocket.Conn) {
	var (
		mt      int
		message []byte
		err     error
	)
	for {
		mt, message, err = c.ReadMessage()

		if err != nil {
			break
		}

		err = c.WriteMessage(mt, message)
		err = c.WriteMessage(mt, []byte("Te has unido al chat"))

	}

}
