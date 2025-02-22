import apiClient from "@/app/api/apiClient/apiClient";
import Cookie from "js-cookie";

const login = async (email, password, setError, successRedirect) => {
    console.log(email, password)
    try {
        const response = await apiClient.post("/api/login", {
            email: email,
            password: password
        });
        console.log(response);
        const token = response.data.token;
        console.log(token);
        // localStorage.setItem("token", token);
        Cookie.set("token", token);
        successRedirect();
    } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
        const errorMessage = (error.response?.data?.message) || "Something went wrong";
        setError(errorMessage);
    }
}

export default login;