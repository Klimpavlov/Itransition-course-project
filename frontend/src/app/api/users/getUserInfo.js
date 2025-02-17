import apiClient from "@/app/api/apiClient/apiClient";

const getUserInfo = async (token) => {
    console.log(token);
    try {
        const response = await apiClient.get("/api/users/current", {
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

export default getUserInfo;