package models

import (
	"errors"
	"strings"
	"time"

	"gorm.io/gorm"
)

// TODO: Add email validation
// TODO: Add comments

type Message struct {
	gorm.Model
	emailUser    string
	emailTrainer string
	sentTime     time.Time
	content      string
	transmitter  string
}

func NewMessage(emailUser string,
	emailTrainer string,
	sentTime time.Time,
	content string,
	transmitter string) Message {
	return Message{
		emailUser:    emailUser,
		emailTrainer: emailTrainer,
		sentTime:     sentTime,
		content:      content,
		transmitter:  transmitter,
	}
}

func (m *Message) GetIdUser() string {
	return m.emailUser
}

func (m *Message) GetIdTrainer() string {
	return m.emailTrainer
}

func (m *Message) GetSentTime() time.Time {
	return m.sentTime
}

func (m *Message) GetContent() string {
	return m.content
}

func (m *Message) GetTransmitter() string {
	return m.transmitter
}

func (m *Message) SetIdUser(emailUser string) {
	m.emailUser = emailUser
}

func (m *Message) SetIdTrainer(emailTrainer string) {
	m.emailTrainer = emailTrainer
}

func (m *Message) SetSentTime(time time.Time) {
	m.sentTime = time
}

func (m *Message) SetContent(c string) {
	m.content = c
}

func (m *Message) SetTransmitter(tr string) error {
	transmitter := strings.ToLower(tr)
	if transmitter != "user" && transmitter != "trainer" {
		return errors.New("transmitter must be one of 'user' " +
			"'trainer'. Received '" + tr + "'.")
	}
	m.transmitter = tr
	return nil
}
