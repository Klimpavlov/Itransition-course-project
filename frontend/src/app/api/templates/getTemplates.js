import apiClient from "@/app/api/apiClient/apiClient";

const getAllTemplates = async(token) => {
    try {
        const response = await apiClient.get("/api/templates", {
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

export default getAllTemplates;