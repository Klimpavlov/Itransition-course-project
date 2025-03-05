'use client';

import {AppSidebar} from "@/components/sidebar/app-sidebar";
import {useEffect, useState} from "react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import getUserInfo from "@/app/[locale]/api/users/getUserInfo";
import getAllTemplates from "@/app/[locale]/api/templates/getTemplates";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import getTemplateById from "@/app/[locale]/api/templates/getTemplateById";
import {useRouter} from 'next/navigation'
import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/theme/toggle-theme/modeToggle";
import Cookie from "js-cookie";
import {useTranslations} from "next-intl";
import {LanguageSwitcher} from "@/components/switchLanguage/language-switcher";


export default function MyProfile() {
    // const token = localStorage.getItem("token");
    const token = Cookie.get("token");
    const router = useRouter();

    const [myTemplates, setMyTemplates] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const getUser = async () => {
        const response = await getUserInfo(token);
        console.log("Fetched templates:", response.data.user.Templates);
        setMyTemplates(response.data.user.Templates);
        setUserInfo(response.data.user)
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

    // salesforce


    const t = useTranslations("MyProfile");


    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="w-full">
                <main className="">
                    <div className="flex justify-between m-2">
                        <SidebarTrigger/>
                        <div className='flex justify-center'>
                            <Button className='mr-2 bg-blue-500'
                                    onClick={() => router.push("/myProfile/salesforceAccount")}
                            >
                                Salesforce account
                            </Button>
                            <LanguageSwitcher/>
                            <ModeToggle/>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <p className='p-4 text-2xl font-bold'>{t("MyTemplates")}: {myTemplates.length}</p>
                        <Button className='m-4'
                                onClick={() => router.push("/myProfile/templates/createTemplate")}
                        >
                            {t("CreateTemplate")}
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
