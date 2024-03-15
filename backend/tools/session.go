package tools

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
)

var sessions *session.Store

func InitSessions() {
	sessions = session.New()
}

func GetCurrentSession(c *fiber.Ctx) (*session.Session, error) {
	return sessions.Get(c)
}


