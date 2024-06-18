const express = require('express');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userProfileRoute');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
// Use authentication routes
app.use('/userProfile', userRoutes);

const PORT = process.env.USER_SERVICE_PORT;
app.listen(PORT, () => {
    console.log(`User Profile service is up and running on port ${PORT}`);
});
