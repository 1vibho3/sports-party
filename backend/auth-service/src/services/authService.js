const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SECRET_KEY = 'qwerty'

const register = async ({ username, password, email }) => {
    let existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    return user;
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
