package models

import (
	"gorm.io/gorm"
)

// A request from an athlete to be trained by a trainer
type Request struct {
	gorm.Model

	// Athlete requesting training
	UserId uint `gorm:"index:req_pair,unique"`
	User User

	// Trainer being requested
	TrainerId uint `gorm:"index:req_pair,unique"`
	Trainer Trainer

	// In lieu of an enum we use strings,
	// make sure to only ever insert "accepted", "denied" or "waiting"
	Status string
}
