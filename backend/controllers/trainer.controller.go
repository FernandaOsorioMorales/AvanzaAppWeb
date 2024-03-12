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
	pass string,
	des string,
	spec string) (*models.Trainer, error) {

	t := models.NewTrainer(id, birth, alias, name, phone, pass, des, spec)

	err := db.Create(t).Error

	if err != nil {
		return nil, err
	}

	return &t, nil
}

func GetTrainerById(db *gorm.DB, id int) (*models.Trainer, error) {
	var t models.Trainer

	err := db.Where("idUser = ?", id).First(&t).Error

	if err != nil {
		return nil, err
	}

	return &t, nil
}
