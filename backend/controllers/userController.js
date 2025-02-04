const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword});
        res.status(201).json({ message: "Registration success", user });

    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({message: "User not found"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid password"})
        }

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: "Success login", token });
    } catch (error) {
        return res.status(500).json({message: "Server error"});
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({attributes: {exclude: ['password']}});
        console.log('Fetched users:', users);
        res.json(users);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

module.exports = {register, login, getUsers}