package models

import (
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
)

type Message struct {
	idUser      uuid.UUID
	idTrainer   uuid.UUID
	sentTime    time.Time
	content     string
	transmitter string
}

func (m *Message) getIdUser() uuid.UUID {
	return m.idUser
}

func (m *Message) getIdTrainer() uuid.UUID {
	return m.idTrainer
}

func (m *Message) getSentTime() time.Time {
	return m.sentTime
}

func (m *Message) getContent() string {
	return m.content
}

func (m *Message) getTransmitter() string {
	return m.transmitter
}

func (m *Message) setIdUser(id uuid.UUID) {
	m.idUser = id
}

func (m *Message) setIdTrainer(id uuid.UUID) {
	m.idTrainer = id
}

func (m *Message) setSentTime(time time.Time) {
	m.sentTime = time
}

func (m *Message) setContent(c string) {
	m.content = c
}

func (m *Message) setTransmitter(tr string) error {
	transmitter := strings.ToLower(tr)
	if transmitter != "user" && transmitter != "trainer" {
		return errors.New("Transmitter must be one of 'user' " +
			"'trainer'. Received '" + tr + "'.")
	}
	m.transmitter = tr
	return nil
}
