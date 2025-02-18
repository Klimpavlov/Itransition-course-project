const Form = require('../models/formModel')
const createForm = async (req, res) => {
    try {
        const { template_id } = req.params;

        if (!template_id) {
            return res.status(400).json({ message: "Template ID is required" });
        }

        const form = await Form.create({
            template_id,
            user_id: req.user.id
        });

        res.status(201).json({ message: "Form created", form });
    } catch (error) {
        console.error("Error creating form:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = {createForm};