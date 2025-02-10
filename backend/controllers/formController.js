const Form = require('../models/formModel')

const createForm = async (req, res) => {
    // const {template_id} = req.body.template_id;
    try {
        // if (!template_id) {
        //     res.status(400).json({ message: "Template not found" });
        // }
        const form = await Form.create({
            template_id: req.body.template_id,
            user_id: req.user.id
        });
        res.status(201).json({ message: "Form created", form });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error", error});
    }
}

module.exports = {createForm};