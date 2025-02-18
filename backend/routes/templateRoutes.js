const express = require('express');
const {createTemplate, deleteTemplate, getTemplates, getTemplateById, getTemplateForms, getTemplateQuestions} = require('../controllers/templateController');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/templates/create-template", authMiddleware, createTemplate);
router.delete("/templates/:id", authMiddleware, deleteTemplate);
router.get("/templates", authMiddleware, getTemplates);
router.get("/templates/:id", authMiddleware, getTemplateById);
router.get("/templates/:template_id/forms", authMiddleware, getTemplateForms);
router.get("/templates/:template_id/questions", authMiddleware, getTemplateQuestions)


module.exports = router;