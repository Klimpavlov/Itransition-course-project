'use client';

import {AppSidebar} from "@/components/sidebar/app-sidebar";
import {useEffect, useState} from "react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import getUserInfo from "@/app/[locale]/api/users/getUserInfo";
import getAllTemplates from "@/app/[locale]/api/templates/getTemplates";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import getTemplateById from "@/app/[locale]/api/templates/getTemplateById";
import {useRouter} from 'next/navigation'
import {ModeToggle} from "@/components/theme/toggle-theme/modeToggle";
import Cookie from "js-cookie";
import {useTranslations} from "next-intl";
import {LanguageSwitcher} from "@/components/switchLanguage/language-switcher";


export default function Home() {
    // const token = localStorage.getItem("token");
    const token = Cookie.get("token");
    const router = useRouter();

    const [templates, setTemplates] = useState([]);
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

    const handleChooseTemplate = async (templateId) => {
        console.log(templateId)
        const response = await getTemplateById(templateId, token);
        console.log("Template:", response);
        router.push(`/templates/${templateId}`);
    }

    console.log(templates);

    const t = useTranslations("MainPage");


    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="w-full">
                <main className="">
                    <div className="flex justify-between m-2">
                        <SidebarTrigger/>
                        <div className='flex justify-center'>
                            <LanguageSwitcher/>
                            <ModeToggle/>
                        </div>
                    </div>
                    <p className='p-4 text-2xl font-bold'>{t("Templates")}</p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
                    {templates.map((template) =>
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
                                            <CardDescription>Author: {template.User.name}</CardDescription>
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
