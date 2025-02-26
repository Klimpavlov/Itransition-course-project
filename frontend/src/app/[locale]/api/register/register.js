import apiClient from "@/app/[locale]/api/apiClient/apiClient";

const register = async(name, email, password, setError, successRedirect) => {
    try {
        const response = await apiClient.post("/api/register", {
            name: name,
            email: email,
            password: password
        });
        console.log(response);
        successRedirect();

    } catch (error) {
        console.log(error);
        console.log(error.response.data.error);
        const errorMessage = (error.response?.data?.message) ||  (error.response?.data) || "Something went wrong";
        setError(errorMessage);
    }
}

export default register;