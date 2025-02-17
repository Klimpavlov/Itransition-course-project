'use client';

import {AppSidebar} from "@/components/sidebar/app-sidebar";
import {useEffect, useState} from "react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import getUserInfo from "@/app/api/users/getUserInfo";
import getAllTemplates from "@/app/api/templates/getTemplates";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import getTemplateById from "@/app/api/templates/getTemplateById";

export default function Home() {
    const token = localStorage.getItem("token");

    const [templates, setTemplates] = useState([])
    const getUser = async () => {
        await getUserInfo(token);
    }

    const getTemplates = async () => {
        const response = await getAllTemplates(token);
        console.log("Fetched templates:", response.data.templates);
        setTemplates(response.data.templates);
    }

    useEffect(() => {
        getUser();
        getTemplates();
    }, []);

    const handleChooseTemplate = async () => {
        const response = await getTemplateById(1, token);
        console.log("Template:", response);
    }

    console.log(templates);

    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="">
                <main className="">
                    <SidebarTrigger/>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
                    {templates.map((template) =>
                        (
                                    <Card key={template.id} onclick={}>
                                        <CardHeader>
                                            <CardTitle>{template.title}</CardTitle>
                                            <CardDescription>Category: {template.category}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>Image will be there</p>
                                        </CardContent>
                                        <CardFooter>
                                            <CardDescription>Author: </CardDescription>
                                        </CardFooter>
                                    </Card>
                        )
                    )}
                    </div>

                </main>
            </div>
        </SidebarProvider>
    );
}
