package models

import (
	"testing"
	"time"
)

// TODO: Add email validation

func TestGetMessageIdUser(t *testing.T) {
	id := "123"
	message := Message{
		EmailUser:    id,
		EmailTrainer: id,
		SentTime:     time.Now(),
		Content:      "message",
		Transmitter:  "user",
	}

	receivedId := message.GetIdUser()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestGetMessageIdTrainer(t *testing.T) {
	id := "123"
	message := Message{
		EmailUser:    id,
		EmailTrainer: id,
		SentTime:     time.Now(),
		Content:      "message",
		Transmitter:  "user",
	}

	receivedId := message.GetIdTrainer()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestGetMessageSentTime(t *testing.T) {
	sentAt := time.Now()
	message := Message{
		EmailUser:    "123",
		EmailTrainer: "123",
		SentTime:     sentAt,
		Content:      "message",
		Transmitter:  "user",
	}

	receivedDate := message.GetSentTime()

	if receivedDate != sentAt {
		t.Fatalf("Expected %q, received %q", sentAt, receivedDate)
	}
}

func TestGetMessageContent(t *testing.T) {
	message := Message{
		EmailUser:    "123",
		EmailTrainer: "123",
		SentTime:     time.Now(),
		Content:      "message",
		Transmitter:  "user",
	}

	receivedContent := message.GetContent()

	if receivedContent != "message" {
		t.Fatalf("Expected %q, received %q", "message", receivedContent)
	}
}

func TestGetMessageTransmitter(t *testing.T) {
	message := Message{
		EmailUser:    "123",
		EmailTrainer: "123",
		SentTime:     time.Now(),
		Content:      "message",
		Transmitter:  "user",
	}

	receivedTransmitter := message.GetTransmitter()

	if receivedTransmitter != "user" {
		t.Fatalf("Expected %q, received %q", "user", receivedTransmitter)
	}
}

func TestSetMessageIdUser(t *testing.T) {
	message := Message{
		EmailUser:    "123",
		EmailTrainer: "123",
		SentTime:     time.Now(),
		Content:      "message",
		Transmitter:  "user",
	}

	id := "1234"

	message.SetIdUser(id)

	receivedId := message.GetIdUser()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestSetMessageIdTrainer(t *testing.T) {
	message := Message{
		EmailUser:    "123",
		EmailTrainer: "123",
		SentTime:     time.Now(),
		Content:      "message",
		Transmitter:  "user",
	}

	id := "1234"

	message.SetIdTrainer(id)

	receivedId := message.GetIdTrainer()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestSetMessageSentTime(t *testing.T) {
	message := Message{
		EmailUser:    "123",
		EmailTrainer: "123",
		SentTime:     time.Now(),
		Content:      "message",
		Transmitter:  "user",
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
		EmailUser:    "123",
		EmailTrainer: "123",
		SentTime:     time.Now(),
		Content:      "m",
		Transmitter:  "user",
	}

	message.SetContent("message")

	receivedContent := message.GetContent()

	if receivedContent != "message" {
		t.Fatalf("Expected %q, received %q", "message", receivedContent)
	}
}

func TestSetMessageTransmitter(t *testing.T) {
	message := Message{
		EmailUser:    "123",
		EmailTrainer: "123",
		SentTime:     time.Now(),
		Content:      "message",
		Transmitter:  "user",
	}

	err := message.SetTransmitter("u")

	if err == nil {
		t.Fatalf("Expected error when Setting invalid Transmitter, received nil")
	}

	err = message.SetTransmitter("trainer")

	if err != nil {
		t.Fatalf("Unexpected error when Setting valid Transmitter 'trainer' %q",
			err.Error())
	}

	receivedTransmitter := message.GetTransmitter()

	if receivedTransmitter != "trainer" {
		t.Fatalf("Expected %q, received %q", "trainer", receivedTransmitter)
	}

	err = message.SetTransmitter("user")

	if err != nil {
		t.Fatalf("Unexpected error when Setting valid Transmitter 'user' %q",
			err.Error())
	}

	receivedTransmitter = message.GetTransmitter()

	if receivedTransmitter != "user" {
		t.Fatalf("Expected %q, received %q", "user", receivedTransmitter)
	}
}
