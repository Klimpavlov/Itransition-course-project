'use client';

import {AppSidebar} from "@/components/sidebar/app-sidebar";
import {useEffect, useState} from "react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import getUserInfo from "@/app/api/users/getUserInfo";
import getAllTemplates from "@/app/api/templates/getTemplates";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import getTemplateById from "@/app/api/templates/getTemplateById";
import {useRouter} from 'next/navigation'
import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/theme/toggle-theme/modeToggle";
import Cookie from "js-cookie";


export default function MyProfile() {
    // const token = localStorage.getItem("token");
    const token = Cookie.get("token");
    const router = useRouter();

    const [myTemplates, setMyTemplates] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const getUser = async () => {
        const response = await getUserInfo(token);
        console.log("Fetched templates:", response.data.Templates);
        setMyTemplates(response.data.Templates);
        setUserInfo(response.data)
    }

    useEffect(() => {
        getUser();
    }, []);

    const handleChooseTemplate = async (templateId) => {
        console.log(templateId)
        const response = await getTemplateById(templateId, token);
        console.log("Template:", response);
        router.push(`/myProfile/templates/${templateId}`);
    }

    console.log(myTemplates);

    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="w-full">
                <main className="">
                    <div className="flex justify-between m-2">
                        <SidebarTrigger/>
                        <ModeToggle/>
                    </div>
                    <div className='flex justify-between'>
                        <p className='p-4 text-2xl font-bold'>My templates</p>
                        <Button className='m-4'
                                onClick={() => router.push("/myProfile/templates/createTemplate")}
                        >
                            Create template
                        </Button>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
                        {myTemplates.map((template) =>
                            (
                                <Card key={template.id} className="cursor-pointer"
                                      onClick={() => handleChooseTemplate(template.id)}
                                >
                                    <CardHeader>
                                        <CardTitle>{template.title}</CardTitle>
                                        <CardDescription>Category: {template.category}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>Image will be there</p>
                                    </CardContent>
                                    <CardFooter>
                                        <CardDescription>Author: {userInfo.name}</CardDescription>
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
