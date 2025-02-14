import apiClient from "@/app/api/apiClient/apiClient";

const register = async(name, email, password) => {
    try {
        const response = await apiClient.post("/api/register", {
            name: name,
            email: email,
            password: password
        });
        console.log(response);

    } catch (error) {
        console.log(error.response.data.error);
    }
}

export default register;