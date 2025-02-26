import apiClient from "@/app/[locale]/api/apiClient/apiClient";

const createForm = async (token, templateId) => {
    try {
        const response = await apiClient.post(`/api/forms/${templateId}`, {

        },{
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

export default createForm;