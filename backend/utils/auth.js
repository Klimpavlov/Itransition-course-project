const jwt = require('jsonwebtoken');

const generateApiToken = (userId) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    // const JWT_SECRET = "4b8e1cda9d7f0a739b6a7e6c9bf7e6f14c8d0f5a90e6b3c4a9b4e8c9a6f5b2d3";
    console.log('Generating API Token for user ID:', userId);
    const payload = { userId };
    const apiToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated API Token:', apiToken);
    return apiToken;
};

const verifyApiToken = (req, res, next) => {
    const apiToken = req.headers.authorization?.split(' ')[1];

    const JWT_SECRET = process.env.JWT_SECRET;
    // const JWT_SECRET = "4b8e1cda9d7f0a739b6a7e6c9bf7e6f14c8d0f5a90e6b3c4a9b4e8c9a6f5b2d3";


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
