const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const axios = require('axios');

const SECRET_KEY = 'qwerty'

const register = async ({ username, password, email }) => {
    try{
        let existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email });
        const savedUser = await user.save();

        const profileData = {
            userId: savedUser._id,
            username:username
        };

        try {
            await axios.post('http://localhost:5000/userProfile/createUserProfile', profileData);
        } catch (error) {
            console.error('Error creating user profile:', error);
            // Optionally, implement retry logic here or handle the error as needed
        }

        return savedUser;
    }
    catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

const login = async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, process.env.AUTH_SERVICE_JWT_SECRET, { expiresIn: '1h' });
    console.log(token);
    return token;
};

module.exports = { register, login };
