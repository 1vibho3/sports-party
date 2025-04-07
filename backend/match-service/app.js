const express = require('express'); // Import Express framework
const ConnectDB = require('./src/config/db'); // Import function to connect to the database
const matchRoutes = require('./src/routes/match'); // Import match-related API routes
const cors = require('cors'); // Import CORS middleware
const { initBackgroundTasks } = require('./src/helpers/jobs'); // Import function to initialize background tasks
require('dotenv').config(); // Load environment variables from .env file

const app = express(); // Create an instance of Express

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

ConnectDB(); // Establish database connection

app.use('/match', matchRoutes); // Register match routes with '/match' prefix
initBackgroundTasks(); // Initialize background tasks like cron jobs or schedulers

const PORT = process.env.AUTH_SERVICE_PORT; // Get port from environment variables
app.listen(PORT, () => {
    console.log(`Match service is up and running on port ${PORT}`); // Log that the server is running
});
