package models

import (
	"testing"
	"time"
)

func TestGetIdTrainer(t *testing.T) {
	id := 123
	trainer := Trainer{
		idTrainer:   id,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	receivedId := trainer.GetIdTrainer()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestGetTrainerBirthDate(t *testing.T) {
	birth := time.Now()
	trainer := Trainer{
		idTrainer:   123,
		birthDate:   birth,
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	receivedDate := trainer.GetBirthDate()

	if receivedDate != birth {
		t.Fatalf("Expected %q, received %q", birth, receivedDate)
	}
}

func TestGetTrainerName(t *testing.T) {
	trainer := Trainer{
		idTrainer:   123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	receivedName := trainer.GetName()

	if receivedName != "usuario" {
		t.Fatalf("Expected %q, received %q", "usuario", receivedName)
	}
}

func TestGetTrainerAlias(t *testing.T) {
	trainer := Trainer{
		idTrainer:   123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	receivedAlias := trainer.GetAlias()

	if receivedAlias != "usr" {
		t.Fatalf("Expected %q, received %q", "usr", receivedAlias)
	}
}

func TestGetTrainerPhoneNumber(t *testing.T) {
	trainer := Trainer{
		idTrainer:   123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	receivedPhoneNumber := trainer.GetPhoneNumber()

	if receivedPhoneNumber != "5555555555" {
		t.Fatalf("Expected %q, received %q", "5555555555", receivedPhoneNumber)
	}
}

func TestGetTrainerPassword(t *testing.T) {
	trainer := Trainer{
		idTrainer:   123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	receivedPassword := trainer.GetPassword()

	if receivedPassword != "pwd" {
		t.Fatalf("Expected %q, received %q", "pwd", receivedPassword)
	}
}

func TestGetTrainerDescription(t *testing.T) {
	trainer := Trainer{
		idTrainer:   123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	receivedDescription := trainer.GetDescription()

	if receivedDescription != "descripcion" {
		t.Fatalf("Expected %q, received %q", "descripcion", receivedDescription)
	}
}

func TestGetTrainerSpecialty(t *testing.T) {
	trainer := Trainer{
		idTrainer:   123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	receivedSpecialty := trainer.GetSpecialty()

	if receivedSpecialty != "especialidad" {
		t.Fatalf("Expected %q, received %q", "especialidad", receivedSpecialty)
	}
}

func TestSetIdTrainer(t *testing.T) {
	trainer := Trainer{
		idTrainer:   123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	id := 1234

	trainer.SetIdTrainer(id)

	receivedId := trainer.GetIdTrainer()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestSetTrainerBirthDate(t *testing.T) {
	trainer := Trainer{
		idTrainer:   123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	birth := time.Now()

	trainer.SetBirthDate(birth)

	receivedDate := trainer.GetBirthDate()

	if receivedDate != birth {
		t.Fatalf("Expected %q, received %q", birth, receivedDate)
	}
}

func TestSetTrainerName(t *testing.T) {
	trainer := Trainer{
		idTrainer:   123,
		birthDate:   time.Now(),
		name:        "user",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	trainer.SetName("usuario")

	receivedName := trainer.GetName()

	if receivedName != "usuario" {
		t.Fatalf("Expected %q, received %q", "usuario", receivedName)
	}
}

func TestSetTrainerAlias(t *testing.T) {
	trainer := Trainer{
		idTrainer:   123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "u",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	trainer.SetAlias("usr")

	receivedAlias := trainer.GetAlias()

	if receivedAlias != "usr" {
		t.Fatalf("Expected %q, received %q", "usr", receivedAlias)
	}
}

func TestSetTrainerPhoneNumber(t *testing.T) {
	trainer := Trainer{
		idTrainer:   123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	trainer.SetPhoneNumber("5555555555")

	receivedPhoneNumber := trainer.GetPhoneNumber()

	if receivedPhoneNumber != "5555555555" {
		t.Fatalf("Expected %q, received %q", "5555555555", receivedPhoneNumber)
	}
}

func TestSetTrainerPassword(t *testing.T) {
	trainer := Trainer{
		idTrainer:   123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pass",
		description: "descripcion",
		specialty:   "especialidad",
	}

	trainer.SetPassword("pwd")

	receivedPassword := trainer.GetPassword()

	if receivedPassword != "pwd" {
		t.Fatalf("Expected %q, received %q", "pwd", receivedPassword)
	}
}

func TestSetTrainerDescription(t *testing.T) {
	trainer := Trainer{
		idTrainer:   123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "d",
		specialty:   "especialidad",
	}

	trainer.SetDescription("descripcion")

	receivedDescription := trainer.GetDescription()

	if receivedDescription != "descripcion" {
		t.Fatalf("Expected %q, received %q", "descripcion", receivedDescription)
	}
}

func TestSetTrainerSpecialty(t *testing.T) {
	trainer := Trainer{
		idTrainer:   123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "e",
	}

	trainer.SetSpecialty("especialidad")

	receivedSpecialty := trainer.GetSpecialty()

	if receivedSpecialty != "especialidad" {
		t.Fatalf("Expected %q, received %q", "especialidad", receivedSpecialty)
	}
}
