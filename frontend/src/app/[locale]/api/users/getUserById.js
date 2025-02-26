import apiClient from "@/app/[locale]/api/apiClient/apiClient";

const getUserById = async (userId, token) => {
    try {
        const response = await apiClient.get(`/api/users/${userId}`, {
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

export default getUserById;