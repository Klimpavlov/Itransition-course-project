import apiClient from "@/app/[locale]/api/apiClient/apiClient";

const deleteTemplate = async (token, templateId, successDeletedTemplate) => {
    try {
        const response = await apiClient.delete(`/api/templates/${templateId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        successDeletedTemplate();
    } catch (error) {
        console.log(error);
    }
}

export default deleteTemplate;