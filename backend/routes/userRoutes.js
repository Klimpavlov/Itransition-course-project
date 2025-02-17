const express = require('express');
const {register, login, getUsers, getCurrentUser, getUserById, makeAdmin, removeAdmin, toggleBlockUser, deleteUser}  = require("../controllers/userController");
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authMiddleware, getUsers);
router.get('/users/current', authMiddleware, getCurrentUser);
router.get('/users/:id', authMiddleware, getUserById);
router.put('/users/:id/make-admin', authMiddleware, makeAdmin);
router.put('/users/:id/remove-admin', authMiddleware, removeAdmin);
router.put('/users/:id/block', authMiddleware, toggleBlockUser);
router.delete('/users/:id/delete', authMiddleware, deleteUser);


module.exports = router;

