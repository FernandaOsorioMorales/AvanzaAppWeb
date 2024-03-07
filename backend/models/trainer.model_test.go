package models

import (
	"testing"
	"time"

	"github.com/google/uuid"
)

func TestGetIdTrainer(t *testing.T) {
	id := uuid.New()
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

	receivedId := trainer.getIdTrainer()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestGetTrainerBirthDate(t *testing.T) {
	birth := time.Now()
	trainer := Trainer{
		idTrainer:   uuid.New(),
		birthDate:   birth,
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	receivedDate := trainer.getBirthDate()

	if receivedDate != birth {
		t.Fatalf("Expected %q, received %q", birth, receivedDate)
	}
}

func TestGetTrainerName(t *testing.T) {
	trainer := Trainer{
		idTrainer:   uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	receivedName := trainer.getName()

	if receivedName != "usuario" {
		t.Fatalf("Expected %q, received %q", "usuario", receivedName)
	}
}

func TestGetTrainerAlias(t *testing.T) {
	trainer := Trainer{
		idTrainer:   uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	receivedAlias := trainer.getAlias()

	if receivedAlias != "usr" {
		t.Fatalf("Expected %q, received %q", "usr", receivedAlias)
	}
}

func TestGetTrainerPhoneNumber(t *testing.T) {
	trainer := Trainer{
		idTrainer:   uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	receivedPhoneNumber := trainer.getPhoneNumber()

	if receivedPhoneNumber != "5555555555" {
		t.Fatalf("Expected %q, received %q", "5555555555", receivedPhoneNumber)
	}
}

func TestGetTrainerPassword(t *testing.T) {
	trainer := Trainer{
		idTrainer:   uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	receivedPassword := trainer.getPassword()

	if receivedPassword != "pwd" {
		t.Fatalf("Expected %q, received %q", "pwd", receivedPassword)
	}
}

func TestGetTrainerDescription(t *testing.T) {
	trainer := Trainer{
		idTrainer:   uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	receivedDescription := trainer.getDescription()

	if receivedDescription != "descripcion" {
		t.Fatalf("Expected %q, received %q", "descripcion", receivedDescription)
	}
}

func TestGetTrainerSpecialty(t *testing.T) {
	trainer := Trainer{
		idTrainer:   uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	receivedSpecialty := trainer.getSpecialty()

	if receivedSpecialty != "especialidad" {
		t.Fatalf("Expected %q, received %q", "especialidad", receivedSpecialty)
	}
}

func TestSetIdTrainer(t *testing.T) {
	trainer := Trainer{
		idTrainer:   uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	id := uuid.New()

	trainer.setIdTrainer(id)

	receivedId := trainer.getIdTrainer()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestSetTrainerBirthDate(t *testing.T) {
	trainer := Trainer{
		idTrainer:   uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
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
		idTrainer:   uuid.New(),
		birthDate:   time.Now(),
		name:        "user",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	trainer.setName("usuario")

	receivedName := trainer.getName()

	if receivedName != "usuario" {
		t.Fatalf("Expected %q, received %q", "usuario", receivedName)
	}
}

func TestSetTrainerAlias(t *testing.T) {
	trainer := Trainer{
		idTrainer:   uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "u",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	trainer.setAlias("usr")

	receivedAlias := trainer.getAlias()

	if receivedAlias != "usr" {
		t.Fatalf("Expected %q, received %q", "usr", receivedAlias)
	}
}

func TestSetTrainerPhoneNumber(t *testing.T) {
	trainer := Trainer{
		idTrainer:   uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5",
		password:    "pwd",
		description: "descripcion",
		specialty:   "especialidad",
	}

	trainer.setPhoneNumber("5555555555")

	receivedPhoneNumber := trainer.getPhoneNumber()

	if receivedPhoneNumber != "5555555555" {
		t.Fatalf("Expected %q, received %q", "5555555555", receivedPhoneNumber)
	}
}

func TestSetTrainerPassword(t *testing.T) {
	trainer := Trainer{
		idTrainer:   uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "p",
		description: "descripcion",
		specialty:   "especialidad",
	}

	trainer.setPassword("pwd")

	receivedPassword := trainer.getPassword()

	if receivedPassword != "pwd" {
		t.Fatalf("Expected %q, received %q", "pwd", receivedPassword)
	}
}

func TestSetTrainerDescription(t *testing.T) {
	trainer := Trainer{
		idTrainer:   uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "d",
		specialty:   "especialidad",
	}

	trainer.setDescription("descripcion")

	receivedDescription := trainer.getDescription()

	if receivedDescription != "descripcion" {
		t.Fatalf("Expected %q, received %q", "descripcion", receivedDescription)
	}
}

func TestSetTrainerSpecialty(t *testing.T) {
	trainer := Trainer{
		idTrainer:   uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
		description: "descripcion",
		specialty:   "e",
	}

	trainer.setSpecialty("especialidad")

	receivedSpecialty := trainer.getSpecialty()

	if receivedSpecialty != "especialidad" {
		t.Fatalf("Expected %q, received %q", "especialidad", receivedSpecialty)
	}
}
