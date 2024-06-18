
const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());

app.use('/auth', createProxyMiddleware({target: 'http://localhost:5001/auth', changeOrigin: true}));
app.use('/match', createProxyMiddleware({target: 'http://localhost:5002/match', changeOrigin: true}));
app.use('/party', createProxyMiddleware({target: 'http://localhost:5003/party', changeOrigin: true}));
app.use('/friends', createProxyMiddleware({target: 'http://localhost:5004/friends', changeOrigin: true}));
app.use('/userProfile', createProxyMiddleware({target: 'http://localhost:5005/userProfile', changeOrigin: true}));


app.listen(5000, ()=>{
    console.log('API Gateway listening on port 5000');
});