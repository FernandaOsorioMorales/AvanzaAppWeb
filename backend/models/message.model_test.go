package models

import (
	"testing"
	"time"
)

func TestGetMessageIdUser(t *testing.T) {
	id := 123
	message := Message{
		idUser:      id,
		idTrainer:   id,
		sentTime:    time.Now(),
		content:     "message",
		transmitter: "user",
	}

	receivedId := message.GetIdUser()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestGetMessageIdTrainer(t *testing.T) {
	id := 123
	message := Message{
		idUser:      id,
		idTrainer:   id,
		sentTime:    time.Now(),
		content:     "message",
		transmitter: "user",
	}

	receivedId := message.GetIdTrainer()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestGetMessageSentTime(t *testing.T) {
	sentAt := time.Now()
	message := Message{
		idUser:      123,
		idTrainer:   123,
		sentTime:    sentAt,
		content:     "message",
		transmitter: "user",
	}

	receivedDate := message.GetSentTime()

	if receivedDate != sentAt {
		t.Fatalf("Expected %q, received %q", sentAt, receivedDate)
	}
}

func TestGetMessageContent(t *testing.T) {
	message := Message{
		idUser:      123,
		idTrainer:   123,
		sentTime:    time.Now(),
		content:     "message",
		transmitter: "user",
	}

	receivedContent := message.GetContent()

	if receivedContent != "message" {
		t.Fatalf("Expected %q, received %q", "message", receivedContent)
	}
}

func TestGetMessageTransmitter(t *testing.T) {
	message := Message{
		idUser:      123,
		idTrainer:   123,
		sentTime:    time.Now(),
		content:     "message",
		transmitter: "user",
	}

	receivedTransmitter := message.GetTransmitter()

	if receivedTransmitter != "user" {
		t.Fatalf("Expected %q, received %q", "user", receivedTransmitter)
	}
}

func TestSetMessageIdUser(t *testing.T) {
	message := Message{
		idUser:      123,
		idTrainer:   123,
		sentTime:    time.Now(),
		content:     "message",
		transmitter: "user",
	}

	id := 1234

	message.SetIdUser(id)

	receivedId := message.GetIdUser()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestSetMessageIdTrainer(t *testing.T) {
	message := Message{
		idUser:      123,
		idTrainer:   123,
		sentTime:    time.Now(),
		content:     "message",
		transmitter: "user",
	}

	id := 1234

	message.SetIdTrainer(id)

	receivedId := message.GetIdTrainer()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestSetMessageSentTime(t *testing.T) {
	message := Message{
		idUser:      123,
		idTrainer:   123,
		sentTime:    time.Now(),
		content:     "message",
		transmitter: "user",
	}

	sentAt := time.Now()

	message.SetSentTime(sentAt)

	receivedDate := message.GetSentTime()

	if receivedDate != sentAt {
		t.Fatalf("Expected %q, received %q", sentAt, receivedDate)
	}
}

func TestSetMessageContent(t *testing.T) {
	message := Message{
		idUser:      123,
		idTrainer:   123,
		sentTime:    time.Now(),
		content:     "m",
		transmitter: "user",
	}

	message.SetContent("message")

	receivedContent := message.GetContent()

	if receivedContent != "message" {
		t.Fatalf("Expected %q, received %q", "message", receivedContent)
	}
}

func TestSetMessageTransmitter(t *testing.T) {
	message := Message{
		idUser:      123,
		idTrainer:   123,
		sentTime:    time.Now(),
		content:     "message",
		transmitter: "user",
	}

	err := message.SetTransmitter("u")

	if err == nil {
		t.Fatalf("Expected error when Setting invalid transmitter, received nil")
	}

	err = message.SetTransmitter("trainer")

	if err != nil {
		t.Fatalf("Unexpected error when Setting valid transmitter 'trainer' %q",
			err.Error())
	}

	receivedTransmitter := message.GetTransmitter()

	if receivedTransmitter != "trainer" {
		t.Fatalf("Expected %q, received %q", "trainer", receivedTransmitter)
	}

	err = message.SetTransmitter("user")

	if err != nil {
		t.Fatalf("Unexpected error when Setting valid transmitter 'user' %q",
			err.Error())
	}

	receivedTransmitter = message.GetTransmitter()

	if receivedTransmitter != "user" {
		t.Fatalf("Expected %q, received %q", "user", receivedTransmitter)
	}
}
