const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.FRIEND_SERVICE_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Friend Service MongoDB connected');
        
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}

module.exports = ConnectDB;