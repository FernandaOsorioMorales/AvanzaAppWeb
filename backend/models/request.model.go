package models

import (
	"gorm.io/gorm"
)

// A request from an athlete to be trained by a trainer
type Request struct {
	gorm.Model

	UserId uint
	User User

	TrainerId uint
	Trainer Trainer

	Accepted bool
}
