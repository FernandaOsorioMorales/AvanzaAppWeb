package models

import (
	"errors"
	"strings"
	"time"

	"gorm.io/gorm"
)

type Message struct {
	gorm.Model
	idUser      int
	idTrainer   int
	sentTime    time.Time
	content     string
	transmitter string
}

func NewMessage(idUser int,
	idTrainer int,
	sentTime time.Time,
	content string,
	transmitter string) Message {
	return Message{
		idUser:      idUser,
		idTrainer:   idTrainer,
		sentTime:    sentTime,
		content:     content,
		transmitter: transmitter,
	}
}

func (m *Message) GetIdUser() int {
	return m.idUser
}

func (m *Message) GetIdTrainer() int {
	return m.idTrainer
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

func (m *Message) SetIdUser(id int) {
	m.idUser = id
}

func (m *Message) SetIdTrainer(id int) {
	m.idTrainer = id
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
