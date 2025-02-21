const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User, Form, Answer, Question, Template} = require('../models/index');
const { Op } = require('sequelize')


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
        res.status(500).json({message: "Server error"}, error);
    }
}

const deleteTemplate = async (req, res) => {
    const {id} = req.params;
    try {
        const template = await Template.findByPk(id);
        await template.destroy();
        res.status(200).json({message: "Template successfully deleted"});
    }  catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error", error});
    }
}

const editTemplate = async (req, res) => {
    const {title, category, is_public} = req.body;
    const user_id = req.user.id;
    const {id} = req.params;

    if (!title) {
        console.log("Title is required");
        return res.status(400).json({message: "Title is required"});
    }

    try {
        const template = await Template.update({
            title,
            category,
            is_public,
        }, {
            where: {
                id,
                user_id
            }
        });
        console.log("Template is updated", template);
        res.status(200).json({message: "Template is updated", template})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"}, error);
    }
}

const getTemplates = async (req, res) => {
    try {
        const userId = req.user.id;
        const templates = await Template.findAll({
            where: {
                user_id: {[Op.ne]: userId}
            },
            include: {
                model: User,
                attributes: ['name']
            },
            order: [['id', 'DESC']]
        });
        console.log(templates);
        res.status(200).json({message: "Fetched templates:", templates})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error", error});
    }
}

const getTemplateById = async (req, res) => {
    const {id} = req.params;
    try {
        const template = await Template.findOne({
            where: {id},
            include: [
                {
                    model: Question,
                    attributes: ['id', 'question_text', 'position'],
                }, {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        if (!template) {
            return res.status(404).json({message: "Template not found"});
        }

        console.log(template);
        res.status(200).json({message: "Fetched templates:", template});
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

        res.status(200).json({message: 'Fetched forms:', forms});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error", error: error.message});
    }
};

module.exports = {createTemplate, deleteTemplate, editTemplate, getTemplates, getTemplateById, getTemplateQuestions, getTemplateForms}