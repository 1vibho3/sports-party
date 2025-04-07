// Import required modules
const express = require('express'); // Express framework for building the API gateway
const { createProxyMiddleware } = require('http-proxy-middleware'); // Middleware for proxying requests to microservices
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing

const app = express(); // Initialize the Express application

// Enable CORS to allow requests from different origins
app.use(cors());

// Set up proxy middleware for each microservice route
// All incoming requests with these prefixes will be forwarded to the respective service

// Route for auth microservice
app.use('/auth', createProxyMiddleware({
    target: 'https://auth-service-514138068712.us-central1.run.app/auth',
    changeOrigin: true
}));

// Route for match microservice
app.use('/match', createProxyMiddleware({
    target: 'https://match-service-514138068712.us-central1.run.app/match',
    changeOrigin: true
}));

// Route for party microservice
app.use('/party', createProxyMiddleware({
    target: 'https://party-service-514138068712.us-central1.run.app/party',
    changeOrigin: true
}));

// Route for friend microservice
app.use('/friends', createProxyMiddleware({
    target: 'https://friend-service-514138068712.us-central1.run.app/friends',
    changeOrigin: true
}));

// Route for user profile microservice
app.use('/userProfile', createProxyMiddleware({
    target: 'https://user-service-514138068712.us-central1.run.app/userProfile',
    changeOrigin: true
}));

// Start the API Gateway server on port 8080
app.listen(8080, () => {
    console.log('API Gateway listening on port 8080');
});
