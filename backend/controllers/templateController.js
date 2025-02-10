const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Template = require('../models/templateModel');

const createTemplate = async (req, res) => {
    const {title, category, is_public} = req.body;

    if (!title) {
        console.log("Title is required");
        return res.status(400).json({message: "Title is required"});
    }

    try {
        const template = await Template.create({
            title,
            category,
            is_public,
            user_id: req.user.id
        });
        console.log("Template is created", template);
        res.status(200).json({message: "Template is created", template})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"}, error.message);
    }
}

const getTemplates = async (req, res) => {
    try {
        const templates = await Template.findAll();
        console.log(templates);
        res.status(200).json({message: "Fetched templates:", templates})
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

module.exports = {createTemplate, getTemplates}