import apiClient from "@/app/api/apiClient/apiClient";

const createAnswer = async (token, formId, questionId, answerText) => {
    try {
        const response = await apiClient.post(`/api/forms/${formId}/answers`, {
            question_id: questionId,
            answerText: answerText
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
    }
}

export default createAnswer;