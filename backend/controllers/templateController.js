const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Template = require('../models/templateModel');

const createTemplate = async (req, res) => {
    const {title, category, isPublic} = req.body;

    if (!title) {
        return res.status(400).json({message: "Title is required"});
    }

    try {
        const template = await Template.create({
            title,
            category,
            isPublic,
            user_id: req.user.id});
        res.status(200).json({message: "Template is created", template})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"}, error.message);
    }
}

module.exports = {createTemplate}