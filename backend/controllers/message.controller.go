package controllers

import (
	"backend/models"
	"time"

	"gorm.io/gorm"
)

func CreateMessage(db *gorm.DB,
	idUser int,
	idTrainer int,
	sentAt time.Time,
	content string,
	transmitter string) (*models.Message, error) {

	m := models.Message{
		IdUser:      idUser,
		IdTrainer:   idTrainer,
		SentTime:    sentAt,
		Content:     content,
		Transmitter: transmitter,
	}

	err := db.Create(m).Error

	if err != nil {
		return nil, err
	}

	return &m, nil
}

func GetMessageById(db *gorm.DB, id int) (*models.Message, error) {
	var m models.Message

	err := db.Where("IdUser = ?", id).First(&m).Error

	if err != nil {
		return nil, err
	}

	return &m, nil
}
