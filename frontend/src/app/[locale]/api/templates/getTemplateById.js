import apiClient from "@/app/[locale]/api/apiClient/apiClient";

const getTemplateById = async (templateId, token) => {
    try {
        const response = await apiClient.get(`/api/templates/${templateId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        }
        console.log(error);
    }
}

export default getTemplateById;