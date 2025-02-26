import apiClient from "@/app/[locale]/api/apiClient/apiClient";

const removeAdmin = async (token, userId, successCallback) => {
    try {
        const response = await apiClient.put(`/api/users/${userId}/remove-admin`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        successCallback();
    } catch (error) {
        console.error(error);
    }
}

export default removeAdmin;
