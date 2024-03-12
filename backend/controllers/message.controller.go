package controllers

import (
	"backend/models"
	"time"

	"gorm.io/gorm"
)

func CreateMessage(db *gorm.DB,
	idUser int,
	idTrainer int,
	sentTime time.Time,
	content string,
	transmitter string) (*models.Message, error) {

	m := models.NewMessage(idUser, idTrainer, sentTime, content, transmitter)

	err := db.Create(m).Error

	if err != nil {
		return nil, err
	}

	return &m, nil
}

func GetMessageById(db *gorm.DB, id int) (*models.Message, error) {
	var m models.Message

	err := db.Where("idUser = ?", id).First(&m).Error

	if err != nil {
		return nil, err
	}

	return &m, nil
}
