import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    try {
        const { firstName, lastName, email, phone, accountId, token } = await req.json();

        const response = await axios.post(
            "https://hiclass-dev-ed.develop.my.salesforce.com/services/data/v63.0/sobjects/Contact",
            {
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Phone: phone,
                AccountId: accountId
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error("Salesforce error:", error.response?.data || error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
