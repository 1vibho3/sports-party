const express = require('express');
const cors = require('cors');
const ConnectDB = require('./src/config/db');
const friendRoutes = require('./src/routes/friendRoute');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

ConnectDB();

app.use('/friends', friendRoutes);

app.listen(5004, () => {
    console.log("App is running on port 5004");
});