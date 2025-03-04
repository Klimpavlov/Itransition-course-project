import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = await fetch("https://hiclass-dev-ed.develop.my.salesforce.com/services/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: "3MVG9GCMQoQ6rpzSyQze.W54L8gWoszdtuvS6cj3OQerbELRY8tfIeju.T_cLJFsd8hR2dVmscZN27Zzzv6OT",
                client_secret: "11786F5A376FC2D3BB9785348DF60B9CC96D3AAE6A34B3A347737B4A6D070C6E",
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: "Salesforce token request failed", details: errorData }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching Salesforce token:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}