package models

import (
	"testing"
	"time"
)

func TestGetIdUser(t *testing.T) {
	user := User{
		idUser:      123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	receivedId := user.GetIdUser()

	if receivedId != 123 {
		t.Fatalf("Expected %q, received %q", 123, receivedId)
	}
}

func TestGetUserBirthDate(t *testing.T) {
	birth := time.Now()
	user := User{
		idUser:      123,
		birthDate:   birth,
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	receivedDate := user.GetBirthDate()

	if receivedDate != birth {
		t.Fatalf("Expected %q, received %q", birth, receivedDate)
	}
}

func TestGetUserName(t *testing.T) {
	user := User{
		idUser:      123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	receivedName := user.GetName()

	if receivedName != "usuario" {
		t.Fatalf("Expected %q, received %q", "usuario", receivedName)
	}
}

func TestGetUserAlias(t *testing.T) {
	user := User{
		idUser:      123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	receivedAlias := user.GetAlias()

	if receivedAlias != "usr" {
		t.Fatalf("Expected %q, received %q", "usr", receivedAlias)
	}
}

func TestGetUserPhoneNumber(t *testing.T) {
	user := User{
		idUser:      123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	receivedPhoneNumber := user.GetPhoneNumber()

	if receivedPhoneNumber != "5555555555" {
		t.Fatalf("Expected %q, received %q", "5555555555", receivedPhoneNumber)
	}
}

func TestGetUserPassword(t *testing.T) {
	user := User{
		idUser:      123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	receivedPassword := user.GetPassword()

	if receivedPassword != "pwd" {
		t.Fatalf("Expected %q, received %q", "pwd", receivedPassword)
	}
}

func TestSetIdUser(t *testing.T) {
	user := User{
		idUser:      123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	id := 1234

	user.SetIdUser(id)

	receivedId := user.GetIdUser()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestSetUserBirthDate(t *testing.T) {
	user := User{
		idUser:      123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	birth := time.Now()

	user.SetBirthDate(birth)

	receivedDate := user.GetBirthDate()

	if receivedDate != birth {
		t.Fatalf("Expected %q, received %q", birth, receivedDate)
	}
}

func TestSetUserName(t *testing.T) {
	user := User{
		idUser:      123,
		birthDate:   time.Now(),
		name:        "user",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	user.SetName("usuario")

	receivedName := user.GetName()

	if receivedName != "usuario" {
		t.Fatalf("Expected %q, received %q", "usuario", receivedName)
	}
}

func TestSetUserAlias(t *testing.T) {
	user := User{
		idUser:      123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "u",
		phoneNumber: "5555555555",
		password:    "pwd",
	}

	user.SetAlias("usr")

	receivedAlias := user.GetAlias()

	if receivedAlias != "usr" {
		t.Fatalf("Expected %q, received %q", "usr", receivedAlias)
	}
}

func TestSetUserPhoneNumber(t *testing.T) {
	user := User{
		idUser:      123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "55",
		password:    "pwd",
	}

	user.SetPhoneNumber("5555555555")

	receivedPhoneNumber := user.GetPhoneNumber()

	if receivedPhoneNumber != "5555555555" {
		t.Fatalf("Expected %q, received %q", "5555555555", receivedPhoneNumber)
	}
}

func TestSetUserPassword(t *testing.T) {
	user := User{
		idUser:      123,
		birthDate:   time.Now(),
		name:        "usuario",
		alias:       "usr",
		phoneNumber: "5555555555",
		password:    "p",
	}

	user.SetPassword("pwd")

	receivedPassword := user.GetPassword()

	if receivedPassword != "pwd" {
		t.Fatalf("Expected %q, received %q", "pwd", receivedPassword)
	}
}
