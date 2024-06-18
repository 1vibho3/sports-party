const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.USER_SERVICE_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('User Service MongoDB connected');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}

module.exports = connectDB;