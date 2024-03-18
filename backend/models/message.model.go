package models

import (
	"errors"
	"strings"
	"time"

	"gorm.io/gorm"
)

// TODO: Add email validation

// Structure to represent messages.
// EmailUser: User's email.
// EmailTrainer: Trainer's email.
// SentTime: Message's sent time.
// Content: Message.
// Transmitter: Person who sent the message.

type Message struct {
	gorm.Model
	EmailUser    string
	EmailTrainer string
	SentTime     time.Time
	Content      string
	Transmitter  string
}

// Creates a new Message.
func NewMessage(EmailUser string,
	EmailTrainer string,
	SentTime time.Time,
	Content string,
	Transmitter string) Message {
	return Message{
		EmailUser:    EmailUser,
		EmailTrainer: EmailTrainer,
		SentTime:     SentTime,
		Content:      Content,
		Transmitter:  Transmitter,
	}
}

// TODO Fix name
// Returns user's email.
func (m *Message) GetIdUser() string {
	return m.EmailUser
}

// TODO Fix name
// Returns trainer's email.
func (m *Message) GetIdTrainer() string {
	return m.EmailTrainer
}

// Returns sent time.
func (m *Message) GetSentTime() time.Time {
	return m.SentTime
}

// Returns message string.
func (m *Message) GetContent() string {
	return m.Content
}

// Returns transmitter.
func (m *Message) GetTransmitter() string {
	return m.Transmitter
}

// Sets user email.
func (m *Message) SetIdUser(EmailUser string) {
	m.EmailUser = EmailUser
}

// Sets trainer email.
func (m *Message) SetIdTrainer(EmailTrainer string) {
	m.EmailTrainer = EmailTrainer
}

// Sets sent time.
func (m *Message) SetSentTime(time time.Time) {
	m.SentTime = time
}

// Sets content.
func (m *Message) SetContent(c string) {
	m.Content = c
}

// Sets transmitter.
func (m *Message) SetTransmitter(tr string) error {
	Transmitter := strings.ToLower(tr)
	if Transmitter != "user" && Transmitter != "trainer" {
		return errors.New("Transmitter must be one of 'user' " +
			"'trainer'. Received '" + tr + "'.")
	}
	m.Transmitter = tr
	return nil
}
