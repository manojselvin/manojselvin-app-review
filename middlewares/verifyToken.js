const jwt = require('jsonwebtoken');
// Middleware to verify JWT token and extract user role
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded; // Contains user information including role
        next();
    });
};

module.exports = verifyToken;