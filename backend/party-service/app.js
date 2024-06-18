const express = require('express');
const ConnectDB = require('./src/config/db');
const partyRoutes = require('./src/routes/partyRoute');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

ConnectDB();

app.use('/party', partyRoutes);

const PORT = process.env.PARTY_SERVICE_PORT;
app.listen(PORT, ()=>{
    console.log('Server is listening on port 5003')
})