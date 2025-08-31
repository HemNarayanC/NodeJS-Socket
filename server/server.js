require('dotenv').config();
const http = require('http');
const express = require('express')
const { Server } = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});