import apiClient from "@/app/api/apiClient/apiClient";

const getALlUsers = async (token) => {
    console.log(token);
    try {
        const response = await apiClient.get("/api/users", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export default getALlUsers;