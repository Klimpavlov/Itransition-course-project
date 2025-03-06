import { NextResponse } from "next/server";
import axios from "axios";

const JIRA_DOMAIN = "https://itransition-training.atlassian.net";
const JIRA_EMAIL = "klimpavlov2002@gmail.com";
const JIRA_API_TOKEN = "ATATT3xFfGF0R_IpcqY5X8YRDmXizc2DkwfIgR14N_nA7i6F0GwiHziM4Su9ZNGJNqLi2wHS2nRFMpC_-F5Itay92ed86CnxOBA17j_gCS13OTHrxLQl0ZEAUxPVHtM9MCoLSI2KuJhp32SwzEkP1L2rfZYTkhTxisGCm1DDkH2g_xcvIwNf2AE=62D76C70";
const JIRA_PROJECT_KEY = "SCRUM";

export async function POST(req) {
    try {
        const { summary, template, link } = await req.json();

        const response = await axios.post(
            `${JIRA_DOMAIN}/rest/api/3/issue`,
            {
                fields: {
                    project: { key: JIRA_PROJECT_KEY },
                    summary: summary,
                    // priority: { name: priority },
                    description: {
                        type: "doc",
                        version: 1,
                        content: [
                            {
                                type: "paragraph",
                                content: [
                                    { type: "text", text: `Reported from: ${link}` },
                                    { type: "text", text: `\nTemplate: ${template}` }
                                ]
                            }
                        ]
                    },
                    issuetype: { name: "Task" }
                }
            },
            {
                headers: {
                    "Authorization": `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64")}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const ticketKey = response.data.key;
        const ticketUrl = `${JIRA_DOMAIN}/browse/${ticketKey}`;

        // return NextResponse.json(response.data, { status: 200 });
        return NextResponse.json({ ticketUrl, ticketKey }, { status: 200 });
    } catch (error) {
        console.error("Jira error:", error.response?.data || error.message);
        return NextResponse.json({ error: error.response?.data || error.message }, { status: 500 });
    }
}
