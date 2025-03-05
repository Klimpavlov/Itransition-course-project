const jwt = require('jsonwebtoken');

const generateApiToken = (userId) => {
    const payload = { userId };
    const apiToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return apiToken;
};

const verifyApiToken = (req, res, next) => {
    const apiToken = req.headers.authorization?.split(' ')[1];

    const JWT_SECRET = process.env.JWT_SECRET;

    if (!apiToken) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(apiToken, JWT_SECRET);
        req.user = decoded;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = {generateApiToken, verifyApiToken};
