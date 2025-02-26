import apiClient from "@/app/[locale]/api/apiClient/apiClient";

const createAnswer = async (token, formId, answers) => {
    try {
        const response = await apiClient.post(`/api/forms/${formId}/answers`, {
            answers
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