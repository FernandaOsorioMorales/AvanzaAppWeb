package models

import (
	"testing"
	"time"
)

func TestGetMessageIdUser(t *testing.T) {
	id := 123
	message := Message{
		IdUser:      id,
		IdTrainer:   id,
		SentTime:    time.Now(),
		Content:     "message",
		Transmitter: "user",
	}

	receivedId := message.getIdUser()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestGetMessageIdTrainer(t *testing.T) {
	id := 123
	message := Message{
		IdUser:      id,
		IdTrainer:   id,
		SentTime:    time.Now(),
		Content:     "message",
		Transmitter: "user",
	}

	receivedId := message.getIdTrainer()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestGetMessageSentTime(t *testing.T) {
	sentAt := time.Now()
	message := Message{
		IdUser:      123,
		IdTrainer:   123,
		SentTime:    sentAt,
		Content:     "message",
		Transmitter: "user",
	}

	receivedDate := message.getSentTime()

	if receivedDate != sentAt {
		t.Fatalf("Expected %q, received %q", sentAt, receivedDate)
	}
}

func TestGetMessageContent(t *testing.T) {
	message := Message{
		IdUser:      123,
		IdTrainer:   123,
		SentTime:    time.Now(),
		Content:     "message",
		Transmitter: "user",
	}

	receivedContent := message.getContent()

	if receivedContent != "message" {
		t.Fatalf("Expected %q, received %q", "message", receivedContent)
	}
}

func TestGetMessageTransmitter(t *testing.T) {
	message := Message{
		IdUser:      123,
		IdTrainer:   123,
		SentTime:    time.Now(),
		Content:     "message",
		Transmitter: "user",
	}

	receivedTransmitter := message.getTransmitter()

	if receivedTransmitter != "user" {
		t.Fatalf("Expected %q, received %q", "user", receivedTransmitter)
	}
}

func TestSetMessageIdUser(t *testing.T) {
	message := Message{
		IdUser:      123,
		IdTrainer:   123,
		SentTime:    time.Now(),
		Content:     "message",
		Transmitter: "user",
	}

	id := 1234

	message.setIdUser(id)

	receivedId := message.getIdUser()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestSetMessageIdTrainer(t *testing.T) {
	message := Message{
		IdUser:      123,
		IdTrainer:   123,
		SentTime:    time.Now(),
		Content:     "message",
		Transmitter: "user",
	}

	id := 1234

	message.setIdTrainer(id)

	receivedId := message.getIdTrainer()

	if receivedId != id {
		t.Fatalf("Expected %q, received %q", id, receivedId)
	}
}

func TestSetMessageSentTime(t *testing.T) {
	message := Message{
		IdUser:      123,
		IdTrainer:   123,
		SentTime:    time.Now(),
		Content:     "message",
		Transmitter: "user",
	}

	sentAt := time.Now()

	message.setSentTime(sentAt)

	receivedDate := message.getSentTime()

	if receivedDate != sentAt {
		t.Fatalf("Expected %q, received %q", sentAt, receivedDate)
	}
}

func TestSetMessageContent(t *testing.T) {
	message := Message{
		IdUser:      123,
		IdTrainer:   123,
		SentTime:    time.Now(),
		Content:     "m",
		Transmitter: "user",
	}

	message.setContent("message")

	receivedContent := message.getContent()

	if receivedContent != "message" {
		t.Fatalf("Expected %q, received %q", "message", receivedContent)
	}
}

func TestSetMessageTransmitter(t *testing.T) {
	message := Message{
		IdUser:      123,
		IdTrainer:   123,
		SentTime:    time.Now(),
		Content:     "message",
		Transmitter: "user",
	}

	err := message.setTransmitter("u")

	if err == nil {
		t.Fatalf("Expected error when setting invalid transmitter, received nil")
	}

	err = message.setTransmitter("trainer")

	if err != nil {
		t.Fatalf("Unexpected error when setting valid transmitter 'trainer' %q",
			err.Error())
	}

	receivedTransmitter := message.getTransmitter()

	if receivedTransmitter != "trainer" {
		t.Fatalf("Expected %q, received %q", "trainer", receivedTransmitter)
	}

	err = message.setTransmitter("user")

	if err != nil {
		t.Fatalf("Unexpected error when setting valid transmitter 'user' %q",
			err.Error())
	}

	receivedTransmitter = message.getTransmitter()

	if receivedTransmitter != "user" {
		t.Fatalf("Expected %q, received %q", "user", receivedTransmitter)
	}
}
