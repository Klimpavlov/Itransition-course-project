import axios from "axios";

const createSalesforceAccount = async (name, token) => {
    try {
        const response = await axios.post("/api/salesforce/createAccount", {
            name, token
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("error:", error.response?.data || error.message);
    }
};
export default createSalesforceAccount;