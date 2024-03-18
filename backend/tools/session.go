package tools

import (
	"backend/models"

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

// Log user u into the current session, set it's id in the session
func LogIn(c *fiber.Ctx, u *models.BaseUser) error {
	sess, sessErr := sessions.Get(c)
	if sessErr != nil {
		return sessErr
	}
	sess.Set("loggedIn", true)
	sess.Set("userId", u.ID)
	saveErr := sess.Save()
	if saveErr != nil {
		return saveErr
	}
	return nil
}

// Return true if a user is logged in
// Prefer GetCurrentUserId if you also plan to get the user id later
func IsLoggedIn(c *fiber.Ctx) bool {
	sess, sessErr := sessions.Get(c)
	if sessErr != nil || sess.Get("loggedIn") == nil {
		return false
	}
	return sess.Get("loggedIn").(bool)
}

// If a user is currently logged in it returns true and
// the user id, if the session does not have a user then returns
// false
func GetCurrentUserId(c *fiber.Ctx) (bool, uint) {
	sess, sessErr := sessions.Get(c)
	if sessErr != nil || sess.Get("loggedIn") == nil{
		return false, 0
	}

	if sess.Get("loggedIn").(bool) {
		return true, sess.Get("userId").(uint)
	} else {
		return false, 0
	}

}
