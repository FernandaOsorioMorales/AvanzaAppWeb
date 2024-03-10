package models

import (
	"testing"
	"time"
)

func TestGetIdTrainer(t *testing.T) {
	id := 123
	trainer := Trainer{
		IdTrainer:   id,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
		Description: "descripcion",
		Specialty:   "especialidad",
	}

	receivedId := trainer.getIdTrainer()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestGetTrainerBirthDate(t *testing.T) {
	birth := time.Now()
	trainer := Trainer{
		IdTrainer:   123,
		BirthDate:   birth,
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
		Description: "descripcion",
		Specialty:   "especialidad",
	}

	receivedDate := trainer.getBirthDate()

	if receivedDate != birth {
		t.Fatalf("Expected %q, received %q", birth, receivedDate)
	}
}

func TestGetTrainerName(t *testing.T) {
	trainer := Trainer{
		IdTrainer:   123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
		Description: "descripcion",
		Specialty:   "especialidad",
	}

	receivedName := trainer.getName()

	if receivedName != "usuario" {
		t.Fatalf("Expected %q, received %q", "usuario", receivedName)
	}
}

func TestGetTrainerAlias(t *testing.T) {
	trainer := Trainer{
		IdTrainer:   123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
		Description: "descripcion",
		Specialty:   "especialidad",
	}

	receivedAlias := trainer.getAlias()

	if receivedAlias != "usr" {
		t.Fatalf("Expected %q, received %q", "usr", receivedAlias)
	}
}

func TestGetTrainerPhoneNumber(t *testing.T) {
	trainer := Trainer{
		IdTrainer:   123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
		Description: "descripcion",
		Specialty:   "especialidad",
	}

	receivedPhoneNumber := trainer.getPhoneNumber()

	if receivedPhoneNumber != "5555555555" {
		t.Fatalf("Expected %q, received %q", "5555555555", receivedPhoneNumber)
	}
}

func TestGetTrainerPassword(t *testing.T) {
	trainer := Trainer{
		IdTrainer:   123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
		Description: "descripcion",
		Specialty:   "especialidad",
	}

	receivedPassword := trainer.getPassword()

	if receivedPassword != "pwd" {
		t.Fatalf("Expected %q, received %q", "pwd", receivedPassword)
	}
}

func TestGetTrainerDescription(t *testing.T) {
	trainer := Trainer{
		IdTrainer:   123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
		Description: "descripcion",
		Specialty:   "especialidad",
	}

	receivedDescription := trainer.getDescription()

	if receivedDescription != "descripcion" {
		t.Fatalf("Expected %q, received %q", "descripcion", receivedDescription)
	}
}

func TestGetTrainerSpecialty(t *testing.T) {
	trainer := Trainer{
		IdTrainer:   123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
		Description: "descripcion",
		Specialty:   "especialidad",
	}

	receivedSpecialty := trainer.getSpecialty()

	if receivedSpecialty != "especialidad" {
		t.Fatalf("Expected %q, received %q", "especialidad", receivedSpecialty)
	}
}

func TestSetIdTrainer(t *testing.T) {
	trainer := Trainer{
		IdTrainer:   123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
		Description: "descripcion",
		Specialty:   "especialidad",
	}

	id := 1234

	trainer.setIdTrainer(id)

	receivedId := trainer.getIdTrainer()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestSetTrainerBirthDate(t *testing.T) {
	trainer := Trainer{
		IdTrainer:   123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
		Description: "descripcion",
		Specialty:   "especialidad",
	}

	birth := time.Now()

	trainer.setBirthDate(birth)

	receivedDate := trainer.getBirthDate()

	if receivedDate != birth {
		t.Fatalf("Expected %q, received %q", birth, receivedDate)
	}
}

func TestSetTrainerName(t *testing.T) {
	trainer := Trainer{
		IdTrainer:   123,
		BirthDate:   time.Now(),
		Name:        "user",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
		Description: "descripcion",
		Specialty:   "especialidad",
	}

	trainer.setName("usuario")

	receivedName := trainer.getName()

	if receivedName != "usuario" {
		t.Fatalf("Expected %q, received %q", "usuario", receivedName)
	}
}

func TestSetTrainerAlias(t *testing.T) {
	trainer := Trainer{
		IdTrainer:   123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "u",
		PhoneNumber: "5555555555",
		Password:    "pwd",
		Description: "descripcion",
		Specialty:   "especialidad",
	}

	trainer.setAlias("usr")

	receivedAlias := trainer.getAlias()

	if receivedAlias != "usr" {
		t.Fatalf("Expected %q, received %q", "usr", receivedAlias)
	}
}

func TestSetTrainerPhoneNumber(t *testing.T) {
	trainer := Trainer{
		IdTrainer:   123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5",
		Password:    "pwd",
		Description: "descripcion",
		Specialty:   "especialidad",
	}

	trainer.setPhoneNumber("5555555555")

	receivedPhoneNumber := trainer.getPhoneNumber()

	if receivedPhoneNumber != "5555555555" {
		t.Fatalf("Expected %q, received %q", "5555555555", receivedPhoneNumber)
	}
}

func TestSetTrainerPassword(t *testing.T) {
	trainer := Trainer{
		IdTrainer:   123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pass",
		Description: "descripcion",
		Specialty:   "especialidad",
	}

	trainer.setPassword("pwd")

	receivedPassword := trainer.getPassword()

	if receivedPassword != "pwd" {
		t.Fatalf("Expected %q, received %q", "pwd", receivedPassword)
	}
}

func TestSetTrainerDescription(t *testing.T) {
	trainer := Trainer{
		IdTrainer:   123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
		Description: "d",
		Specialty:   "especialidad",
	}

	trainer.setDescription("descripcion")

	receivedDescription := trainer.getDescription()

	if receivedDescription != "descripcion" {
		t.Fatalf("Expected %q, received %q", "descripcion", receivedDescription)
	}
}

func TestSetTrainerSpecialty(t *testing.T) {
	trainer := Trainer{
		IdTrainer:   123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
		Description: "descripcion",
		Specialty:   "e",
	}

	trainer.setSpecialty("especialidad")

	receivedSpecialty := trainer.getSpecialty()

	if receivedSpecialty != "especialidad" {
		t.Fatalf("Expected %q, received %q", "especialidad", receivedSpecialty)
	}
}
