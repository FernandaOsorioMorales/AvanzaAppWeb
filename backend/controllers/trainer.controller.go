package controllers

import (
	"backend/models"
	"time"

	"gorm.io/gorm"
)

func CreateTainer(db *gorm.DB,
	id int,
	birth time.Time,
	alias string,
	name string,
	phone string,
	password string,
	description string,
	specialty string) (*models.Trainer, error) {

	t := models.Trainer{
		IdTrainer:   id,
		BirthDate:   birth,
		Name:        name,
		Alias:       alias,
		PhoneNumber: phone,
		Password:    password,
		Description: description,
		Specialty:   specialty,
	}

	err := db.Create(t).Error

	if err != nil {
		return nil, err
	}

	return &t, nil
}

func GetTrainerById(db *gorm.DB, id int) (*models.Trainer, error) {
	var t models.Trainer

	err := db.Where("IdUser = ?", id).First(&t).Error

	if err != nil {
		return nil, err
	}

	return &t, nil
}
