const Question = require("../models/questionModel");
const Template = require("../models/templateModel");

const addQuestion = async (req, res) => {
    const {template_id} = req.params;
    const questions = req.body;
    // const { template_id, question_text, type, description, show_in_results, position } = req.body;

    if (!template_id) {
        return res.status(400).json({message: "Template ID is required"});
    }

    try {
        const template = await Template.findByPk(template_id);
        if (!template) {
            return res.status(404).json({message: "Template not found"});
        }

        const createdQuestions = await Question.bulkCreate(
            questions.map(q => ({
                template_id,
                question_text: q.question_text,
                type: q.type,
                description: q.description,
                show_in_results: q.show_in_results,
                position: q.position
            }))
        );
        res.status(201).json({message: "Questions added:", questions: createdQuestions});
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

const updateQuestions = async (req, res) => {
    const questions = req.body;

    try {
        const updates = await Promise.all(questions.map(async (q) => {
            const [updated] = await Question.update(
                {
                    question_text: q.question_text,
                    type: q.type,
                    description: q.description,
                    show_in_results: q.show_in_results,
                    position: q.position
                },
                {where: {id: q.id}}
            );

            return updated ? await Question.findByPk(q.id) : null;
        }));

        res.status(200).json({message: "Questions updated", questions: updates.filter(q => q !== null)});
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};


const deleteQuestion = async (req, res) => {
    const {id} = req.params;
    try {
        const question = await Question.findByPk(id);
        if (!question) {
            return res.status(404).json({message: "Question not found"});
        }
        await question.destroy();
        res.status(200).json({message: "Question successfully deleted"})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

module.exports = {addQuestion, updateQuestions, deleteQuestion};