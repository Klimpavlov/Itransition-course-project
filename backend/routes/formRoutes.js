const express = require('express');
const {createForm} = require('../controllers/formController');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/forms/:template_id", authMiddleware, createForm);

module.exports = router;