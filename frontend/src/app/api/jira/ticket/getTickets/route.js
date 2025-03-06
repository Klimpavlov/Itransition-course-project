import { NextResponse } from "next/server";
import axios from "axios";

const JIRA_DOMAIN = "https://itransition-training.atlassian.net";
const JIRA_EMAIL = "klimpavlov2002@gmail.com";
const JIRA_API_TOKEN = "ATATT3xFfGF0R_IpcqY5X8YRDmXizc2DkwfIgR14N_nA7i6F0GwiHziM4Su9ZNGJNqLi2wHS2nRFMpC_-F5Itay92ed86CnxOBA17j_gCS13OTHrxLQl0ZEAUxPVHtM9MCoLSI2KuJhp32SwzEkP1L2rfZYTkhTxisGCm1DDkH2g_xcvIwNf2AE=62D76C70";
const JIRA_PROJECT_KEY = "SCRUM";

// const JIRA_DOMAIN = process.env.JIRA_DOMAIN;
// const JIRA_EMAIL = process.env.JIRA_EMAIL;
// const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
// const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

export async function GET() {
    try {
        const response = await axios.get(
            `${JIRA_DOMAIN}/rest/api/3/search`,
            {
                params: {
                    jql: `project=${JIRA_PROJECT_KEY} AND reporter=currentUser() ORDER BY created DESC`,
                    maxResults: 10
                },
                headers: {
                    "Authorization": `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64")}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return NextResponse.json(response.data.issues, { status: 200 });
    } catch (error) {
        console.error("Jira error:", error.response?.data || error.message);
        return NextResponse.json({ error: error.response?.data || error.message }, { status: 500 });
    }
}
