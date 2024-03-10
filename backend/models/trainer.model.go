package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Trainer struct {
	gorm.Model
	idTrainer   uuid.UUID
	birthDate   time.Time
	alias       string
	name        string
	phoneNumber string
	password    string
	description string
	specialty   string
}

func (t *Trainer) getIdTrainer() uuid.UUID {
	return t.idTrainer
}

func (t *Trainer) getBirthDate() time.Time {
	return t.birthDate
}

func (t *Trainer) getAlias() string {
	return t.alias
}

func (t *Trainer) getName() string {
	return t.name
}

func (t *Trainer) getPhoneNumber() string {
	return t.phoneNumber
}

func (t *Trainer) getPassword() string {
	return t.password
}

func (t *Trainer) getDescription() string {
	return t.description
}

func (t *Trainer) getSpecialty() string {
	return t.specialty
}

func (t *Trainer) setIdTrainer(id uuid.UUID) {
	t.idTrainer = id
}

func (t *Trainer) setBirthDate(date time.Time) {
	t.birthDate = date
}

func (t *Trainer) setAlias(alias string) {
	t.alias = alias
}

func (t *Trainer) setName(name string) {
	t.name = name
}

func (t *Trainer) setPhoneNumber(phone string) {
	t.phoneNumber = phone
}

func (t *Trainer) setPassword(password string) {
	t.password = password
}

func (t *Trainer) setDescription(description string) {
	t.description = description
}

func (t *Trainer) setSpecialty(specialty string) {
	t.specialty = specialty
}
