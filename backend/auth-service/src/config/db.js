const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.AUTH_SERVICE_DB_URL, {
    });
        console.log('Auth Service MongoDB connected');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}

module.exports = ConnectDB;