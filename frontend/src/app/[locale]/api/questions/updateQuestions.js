import apiClient from "@/app/[locale]/api/apiClient/apiClient";

const updateQuestions = async (token, questions) => {
    console.log(token, questions)
    try {
        const response = await apiClient.put(`/api/questions/update-questions`, questions, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export default updateQuestions;