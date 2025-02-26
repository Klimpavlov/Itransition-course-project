'use client';

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/sidebar/app-sidebar";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {useParams, useRouter} from "next/navigation";
import getTemplateById from "@/app/[locale]/api/templates/getTemplateById";
import {useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import createForm from "@/app/[locale]/api/forms/createForm";
import createAnswer from "@/app/[locale]/api/answers/createAnswer";
import {useToast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {ModeToggle} from "@/components/theme/toggle-theme/modeToggle";
import Cookie from "js-cookie";


export default function TemplatePage() {
    const {toast} = useToast();
    const router = useRouter();
    // const token = localStorage.getItem("token");
    const token = Cookie.get("token");
    const {id} = useParams();

    const [template, setTemplate] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [questionId, setQuestionId] = useState('');
    const [answerText,   setAnswerText] = useState('');
    const [answers, setAnswers] = useState([]);
    const [formId, setFormId] = useState('');

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
    }, [])

    const handleSubmitForm = async () => {
        try {
            if (answers.length === 0 || answers.some(a => !a.answerText || !a.answerText.trim())) {
                toast({
                    title: "Please, fill all fields",
                    description: "There was a problem with your request.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
                return;
            }

            const formResponse = await createForm(token, id);
            console.log("Form created:", formResponse);

            const formId = formResponse.data.form.id;
            setFormId(formId);

            const answersResponse = await createAnswer(token, formId, answers);
            console.log("Answers submitted:", answersResponse);
            router.push("/");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };



    const handleAnswerChange = (questionId, text) => {
        setAnswers(prev => {
            const updatedAnswers = [...prev];
            const existingIndex = updatedAnswers.findIndex(a => a.question_id === questionId);

            if (existingIndex !== -1) {
                updatedAnswers[existingIndex].answerText = text;
            } else {
                updatedAnswers.push({ question_id: questionId, answerText: text });
            }

            return updatedAnswers;
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="w-full">
                <main className="">
                    <div className="flex justify-between m-2">
                        <SidebarTrigger/>
                        <ModeToggle/>
                    </div>
                    <div className="flex justify-center w-full">
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
                                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                            required
                                        />
                                    </div>
                                ))}
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
