const express = require('express');
const ConnectDB = require('./src/config/db');
const matchRoutes = require('./src/routes/match');
const cors = require('cors');
const { initBackgroundTasks } = require('./src/helpers/jobs');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

ConnectDB();

app.use('/match', matchRoutes);
initBackgroundTasks();

const PORT = process.env.AUTH_SERVICE_PORT;
app.listen(PORT, () => {
    console.log(`Match service is up and running on port ${PORT}`);
});