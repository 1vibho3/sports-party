const { register, login } = require('../services/authService');

const registerController = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = await register({ username, password, email });
        res.status(201).send('User registered');
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await login({ username, password });
        console.log(token);
        res.status(200).send('Login Successful' );
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ error: error.message });
    }
};

module.exports = { registerController, loginController };