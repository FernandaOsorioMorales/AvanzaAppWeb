package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	idUser      uuid.UUID
	birthDate   time.Time
	alias       string
	name        string
	phoneNumber string
	password    string
}

func (u *User) getIdUser() uuid.UUID {
	return u.idUser
}

func (u *User) getBirthDate() time.Time {
	return u.birthDate
}

func (u *User) getAlias() string {
	return u.alias
}

func (u *User) getName() string {
	return u.name
}

func (u *User) getPhoneNumber() string {
	return u.phoneNumber
}

func (u *User) getPassword() string {
	return u.password
}

func (u *User) setIdUser(id uuid.UUID) {
	u.idUser = id
}

func (u *User) setBirthDate(date time.Time) {
	u.birthDate = date
}

func (u *User) setAlias(alias string) {
	u.alias = alias
}

func (u *User) setName(name string) {
	u.name = name
}

func (u *User) setPhoneNumber(phone string) {
	u.phoneNumber = phone
}

func (u *User) setPassword(password string) {
	u.password = password
}
