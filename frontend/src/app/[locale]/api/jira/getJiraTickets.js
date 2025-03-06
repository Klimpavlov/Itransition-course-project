import axios from "axios";

const getJiraTicket = async () => {
    try {
        const response = await axios.get("/api/jira/ticket/getTickets", {
        });

        console.log(response.data);
        // return response.data;
        return response.data;
    } catch (error) {
        console.error("error:", error.response?.data || error.message);
    }
};
export default getJiraTicket;