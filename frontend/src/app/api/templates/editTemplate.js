import apiClient from "@/app/api/apiClient/apiClient";

const editTemplate = async (token, templateId, title, category, is_public) => {
    console.log(token, templateId, title, category, is_public)
    try {
        const response = await apiClient.put(`/api/templates/${templateId}/edit-template`, {
            title: title,
            category: category,
            is_public: is_public
        }, {
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

export default editTemplate;