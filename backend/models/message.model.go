package models

import (
	"errors"
	"strings"
	"time"

	"gorm.io/gorm"
)

type Message struct {
	gorm.Model
	IdUser      int
	IdTrainer   int
	SentTime    time.Time
	Content     string
	Transmitter string
}

func (m *Message) getIdUser() int {
	return m.IdUser
}

func (m *Message) getIdTrainer() int {
	return m.IdTrainer
}

func (m *Message) getSentTime() time.Time {
	return m.SentTime
}

func (m *Message) getContent() string {
	return m.Content
}

func (m *Message) getTransmitter() string {
	return m.Transmitter
}

func (m *Message) setIdUser(id int) {
	m.IdUser = id
}

func (m *Message) setIdTrainer(id int) {
	m.IdTrainer = id
}

func (m *Message) setSentTime(time time.Time) {
	m.SentTime = time
}

func (m *Message) setContent(c string) {
	m.Content = c
}

func (m *Message) setTransmitter(tr string) error {
	transmitter := strings.ToLower(tr)
	if transmitter != "user" && transmitter != "trainer" {
		return errors.New("Transmitter must be one of 'user' " +
			"'trainer'. Received '" + tr + "'.")
	}
	m.Transmitter = tr
	return nil
}
