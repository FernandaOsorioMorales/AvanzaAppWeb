package models

import (
	"time"

	"gorm.io/gorm"
)

// Structure to represent users.
// gorm.Model: Structure that creates ID, CreatedAt, DeletedAt fields.
// idUser: integer for the id.
// birthDate: Time structure for the user's birth date.
// alias: string for the user's alias.
// name: string for the user's name.
// phoneNumber: string for the user's phone number.
// password: string for the user's password.
type User struct {
	gorm.Model
	idUser      int
	birthDate   time.Time
	alias       string
	name        string
	phoneNumber string
	password    string
}

// User constructor
// Returns new user object
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

// Returns the user's id
func (u *User) GetIdUser() int {
	return u.idUser
}

// Returns the user's birth date
func (u *User) GetBirthDate() time.Time {
	return u.birthDate
}

// Returns the user's alias
func (u *User) GetAlias() string {
	return u.alias
}

// Returns the user's name
func (u *User) GetName() string {
	return u.name
}

// Returns the user's phone number
func (u *User) GetPhoneNumber() string {
	return u.phoneNumber
}

// Returns the user's password
func (u *User) GetPassword() string {
	return u.password
}

// Updates the user's id
func (u *User) SetIdUser(id int) {
	u.idUser = id
}

// Updates the user's birth date
func (u *User) SetBirthDate(date time.Time) {
	u.birthDate = date
}

// Updates the user's alias
func (u *User) SetAlias(alias string) {
	u.alias = alias
}

// Updates the user's name
func (u *User) SetName(name string) {
	u.name = name
}

// Updates the user's phone number
func (u *User) SetPhoneNumber(phone string) {
	u.phoneNumber = phone
}

// Updates the user's password
func (u *User) SetPassword(password string) {
	u.password = password
}
