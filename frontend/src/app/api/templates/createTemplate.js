import apiClient from "@/app/api/apiClient/apiClient";

const createTemplate = async (token, title, category, is_public) => {
    console.log(token, title, category, is_public)
    try {
        const response = await apiClient.post("/api/templates/create-template", {
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

export default createTemplate;