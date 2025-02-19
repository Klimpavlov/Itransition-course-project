const express = require('express');
const {addQuestion, deleteQuestion} = require('../controllers/questionController');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// router.post("/questions", authMiddleware, addQuestion);
router.post("/templates/:template_id/questions", authMiddleware, addQuestion);
router.delete('/questions/:id', authMiddleware, deleteQuestion);

module.exports = router;