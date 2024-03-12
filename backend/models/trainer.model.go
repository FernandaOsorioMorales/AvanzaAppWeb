package models

import (
	"time"

	"gorm.io/gorm"
)

type Trainer struct {
	gorm.Model
	idTrainer   int
	birthDate   time.Time
	alias       string
	name        string
	phoneNumber string
	password    string
	description string
	specialty   string
}

func NewTrainer(idTrainer int,
	birthDate time.Time,
	alias string,
	name string,
	phoneNumber string,
	password string,
	description string,
	specialty string) Trainer {
	return Trainer{
		idTrainer:   idTrainer,
		birthDate:   birthDate,
		alias:       alias,
		name:        name,
		phoneNumber: phoneNumber,
		password:    password,
		description: description,
		specialty:   specialty,
	}
}

func (t *Trainer) GetIdTrainer() int {
	return t.idTrainer
}

func (t *Trainer) GetBirthDate() time.Time {
	return t.birthDate
}

func (t *Trainer) GetAlias() string {
	return t.alias
}

func (t *Trainer) GetName() string {
	return t.name
}

func (t *Trainer) GetPhoneNumber() string {
	return t.phoneNumber
}

func (t *Trainer) GetPassword() string {
	return t.password
}

func (t *Trainer) GetDescription() string {
	return t.description
}

func (t *Trainer) GetSpecialty() string {
	return t.specialty
}

func (t *Trainer) SetIdTrainer(id int) {
	t.idTrainer = id
}

func (t *Trainer) SetBirthDate(date time.Time) {
	t.birthDate = date
}

func (t *Trainer) SetAlias(alias string) {
	t.alias = alias
}

func (t *Trainer) SetName(name string) {
	t.name = name
}

func (t *Trainer) SetPhoneNumber(phone string) {
	t.phoneNumber = phone
}

func (t *Trainer) SetPassword(password string) {
	t.password = password
}

func (t *Trainer) SetDescription(description string) {
	t.description = description
}

func (t *Trainer) SetSpecialty(specialty string) {
	t.specialty = specialty
}
