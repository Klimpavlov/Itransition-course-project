import axios from "axios";

export default async function getSalesforceToken() {
    try {
        const response = await axios.post('/api/salesforce/auth');
        console.log(response);
        return response.data.access_token;
    } catch (error) {
        console.error("Error getting token:", error.response?.data || error.message);
        throw new Error("Failed to get token");
    }
}
