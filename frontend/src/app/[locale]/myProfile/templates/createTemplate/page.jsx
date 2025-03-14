'use client';

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/sidebar/app-sidebar";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { ToastAction } from "@/components/ui/toast"
import {Button} from "@/components/ui/button";
import {useState} from "react";
import createQuestions from "@/app/[locale]/api/questions/createQuestions";
import createTemplate from "@/app/[locale]/api/templates/createTemplate";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {ModeToggle} from "@/components/theme/toggle-theme/modeToggle";
import Cookie from "js-cookie";
import {useTranslations} from "next-intl";
import {LanguageSwitcher} from "@/components/switchLanguage/language-switcher";

export default function CreateTemplatePage() {
    const {toast} = useToast();
    const router = useRouter();
    // const token = localStorage.getItem("token");
    const token = Cookie.get("token");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [isPublic, setIsPublic] = useState(null);
    const [questions, setQuestions] = useState([""]);

    const addQuestion = () => {
        if (questions[questions.length - 1].trim() === "") return;
        setQuestions([...questions, ""]);
    };

    const fillQuestion = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = value;
        setQuestions(updatedQuestions);
    };

    const handleCreateTemplate = async () => {
        if (!title || !category || isPublic === null || questions.some(q => q.trim() === "")) {
            toast({
                title: "Please, fill all fields",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
            console.log("Please, fill all fields");
            return;
        }

        try {
            const response = await createTemplate(token, title, category, isPublic);
            console.log("Template created:", response);

            const templateId = response?.data?.template?.id;
            console.log(templateId)
            if (!templateId) {
                toast({
                    title: "Error",
                    description: "There was a problem with your request.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
                return;
            }

            const formattedQuestions = questions.map((question, index) => ({
                question_text: question,
                type: "text",
                description: "",
                show_in_results: true,
                position: index + 1
            }));

            const questionsResponse = await createQuestions(token, templateId, formattedQuestions, successRedirect);
            if(questionsResponse) {
                console.log(questionsResponse);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.location.href = '/login';
            }
            console.error("error while creating template and questions", error);
        }
    };

    const successRedirect = () => {
        router.push("/myProfile")
    }

    const t = useTranslations("MyProfile");


    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="w-full">
                <main>
                    <div className="flex justify-between m-2">
                        <SidebarTrigger/>
                        <div className='flex justify-center'>
                            <LanguageSwitcher/>
                            <ModeToggle/>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <p className="p-4 text-2xl font-bold">{t("CreateTemplate")}</p>
                        <Button className='m-4' onClick={()=>router.push("/myProfile")}>{t("Back")}</Button>
                    </div>
                    <div className="p-4 flex justify-center">
                        <Card className="w-1/2 cursor-pointer">
                            <CardHeader>
                                <CardTitle></CardTitle>
                                <CardDescription>{t("Title")}:</CardDescription>
                                <Input
                                    className="w-full"
                                    placeholder="Enter title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <CardDescription>{t("Category")}:</CardDescription>
                                <Select onValueChange={setCategory}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>{t("Categories")}</SelectLabel>
                                            <SelectItem value="Education">Education</SelectItem>
                                            <SelectItem value="Quiz">Quiz</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <CardDescription>{t("isPublic")}:</CardDescription>
                                <Select onValueChange={(value) => setIsPublic(value === "true")}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select is template public" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>{t("State")}</SelectLabel>
                                            <SelectItem value="true">True</SelectItem>
                                            <SelectItem value="false">False</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{t("AddQuestions")}:</CardDescription>
                                {questions.map((question, index) => (
                                    <Input
                                        key={index}
                                        className="w-full mt-2"
                                        placeholder="Enter question text"
                                        value={question}
                                        onChange={(e) => fillQuestion(index, e.target.value)}
                                    />
                                ))}
                                <Button variant="outline" onClick={addQuestion} className="mt-3">
                                    {t("AddOneMoreQuestion")}
                                </Button>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleCreateTemplate} className="mt-3">
                                    {t("CreateTemplate")}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}
