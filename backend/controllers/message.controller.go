package controllers

import (
	"backend/models"
	"time"

	"gorm.io/gorm"
)

func CreateMessage(db *gorm.DB,
	emailUser string,
	emailTrainer string,
	sentTime time.Time,
	content string,
	transmitter string) (*models.Message, error) {

	m := models.NewMessage(emailUser, emailTrainer, sentTime, content, transmitter)

	err := db.Create(m).Error

	if err != nil {
		return nil, err
	}

	return &m, nil
}

// Returns messages from a pair (user,trainer).
func GetMessageByPair(db *gorm.DB, emailUser string, emailTrainer string) (*models.Message, error) {
	var m models.Message

	err := db.Where("emailUser = ? AND emailTrainer ?",
		emailUser,
		emailTrainer).First(&m).Error

	if err != nil {
		return nil, err
	}

	return &m, nil
}
