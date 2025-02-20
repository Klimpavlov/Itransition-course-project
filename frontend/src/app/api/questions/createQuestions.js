import apiClient from "@/app/api/apiClient/apiClient";

const createQuestions = async (token, templateId, questions, successRedirect) => {
    console.log(token, templateId, questions);
    try {
        const response = await apiClient.post(`/api/templates/${templateId}/questions`, questions, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        successRedirect();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export default createQuestions;