package tools

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"strings"

	"golang.org/x/crypto/argon2"
)

// As recommended by argon2 documentation
const time = 1
const memory = 64 * 2014

// Choosen by us, hopefully good enough defaults
const threads = 2
const keyLength = 1024 //in bytes
const saltLength = 8

// Produces a random sequence of bytes for salting
func randomSalt() ([]byte, error) {
	salt := make([]byte, saltLength)
	_, err := rand.Read(salt)
	if err != nil {
		return salt, err
	}
	return salt, nil
}

// Generates a new salted hash for a given password using argon2.
// Returns a string of the form "salt|passwordHash".
func GeneratePasswordHash(password string) (string, error) {
	salt, err := randomSalt()
	if err != nil {
		return "", err
	}

	hash := argon2.IDKey([]byte(password), salt, time, memory, threads, keyLength)

	stringHash := hex.EncodeToString(hash)
	stringSalt := hex.EncodeToString(salt)
	return fmt.Sprintf("%s|%s", stringSalt, stringHash), nil
}

// Test if a password matches a knownHash created with GeneratePasswordHash.
// Note that any error is returned as a false.
func doesPasswordMatch(clearCandidate string, knownHash string) bool {
	//pass bytes to hex and then do a simple string eq

	saltHashPair := strings.Split(knownHash, "|")
	hexSalt := saltHashPair[0]
	knownHashHex := saltHashPair[1]

	salt, sErr := hex.DecodeString(hexSalt)
	if sErr != nil {
		return false
	}

	testHash := argon2.IDKey([]byte(clearCandidate), salt, time, memory, threads, keyLength)

	return knownHashHex == hex.EncodeToString(testHash)
}
