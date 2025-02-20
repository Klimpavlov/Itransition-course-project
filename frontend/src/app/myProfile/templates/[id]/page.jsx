'use client';

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/sidebar/app-sidebar";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {useParams, useRouter} from "next/navigation";
import getTemplateById from "@/app/api/templates/getTemplateById";
import {useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import deleteTemplate from "@/app/api/templates/deleteTemplate";
import {ModeToggle} from "@/components/theme/toggle-theme/modeToggle";


export default function MyTemplatePage() {
    const token = localStorage.getItem("token");
    const {id} = useParams();
    const router = useRouter();

    const [template, setTemplate] = useState([]);
    const [questions, setQuestions] = useState([]);

    const fetchTemplate = async () => {
        console.log(id)
        const response = await getTemplateById(id, token);
        console.log("Template:", response);
        setTemplate(response.data.template);
        setQuestions(response.data.template.Questions);
        console.log(response.data.template.User.name);
    }

    useEffect(() => {
        fetchTemplate();
    }, []);

    const handleDeleteTemplate = async () => {
        console.log(id);
        const response = await deleteTemplate(token, id, successDeletedTemplate);
        console.log(response);
    }

    const successDeletedTemplate = async () => {
        router.push("/myProfile");
    }

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
                        <p className="p-4 text-2xl font-bold">Template</p>
                        <div>
                            <Button className='m-4' onClick={handleDeleteTemplate}>Delete template</Button>
                            <Button className='m-4'>Edit template</Button>
                        </div>
                    </div>
                    <div className="p-4 w-full">
                        <Card key={template.id} className="w-full max-w-4xl mx-auto p-5 cursor-pointer">
                            <CardHeader>
                                <CardTitle>{template.title}</CardTitle>
                                <CardDescription>Author: {template?.User?.name || "Unknown"}</CardDescription>
                                <CardDescription>Category: {template.category}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {questions.map((question) => (
                                    <div key={question.id} className="gap-2">
                                        <Label htmlFor={`question-${question.id}`}>{question.question_text}</Label>
                                        <Input
                                            id={`question-${question.id}`}
                                            type="text"
                                            placeholder="Enter response"
                                            required
                                        />
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <Button>Submit form</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}
