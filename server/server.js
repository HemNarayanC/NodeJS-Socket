require('dotenv').config();
const http = require('http');
const express = require('express')
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("send_message", (data) => {
        console.log(`New Message: ${data.message}`);
        socket.broadcast.emit("receive_message", data);
    })
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});