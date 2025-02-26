import apiClient from "@/app/api/apiClient/apiClient";

const deleteUser = async (token, userId, successDeletedUser) => {
    try {
        const response = await apiClient.delete(`/api/users/${userId}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        successDeletedUser();
    } catch (error) {
        console.log(error);
    }
}

export default deleteUser;