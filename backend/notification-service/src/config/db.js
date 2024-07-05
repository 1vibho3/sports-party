const mongoose = require('mongoose');

const ConnectDB = async () => {
    try{
        await mongoose.connect(process.env.NOTIFICATION_SERVICE_DB_URL);
        console.log('Notification Service MongoDB connected');
    }
    catch(error){
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}

module.exports = ConnectDB;