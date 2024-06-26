const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.USER_SERVICE_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Increase server selection timeout to 30 seconds
            socketTimeoutMS: 45000 // Increase socket timeout to 45 seconds
        });
        console.log('User Service MongoDB connected');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}

module.exports = connectDB;