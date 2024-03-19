// Handles socket connections.
package socket

import (
	"sync"

	"github.com/gofiber/contrib/websocket"
)

// Structure to map user ids to connections.
// Uses mutex to safely read/write the connections map.
type SocketConns struct {
	connections map[uint64]*websocket.Conn
	mutex       sync.Mutex
}

// Global variable to keep all connections
var conns = &SocketConns{
	connections: make(map[uint64]*websocket.Conn),
}

// TODO Handle errors
// Adds a connection to the map
func NewConnection(id uint64, c *websocket.Conn) {
	conns.mutex.Lock()
	defer conns.mutex.Unlock()
	conns.connections[id] = c
}

// TODO Handle errors
// Returns the corresponding connection to an email
func GetConnection(id uint64) *websocket.Conn {
	conns.mutex.Lock()
	defer conns.mutex.Unlock()
	return conns.connections[id]
}

// TODO Handle errors
// Deletes a connection from the map
func RemoveConnection(id uint64) {
	conns.mutex.Lock()
	defer conns.mutex.Unlock()
	delete(conns.connections, id)
}
