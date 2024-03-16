package tools

import (
	"testing"
)

func TestHashConsistency(t *testing.T) {
	password := "basicPassword"
	hash, err := GeneratePasswordHash(password)
	if err != nil {
		t.Fatalf("Error while generating hash")
	}

	if !DoesPasswordMatch(password, hash) {
		t.Fatalf("Error, doesPasswordMatch fails even though same password was passed from earlier hash")
	}

}

func TestSalting(t *testing.T) {
	password := "another"
	firstHash, firstErr := GeneratePasswordHash(password)
	secondHash, secondErr := GeneratePasswordHash(password)
	if firstErr != nil || secondErr != nil {
		t.Fatalf("Error while generating hashes")
	}

	//we could argue about getting the same salt twice
	//but honestly, isn't that a bug in itself ?
	if firstHash == secondHash {
		t.Fatalf("Got the same hashes for what should be two different salts:\n%s:::%s", firstHash, secondHash)
	}
}
