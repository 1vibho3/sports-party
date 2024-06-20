const jwt = require('jsonwebtoken');
const SECRET_KEY = 'qwerty'

const authenticateUser = (req, res, next) => {
    
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('JWT verification error:', err);
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
}

module.exports = authenticateUser;