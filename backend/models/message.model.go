package models

import (
	"time"

	"gorm.io/gorm"
)

// TODO: Add email validation

// Structure to represent messages.
// IdUser: User's email.
// IdTrainer: Trainer's email.
// SentTime: Message's sent time.
// Content: Message.
// Transmitter: Person who sent the message.

type Message struct {
	gorm.Model
	IdAddressee   uint64
	IdTransmitter uint64
	SentTime      time.Time
	Content       string
}

// Creates a new Message.
func NewMessage(IdAddressee uint64,
	IdTransmitter uint64,
	SentTime time.Time,
	Content string) Message {
	return Message{
		IdAddressee:   IdAddressee,
		IdTransmitter: IdTransmitter,
		SentTime:      SentTime,
		Content:       Content,
	}
}

// Returns addressee id.
func (m *Message) GetIdAddressee() uint64 {
	return m.IdAddressee
}

// Returns transmitter email.
func (m *Message) GetIdTransmitter() uint64 {
	return m.IdAddressee
}

// Returns sent time.
func (m *Message) GetSentTime() time.Time {
	return m.SentTime
}

// Returns message string.
func (m *Message) GetContent() string {
	return m.Content
}

// Sets addressee id.
func (m *Message) SetIdUser(IdAddressee uint64) {
	m.IdAddressee = IdAddressee
}

// Sets transmitter id.
func (m *Message) SetIdTrainer(IdTransmitter uint64) {
	m.IdTransmitter = IdTransmitter
}

// Sets sent time.
func (m *Message) SetSentTime(time time.Time) {
	m.SentTime = time
}

// Sets content.
func (m *Message) SetContent(c string) {
	m.Content = c
}
