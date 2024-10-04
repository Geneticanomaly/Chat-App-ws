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

    // Upon connection - only to user
    socket.emit('message', 'Welcome to Chat App');

    // Upon connection - to all others
    socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)}} connected`);

    // Listening for a message event
    socket.on('message', (data) => {
        console.log(data);
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
    });

    // When user disconnects - to all others
    socket.on('disconnect', () => {
        socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)}} disconnected`);
    });

    socket.on('activity', (name) => {
        socket.broadcast.emit('activity', name);
    });
});

export { app, io, server };
