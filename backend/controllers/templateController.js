const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const Template = require('../models/templateModel');
// const User = require('../models/userModel');
// const Form = require('../models/formModel');
// const Question = require("../models/questionModel");
// const Answer = require("../models/answerModel");
const { User, Form, Answer, Question, Template } = require('../models/index');


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
        console.log(error);
        res.status(500).json({message: "Server error", error});
    }
}

const getTemplateById = async (req,res) => {
    const {id} = req.params;
    try {
        const template = await Template.findOne({
            where: {id},
            include: {
                model: Question,
                attributes: ['id', 'question_text', 'position']
            }
        });

        if (!template) {
            return res.status(404).json({ message: "Template not found" });
        }

        console.log(template);
        res.status(200).json({message: "Fetched template:", template});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error", error});
    }
}

const getTemplateQuestions = async (req, res) => {
    const {template_id} = req.params;
    try {
        const questions = await Question.findAll({
            where: {template_id},
            order: [['position', 'ASC']]
        });
        res.status(200).json({message: "Fetched questions", questions});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error.message});
    }
}

const getTemplateForms = async (req, res) => {
    const {template_id} = req.params;

    try {
        console.log(User.associations);
        console.log(Form.associations);
        const forms = await Form.findAll({
            where: {template_id},
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'email']
                },
                {
                    model: Answer,
                    include: {
                        model: Question,
                        attributes: ['question_text']
                    }
                }
            ]
        });

        res.status(200).json({ message: 'Fetched forms:', forms });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error", error: error.message});
    }
};

module.exports = {createTemplate, getTemplates, getTemplateById, getTemplateQuestions, getTemplateForms}