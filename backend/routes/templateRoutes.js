const express = require('express');
const {createTemplate} = require('../controllers/templateController');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/template/create-template", authMiddleware, createTemplate);

module.exports = router;