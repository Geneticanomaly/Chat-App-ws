import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';

const app = express();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5173'],
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.on('message', (data) => {
        console.log(data);
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
    });
});

export { app, io, server };
