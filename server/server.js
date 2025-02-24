const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const authRoutes = require("./authRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.static("public"));
app.use(authRoutes);

let users = [];

io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);

    socket.on("joinChat", (username) => {
        users.push({ id: socket.id, username });
        io.emit("updateUserList", users);
    });

    socket.on("sendMessage", (message) => {
        io.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
        users = users.filter(user => user.id !== socket.id);
        io.emit("updateUserList", users);
    });
});

server.listen(3000, () => console.log("Server running on port 3000"));
