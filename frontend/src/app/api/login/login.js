import apiClient from "@/app/api/apiClient/apiClient";

const login = async(email, password, setError) => {
    console.log(email, password)
    try {
        const response = await apiClient.post("/api/login", {
            email: email,
            password: password
        });
        console.log(response);
        const token = response.data.token;
        console.log(token);
        localStorage.setItem("token", token);
    } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
        const errorMessage = (error.response?.data?.message) || "Something went wrong";
        setError(errorMessage);
    }
}

export default login;