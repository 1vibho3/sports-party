const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/route');

const app = express();
app.use(express.json());

connectDB();
// Use authentication routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Auth service is up and running on port ${PORT}`);
});
