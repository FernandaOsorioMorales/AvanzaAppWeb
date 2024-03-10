package models

import (
	"testing"
	"time"
)

func TestGetIdUser(t *testing.T) {
	user := User{
		IdUser:      123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
	}

	receivedId := user.getIdUser()

	if receivedId != 123 {
		t.Fatalf("Expected %q, received %q", 123, receivedId)
	}
}

func TestGetUserBirthDate(t *testing.T) {
	birth := time.Now()
	user := User{
		IdUser:      123,
		BirthDate:   birth,
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
	}

	receivedDate := user.getBirthDate()

	if receivedDate != birth {
		t.Fatalf("Expected %q, received %q", birth, receivedDate)
	}
}

func TestGetUserName(t *testing.T) {
	user := User{
		IdUser:      123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
	}

	receivedName := user.getName()

	if receivedName != "usuario" {
		t.Fatalf("Expected %q, received %q", "usuario", receivedName)
	}
}

func TestGetUserAlias(t *testing.T) {
	user := User{
		IdUser:      123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
	}

	receivedAlias := user.getAlias()

	if receivedAlias != "usr" {
		t.Fatalf("Expected %q, received %q", "usr", receivedAlias)
	}
}

func TestGetUserPhoneNumber(t *testing.T) {
	user := User{
		IdUser:      123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
	}

	receivedPhoneNumber := user.getPhoneNumber()

	if receivedPhoneNumber != "5555555555" {
		t.Fatalf("Expected %q, received %q", "5555555555", receivedPhoneNumber)
	}
}

func TestGetUserPassword(t *testing.T) {
	user := User{
		IdUser:      123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
	}

	receivedPassword := user.getPassword()

	if receivedPassword != "pwd" {
		t.Fatalf("Expected %q, received %q", "pwd", receivedPassword)
	}
}

func TestSetIdUser(t *testing.T) {
	user := User{
		IdUser:      123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
	}

	id := 1234

	user.setIdUser(id)

	receivedId := user.getIdUser()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestSetUserBirthDate(t *testing.T) {
	user := User{
		IdUser:      123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
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
		IdUser:      123,
		BirthDate:   time.Now(),
		Name:        "user",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "pwd",
	}

	user.setName("usuario")

	receivedName := user.getName()

	if receivedName != "usuario" {
		t.Fatalf("Expected %q, received %q", "usuario", receivedName)
	}
}

func TestSetUserAlias(t *testing.T) {
	user := User{
		IdUser:      123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "u",
		PhoneNumber: "5555555555",
		Password:    "pwd",
	}

	user.setAlias("usr")

	receivedAlias := user.getAlias()

	if receivedAlias != "usr" {
		t.Fatalf("Expected %q, received %q", "usr", receivedAlias)
	}
}

func TestSetUserPhoneNumber(t *testing.T) {
	user := User{
		IdUser:      123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "55",
		Password:    "pwd",
	}

	user.setPhoneNumber("5555555555")

	receivedPhoneNumber := user.getPhoneNumber()

	if receivedPhoneNumber != "5555555555" {
		t.Fatalf("Expected %q, received %q", "5555555555", receivedPhoneNumber)
	}
}

func TestSetUserPassword(t *testing.T) {
	user := User{
		IdUser:      123,
		BirthDate:   time.Now(),
		Name:        "usuario",
		Alias:       "usr",
		PhoneNumber: "5555555555",
		Password:    "p",
	}

	user.setPassword("pwd")

	receivedPassword := user.getPassword()

	if receivedPassword != "pwd" {
		t.Fatalf("Expected %q, received %q", "pwd", receivedPassword)
	}
}
