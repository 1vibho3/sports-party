const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const SECRET_KEY = 'team-GST611'; 

const register = async (req, res) =>{
    try{
        const {username, password, email} = req.body;
        let exisitingUser = await User.findOne({username});
        if(exisitingUser){
            return res.status(400).json({error:'Username already exists'});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, password: hashedPassword, email});
        await user.save();
        console.log(user);
        res.status(201).send('User registered');
    }
    catch{
        console.error(error);
        res.status(500).send('Server error');
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

module.exports = {register, login};