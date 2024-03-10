package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	IdUser      int
	BirthDate   time.Time
	Alias       string
	Name        string
	PhoneNumber string
	Password    string
}

func (u *User) getIdUser() int {
	return u.IdUser
}

func (u *User) getBirthDate() time.Time {
	return u.BirthDate
}

func (u *User) getAlias() string {
	return u.Alias
}

func (u *User) getName() string {
	return u.Name
}

func (u *User) getPhoneNumber() string {
	return u.PhoneNumber
}

func (u *User) getPassword() string {
	return u.Password
}

func (u *User) setIdUser(id int) {
	u.IdUser = id
}

func (u *User) setBirthDate(date time.Time) {
	u.BirthDate = date
}

func (u *User) setAlias(alias string) {
	u.Alias = alias
}

func (u *User) setName(name string) {
	u.Name = name
}

func (u *User) setPhoneNumber(phone string) {
	u.PhoneNumber = phone
}

func (u *User) setPassword(password string) {
	u.Password = password
}
