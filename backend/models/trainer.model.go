package models

type Trainer struct {
	//base user linked to actual trainee user
	BaseUser
	// base user id (FK)
	BaseUserId int
	// Focus of the personal trainer
	Specialty string
}
