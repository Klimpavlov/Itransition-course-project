const express = require('express');
const {createTemplate, getTemplates, getTemplateForms, getTemplateQuestions} = require('../controllers/templateController');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/templates/create-template", authMiddleware, createTemplate);
router.get("/templates", authMiddleware, getTemplates);
router.get("/templates/:template_id/forms", authMiddleware, getTemplateForms);
router.get("/templates/:template_id/questions", authMiddleware, getTemplateQuestions)


module.exports = router;