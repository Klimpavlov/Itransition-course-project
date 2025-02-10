const express = require('express');
const {submitAnswers} = require('../controllers/answerController');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/forms/:form_id/answers", authMiddleware, submitAnswers);

module.exports = router;