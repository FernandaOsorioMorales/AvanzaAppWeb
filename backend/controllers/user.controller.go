package controllers

import (
	"backend/models"
	"time"

	"gorm.io/gorm"
)

func CreateUser(db *gorm.DB,
	id int,
	birth time.Time,
	alias string,
	name string,
	phone string,
	pass string) (*models.User, error) {

	u := models.NewUser(id, birth, alias, name, phone, pass)

	err := db.Create(u).Error

	if err != nil {
		return nil, err
	}

	return &u, nil
}

func GetUserById(db *gorm.DB, id int) (*models.User, error) {
	var u models.User

	err := db.Where("idUser = ?", id).First(&u).Error

	if err != nil {
		return nil, err
	}

	return &u, nil
}
