import apiClient from "@/app/api/apiClient/apiClient";

const getTemplateForms = async (token, templateId) => {
    console.log(token);
    try {
        const response = await apiClient.get(`/api/templates/${templateId}/forms`, {
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

export default getTemplateForms;