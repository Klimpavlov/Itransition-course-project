'use client';

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/sidebar/app-sidebar";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {useParams} from "next/navigation";
import getTemplateById from "@/app/api/templates/getTemplateById";
import {useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import createForm from "@/app/api/forms/createForm";
import createAnswer from "@/app/api/answers/createAnswer";


export default function TemplatePage() {
    const token = localStorage.getItem("token");
    const {id} = useParams();

    const [template, setTemplate] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [questionId, setQuestionId] = useState('');
    const [answerText,   setAnswerText] = useState('');
    const [formId, setFormId] = useState('');

    const fetchTemplate = async () => {
        console.log(id)
        const response = await getTemplateById(id, token);
        console.log("Template:", response);
        setTemplate(response.data.template);
        setQuestions(response.data.template.Questions);
    }

    useEffect(() => {
        fetchTemplate();
    }, [])

    const handleSubmitForm = async () => {
        const formResponse = await createForm(token, id);
        console.log("Form:", formResponse);
        // setFormId(formResponse.data.form.id);
        // if (formResponse) {
        //     const answerResponse = await createAnswer(token, formId, questionId, )
        // }
    }

    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="">
                <main className="">
                    <SidebarTrigger/>
                    <div className="w-full">
                        <Card key={template.id} className="cursor-pointer">
                            <CardHeader>
                                <CardTitle>{template.title}</CardTitle>
                                <CardDescription>Author: </CardDescription>
                                <CardDescription>Category: {template.category}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {questions.map((question) => (
                                    <div key={question.id} className="gap-2"
                                         onChange={() => setQuestionId(question.id)}
                                    >
                                        <Label htmlFor="question">{question.question_text}</Label>
                                        <Input id="question" type="question" placeholder="Enter response"
                                               onChange={(e) => setAnswerText(e.target.value)}
                                               required
                                        />
                                    </div>
                                ))
                                }
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleSubmitForm}>Submit form</Button>
                            </CardFooter>
                        </Card>
                    </div>

                </main>
            </div>
        </SidebarProvider>
    );
}
