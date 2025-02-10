const Answer = require('../models/answerModel')

const submitAnswers = async (req, res) => {
    const { form_id } = req.params;
    const { answers } = req.body;

    try {
        const createdAnswers = await Promise.all(
            answers.map(answer => Answer.create({
                form_id,
                question_id: answer.question_id,
                answerText: answer.answerText
            }))
        );

        res.status(201).json({ message: "Answers submitted", createdAnswers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {submitAnswers};