const express = require('express');
const {register, login, getUsers}  = require("../controllers/userController");
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authMiddleware, getUsers);

module.exports = router;

