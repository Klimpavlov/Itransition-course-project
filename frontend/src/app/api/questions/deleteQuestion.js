import apiClient from "@/app/api/apiClient/apiClient";

const deleteQuestion = async (token, questionId) => {
    try {
        const response = await apiClient.delete(`/api/questions/${questionId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        window.location.reload();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export default deleteQuestion;