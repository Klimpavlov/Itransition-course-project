import apiClient from "@/app/api/apiClient/apiClient";

const deleteQuestion = async (token, questionId, successCallback) => {
    try {
        const response = await apiClient.delete(`/api/questions/${questionId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        successCallback();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export default deleteQuestion;