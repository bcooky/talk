const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the static files
app.use(express.static('public'));

// Handle incoming WebSocket connections
io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id);

    // Receive message and send to all connected clients
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
