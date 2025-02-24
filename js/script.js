// Connection to the server using WebSockets
const socket = io.connect('http://localhost:3000');

// DOM Elements
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messages = document.getElementById('messages');

// Send Message to Server
sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== "") {
        socket.emit('sendMessage', message);
        messageInput.value = '';
    }
});

// Receive Messages from Server
socket.on('receiveMessage', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;  // Scroll to the bottom
});
