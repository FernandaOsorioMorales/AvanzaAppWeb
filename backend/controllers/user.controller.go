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
	password string) (*models.User, error) {

	u := models.User{
		IdUser:      id,
		BirthDate:   birth,
		Name:        name,
		Alias:       alias,
		PhoneNumber: phone,
		Password:    password,
	}

	err := db.Create(u).Error

	if err != nil {
		return nil, err
	}

	return &u, nil
}

func GetUserById(db *gorm.DB, id int) (*models.User, error) {
	var u models.User

	err := db.Where("IdUser = ?", id).First(&u).Error

	if err != nil {
		return nil, err
	}

	return &u, nil
}
