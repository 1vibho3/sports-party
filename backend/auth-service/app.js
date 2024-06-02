const express = require('express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();

app.use('/auth', authRoutes);

const PORT = process.env.AUTH_SERVICE_PORT;
app.listen(PORT, () => {
    console.log(`Auth service is up and running on port ${PORT}`);
});
