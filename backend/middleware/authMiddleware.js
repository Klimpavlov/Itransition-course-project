const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    // temporary solution
    // const JWT_SECRET = "4b8e1cda9d7f0a739b6a7e6c9bf7e6f14c8d0f5a90e6b3c4a9b4e8c9a6f5b2d3";
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;
