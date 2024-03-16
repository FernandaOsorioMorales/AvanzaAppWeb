package models

import (
	"testing"
	"time"

	"github.com/google/uuid"
)

func TestGetIdUser(t *testing.T) {
	id := uuid.New()
	user := User{
		idUser:      id,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	receivedId := user.getIdUser()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestGetUserBirthDate(t *testing.T) {
	birth := time.Now()
	user := User{
		idUser:      uuid.New(),
		birthDate:   birth,
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	receivedDate := user.getBirthDate()

	if receivedDate != birth {
		t.Fatalf("Expected %q, received %q", birth, receivedDate)
	}
}

func TestGetUserName(t *testing.T) {
	user := User{
		idUser:      uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	receivedName := user.getName()

	if receivedName != "usuario" {
		t.Fatalf("Expected %q, received %q", "usuario", receivedName)
	}
}

func TestGetUserAlias(t *testing.T) {
	user := User{
		idUser:      uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	receivedAlias := user.getAlias()

	if receivedAlias != "usr" {
		t.Fatalf("Expected %q, received %q", "usr", receivedAlias)
	}
}

func TestGetUserPhoneNumber(t *testing.T) {
	user := User{
		idUser:      uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	receivedPhoneNumber := user.getPhoneNumber()

	if receivedPhoneNumber != "5555555555" {
		t.Fatalf("Expected %q, received %q", "5555555555", receivedPhoneNumber)
	}
}

func TestGetUserPassword(t *testing.T) {
	user := User{
		idUser:      uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	receivedPassword := user.getPassword()

	if receivedPassword != "pwd" {
		t.Fatalf("Expected %q, received %q", "pwd", receivedPassword)
	}
}

func TestSetIdUser(t *testing.T) {

	user := User{
		idUser:      uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	id := uuid.New()

	user.setIdUser(id)

	receivedId := user.getIdUser()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestSetUserBirthDate(t *testing.T) {
	user := User{
		idUser:      uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	birth := time.Now()

	user.setBirthDate(birth)

	receivedDate := user.getBirthDate()

	if receivedDate != birth {
		t.Fatalf("Expected %q, received %q", birth, receivedDate)
	}
}

func TestSetUserName(t *testing.T) {
	user := User{
		idUser:      uuid.New(),
		birthDate:   time.Now(),
		name:        "user",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	user.setName("usuario")

	receivedName := user.getName()

	if receivedName != "usuario" {
		t.Fatalf("Expected %q, received %q", "usuario", receivedName)
	}
}

func TestSetUserAlias(t *testing.T) {
	user := User{
		idUser:      uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "u",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	user.setAlias("usr")

	receivedAlias := user.getAlias()

	if receivedAlias != "usr" {
		t.Fatalf("Expected %q, received %q", "usr", receivedAlias)
	}
}

func TestSetUserPhoneNumber(t *testing.T) {
	user := User{
		idUser:      uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "55",
		password:    "pwd",
	}

	user.setPhoneNumber("5555555555")

	receivedPhoneNumber := user.getPhoneNumber()

	if receivedPhoneNumber != "5555555555" {
		t.Fatalf("Expected %q, received %q", "5555555555", receivedPhoneNumber)
	}
}

func TestSetUserPassword(t *testing.T) {
	user := User{
		idUser:      uuid.New(),
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "p",
	}

	user.setPassword("pwd")

	receivedPassword := user.getPassword()

	if receivedPassword != "pwd" {
		t.Fatalf("Expected %q, received %q", "pwd", receivedPassword)
	}
}
