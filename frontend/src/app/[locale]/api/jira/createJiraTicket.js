import axios from "axios";

const createJiraTicket = async (summary, template, link) => {
    try {
        const response = await axios.post("/api/jira/ticket/createTicket", {
            // summary, priority, template, link
            summary, template, link
        });

        console.log(response.data);
        // return response.data;
        return response.data.ticketUrl;
    } catch (error) {
        console.error("error:", error.response?.data || error.message);
    }
};
export default createJiraTicket;