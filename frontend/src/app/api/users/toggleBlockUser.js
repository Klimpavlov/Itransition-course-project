import apiClient from "@/app/api/apiClient/apiClient";

const toggleBlockUser = async (token, userId, successCallback) => {
    try {
        const response = await apiClient.put(`/api/users/${userId}/block`, {}, {
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

export default toggleBlockUser;
