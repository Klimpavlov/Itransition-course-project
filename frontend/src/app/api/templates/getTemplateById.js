import apiClient from "@/app/api/apiClient/apiClient";

const getTemplateById = async (templateId, token) => {
    try {
        const response = await apiClient.get(`/api/template/${templateId}`, {
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

export default getTemplateById;