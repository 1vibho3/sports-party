
const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());

app.use('/auth', createProxyMiddleware({target: 'http://localhost:5001/auth', changeOrigin: true}));
app.use('/match', createProxyMiddleware({target: 'http://localhost:5002/match', changeOrigin: true}));


app.listen(5000, ()=>{
    console.log('API Gateway listening on port 5000');
});