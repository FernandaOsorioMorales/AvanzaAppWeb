package models

type User struct {
	//base user linked to actual trainee user
	BaseUser
	// base user id (FK)
	BaseUserId int
}
