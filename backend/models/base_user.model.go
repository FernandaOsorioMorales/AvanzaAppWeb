package models

import (
	"time"

	"gorm.io/gorm"
)

type BaseUser struct {
	gorm.Model
	birthDate time.Time
	alias string
	Email string
	name string
	phoneNumber string
	Password string
}

func BaseUserNew(
	birthDate time.Time,
	alias string,
	name string,
	email string,
	phoneNumber string,
	password string) BaseUser {
		return BaseUser {
			birthDate: birthDate,
			alias: alias,
			name: name,
			Email: email,
			phoneNumber: phoneNumber,
			Password: password,
		}
}

func (u *BaseUser) GetPassword() string {
	return u.Password
}
