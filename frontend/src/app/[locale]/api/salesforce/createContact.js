import axios from "axios";


const createSalesforceContact = async (firstName, lastName, email, phone, accountId, token) => {
    try {
        const response = await axios.post("/api/salesforce/createContact", {
            firstName, lastName, email, phone, accountId, token
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error)
        console.log(error.message)
        console.error("error:", error.response?.data || error.message);
    }
};

export default createSalesforceContact;