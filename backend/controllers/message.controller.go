package controllers

import (
	"backend/models"

	"gorm.io/gorm"
)

// Creates a new message in the database.
// Returns error if an error ocurrs when creating
// the message.
func CreateMessage(db *gorm.DB, m *models.Message) error {

	err := db.Create(m).Error

	if err != nil {
		return err
	}

	return nil
}

// TODO Return all messages.
// Returns messages from a pair (IdAddressee, IdTransmitter).
func GetMessageByPair(db *gorm.DB, IdAddressee uint64, IdTransmitter uint64) (*models.Message, error) {
	var m models.Message

	err := db.Where("IdAddressee = ? AND IdTransmitter ?",
		IdAddressee,
		IdTransmitter).First(&m).Error

	if err != nil {
		return nil, err
	}

	return &m, nil
}
