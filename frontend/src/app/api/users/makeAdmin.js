import apiClient from "@/app/api/apiClient/apiClient";

const makeAdmin = async (token, userId, successCallback) => {
    try {
        const response = await apiClient.put(`/api/users/${userId}/make-admin`, {}, {
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

export default makeAdmin;
