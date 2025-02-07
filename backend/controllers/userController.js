const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const existingUser = await User.findOne({where: {email}});
        if (existingUser) {
            return res.status(400).json("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword});
        res.status(201).json({message: "Registration success", user});

    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;

    // temporary solution
    const JWT_SECRET = "4b8e1cda9d7f0a739b6a7e6c9bf7e6f14c8d0f5a90e6b3c4a9b4e8c9a6f5b2d3";

    try {
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(400).json({message: "User not found"})
        }

        if (user.isBlocked) {
            return res.status(403).json({message: "User is blocked"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid password"})
        }

        const token = jwt.sign({id: user.id, isAdmin: user.isAdmin}, JWT_SECRET, {expiresIn: '1h'});
        return res.json({message: "Success login", token});
    } catch (error) {
        console.log(error);
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

const makeAdmin = async (req, res) => {
    const {id} = req.params;
    if (!req.user.isAdmin) {
        res.status(403).json({message: "User is not an administrator"})
    }

    try {
        await User.update({isAdmin: true}, {where: {id}});
        res.json({message: "User is an administrator now"})
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }

}

const removeAdmin = async (req, res) => {
    const {id} = req.params;
    if (!req.user.isAdmin) {
        res.status(403).json({message: "User is not an administrator"})
    }

    try {
        await User.update({isAdmin: false}, {where: {id}});
        res.json({message: "User is not an administrator now"})
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    if (!req.user.isAdmin) {
        res.status(403).json({message: "User is not an administrator"});
    }
    try {
        await User.destroy({where: {id}});
        res.json({message: "User is successfully deleted"});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

const toggleBlockUser = async (req, res) => {
    const {id} = req.params;
    if (!req.user.isAdmin) {
        res.status(403).json({message: "User is not an administrator"});
    }
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        await User.update({isBlocked: !user.isBlocked}, {where: {id}});
        res.json({message: `User has been ${user.isBlocked ? "unblocked" : "blocked"}`});

    } catch (error) {
        res.status(500).json({message: "Server error"});
    }

}
module.exports = {register, login, getUsers, makeAdmin, removeAdmin, toggleBlockUser, deleteUser}