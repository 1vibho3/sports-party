const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const ConnectDB = require('./src/config/db');
const Notification = require('./src/models/notificationModel');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

ConnectDB();

const users = {};

io.on('connection', (socket) => {
    console.log('New client connected');

    // Store the userId and socketId
    socket.on('register', (userId) => {
        users[userId] = socket.id;
        console.log(`User ${userId} registered with socket ID ${socket.id}`);
    });

    socket.on('friendRequestSent', async (data) => {
        try {
            const notification = new Notification({
                userId: data.userId,
                message: data.message
            });
            await notification.save();

            // Emit notification to the target user
            const targetSocketId = users[data.userId];
            if (targetSocketId) {
                io.to(targetSocketId).emit('notification', notification);
            }
        } catch (error) {
            console.log('Error saving notification:', error);
        }
    });

    socket.on('friendRequestAccepted', async (data) => {
        try {
            const notification = new Notification({
                userId: data.userId,
                message: data.message
            });
            await notification.save();

            // Emit notification to the target user
            const targetSocketId = users[data.userId];
            if (targetSocketId) {
                io.to(targetSocketId).emit('notification', notification);
            }
        } catch (error) {
            console.log('Error saving notification:', error);
        }
    });

    socket.on('disconnect', () => {
        // Remove the disconnected user from the mapping
        for (let userId in users) {
            if (users[userId] === socket.id) {
                delete users[userId];
                break;
            }
        }
        console.log('Client disconnected');
    });
});

const PORT = process.env.NOTIFICATION_SERVICE_PORT || 5006;
server.listen(PORT, () => {
    console.log(`Notification service running on port ${PORT}`);
});
