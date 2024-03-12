package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	idUser      int
	birthDate   time.Time
	alias       string
	name        string
	phoneNumber string
	password    string
}

func NewUser(idUser int,
	birthDate time.Time,
	alias string,
	name string,
	phoneNumber string,
	password string) User {
	return User{
		idUser:      idUser,
		birthDate:   birthDate,
		alias:       alias,
		name:        name,
		phoneNumber: phoneNumber,
		password:    password,
	}
}

func (u *User) GetIdUser() int {
	return u.idUser
}

func (u *User) GetBirthDate() time.Time {
	return u.birthDate
}

func (u *User) GetAlias() string {
	return u.alias
}

func (u *User) GetName() string {
	return u.name
}

func (u *User) GetPhoneNumber() string {
	return u.phoneNumber
}

func (u *User) GetPassword() string {
	return u.password
}

func (u *User) SetIdUser(id int) {
	u.idUser = id
}

func (u *User) SetBirthDate(date time.Time) {
	u.birthDate = date
}

func (u *User) SetAlias(alias string) {
	u.alias = alias
}

func (u *User) SetName(name string) {
	u.name = name
}

func (u *User) SetPhoneNumber(phone string) {
	u.phoneNumber = phone
}

func (u *User) SetPassword(password string) {
	u.password = password
}
