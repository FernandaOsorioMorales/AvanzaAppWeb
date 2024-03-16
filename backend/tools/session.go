package tools

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
)

// session storage
var sessions *session.Store

// Start the session storage.
func InitSessions() {
	sessions = session.New()
}

// Returns the session for a user coming from the context _c_ as
// determined through cookies.
func GetCurrentSession(c *fiber.Ctx) (*session.Session, error) {
	return sessions.Get(c)
}


