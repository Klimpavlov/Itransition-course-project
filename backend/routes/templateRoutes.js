const express = require('express');
const {createTemplate, getTemplates} = require('../controllers/templateController');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/template/create-template", authMiddleware, createTemplate);
router.get("/template", getTemplates);

module.exports = router;