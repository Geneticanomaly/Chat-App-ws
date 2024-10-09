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

const userSocketMap: Record<string, string> = {};

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    // Upon connection - only to user
    // socket.emit('message', 'Welcome to Chat App');

    // Upon connection - to all others
    // socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)}} connected`);

    socket.on('connectToChat', (userId: string) => {
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} registered with socket ID ${socket.id}`);
    });

    socket.on('disconnectFromChat', (userId: string) => {
        if (userSocketMap[userId]) {
            delete userSocketMap[userId];
            console.log(`User ${userId} unregistered`);
        }
    });

    // Listening for a message event
    socket.on('message', ({ recipientId, message }) => {
        console.log(`Message from ${socket.id} to ${recipientId}: ${message.message}`);
        const recipientSocketId = userSocketMap[recipientId];
        const newMessage = {
            chatId: message.chatId,
            senderId: message.senderId,
            message: message.message,
            isRead: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('message', newMessage);
        } else {
            console.log(`User ${recipientId} not found`);
        }
        // io.emit('message', `${socket.id.substring(0, 5)}: ${message}`);
    });

    // When user disconnects - to all others
    // socket.on('disconnect', () => {
    //     socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)}} disconnected`);
    // });

    socket.on('activity', (name) => {
        socket.broadcast.emit('activity', name);
    });
});

export { app, io, server };
