// Handles socket connections and messages.
package socket

import (
	"sync"

	"github.com/gofiber/contrib/websocket"
)

// Structure to map emails to connections.
// Uses mutex to safely read/write the connections map.
type SocketConns struct {
	connections map[string]*websocket.Conn
	mutex       sync.Mutex
}

// Global variable to keep all connections
var conns = &SocketConns{
	connections: make(map[string]*websocket.Conn),
}

// TODO Handle errors
// Adds a connection to the map
func NewConnection(email string, c *websocket.Conn) {
	conns.mutex.Lock()
	defer conns.mutex.Unlock()
	conns.connections[email] = c
}

// TODO Handle errors
// Returns the corresponding connection to an email
func GetConnection(email string) *websocket.Conn {
	conns.mutex.Lock()
	defer conns.mutex.Unlock()
	return conns.connections[email]
}

// TODO Handle errors
// Deletes a connection from the map
func RemoveConnection(email string) {
	conns.mutex.Lock()
	defer conns.mutex.Unlock()
	delete(conns.connections, email)
}
