package models

import (
	"time"

	"gorm.io/gorm"
)

type Trainer struct {
	gorm.Model
	IdTrainer   int
	BirthDate   time.Time
	Alias       string
	Name        string
	PhoneNumber string
	Password    string
	Description string
	Specialty   string
}

func (t *Trainer) getIdTrainer() int {
	return t.IdTrainer
}

func (t *Trainer) getBirthDate() time.Time {
	return t.BirthDate
}

func (t *Trainer) getAlias() string {
	return t.Alias
}

func (t *Trainer) getName() string {
	return t.Name
}

func (t *Trainer) getPhoneNumber() string {
	return t.PhoneNumber
}

func (t *Trainer) getPassword() string {
	return t.Password
}

func (t *Trainer) getDescription() string {
	return t.Description
}

func (t *Trainer) getSpecialty() string {
	return t.Specialty
}

func (t *Trainer) setIdTrainer(id int) {
	t.IdTrainer = id
}

func (t *Trainer) setBirthDate(date time.Time) {
	t.BirthDate = date
}

func (t *Trainer) setAlias(alias string) {
	t.Alias = alias
}

func (t *Trainer) setName(name string) {
	t.Name = name
}

func (t *Trainer) setPhoneNumber(phone string) {
	t.PhoneNumber = phone
}

func (t *Trainer) setPassword(password string) {
	t.Password = password
}

func (t *Trainer) setDescription(description string) {
	t.Description = description
}

func (t *Trainer) setSpecialty(specialty string) {
	t.Specialty = specialty
}
