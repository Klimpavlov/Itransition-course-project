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
import deleteTemplate from "@/app/[locale]/api/templates/deleteTemplate";
import {ModeToggle} from "@/components/theme/toggle-theme/modeToggle";
import editTemplate from "@/app/[locale]/api/templates/editTemplate";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import updateQuestions from "@/app/[locale]/api/questions/updateQuestions";
import deleteQuestion from "@/app/[locale]/api/questions/deleteQuestion";
import createQuestions from "@/app/[locale]/api/questions/createQuestions";
import {ToastAction} from "@/components/ui/toast";
import {useToast} from "@/hooks/use-toast";
import Cookie from "js-cookie";
import {useTranslations} from "next-intl";
import {LanguageSwitcher} from "@/components/switchLanguage/language-switcher";


export default function MyTemplatePage() {
    // const token = localStorage.getItem("token");
    const token = Cookie.get("token");
    const {id} = useParams();
    const router = useRouter();
    const {toast} = useToast();

    const [template, setTemplate] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [templateTitle, setTemplateTitle] = useState('');
    const [templateCategory, setTemplateCategory] = useState('');
    const [isPublic, setIsPublic] = useState(null);

    const [questionText, setQuestionText] = useState('');
    const [addedQuestions, setAddedQuestions] = useState([]);

    const fetchTemplate = async () => {
        const response = await getTemplateById(id, token);
        const data = response.data.template;

        setTemplate(data);
        setQuestions(data.Questions);

        setTemplateTitle(data.title);
        setTemplateCategory(data.category);
        setIsPublic(data.is_public);
    };

    useEffect(() => {
        fetchTemplate();
    }, []);

    const handleDeleteTemplate = async () => {
        await deleteTemplate(token, id, () => router.push("/myProfile"));
    };

    // update template
    const handleUpdateTemplate = async () => {
        const updatedData = {
            title: templateTitle,
            category: templateCategory,
            is_public: isPublic
        };

        if (!templateTitle || !templateCategory || isPublic === null || addedQuestions?.some(q => q.trim() === "")) {
            toast({
                title: "Please, fill all fields",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
            console.log("Please, fill all fields");
            return;
        }

        try {

            const response = await editTemplate(token, id, templateTitle, templateCategory, isPublic);
            console.log("Updated template:", response);

            setTemplate({...template, ...updatedData});

            // update questions

            console.log(questions);
            const updatedQuestions = questions.map((question) => (
                {
                    id: question.id,
                    question_text: questionText || question.question_text,
                    type: "text",
                    description: "",
                    show_in_results: true,
                    position: 1
                }
            ))
            const questionsResponse = await updateQuestions(token, updatedQuestions);
            console.log(questionsResponse);

            // add new questions

            const newQuestions = addedQuestions.map((question) => (
                {
                    question_text: question,
                    type: "text",
                    description: "",
                    show_in_results: true,
                    position: 1
                }
            ));

            const addedQuestionsResponse = await createQuestions(token, id, newQuestions);
            console.log(addedQuestionsResponse);
            router.push("/myProfile");
        } catch (error) {
            console.error("error while editing template and questions", error);
        }
    }


    // add questions

    const addQuestion = () => {
        if (addedQuestions.length === 0 || addedQuestions[addedQuestions.length - 1].trim() === "") {
            setAddedQuestions([...addedQuestions, ""]);
        }
    };

    const fillQuestion = (index, value) => {
        const updatedQuestions = [...addedQuestions];
        updatedQuestions[index] = value;
        setAddedQuestions(updatedQuestions);
    };

    // delete questions

    const handleDeleteQuestion = async (id) => {
        const response = await deleteQuestion(token, id, fetchTemplate);
        console.log(response);
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
                    <div className="flex justify-between">
                        <p className="p-4 text-2xl font-bold">{t("Template")}</p>
                        <div>
                            <Button variant='secondary' className="m-4"
                                    onClick={() => router.push(`/myProfile/templates/${id}/forms`)}>{t("ShowForms")}</Button>
                            <Button className="m-4" onClick={handleDeleteTemplate}>{t("DeleteTemplate")}</Button>
                        </div>
                    </div>
                    <div className="p-4 w-full">
                        {template && (
                            <Card key={template.id} className="w-full max-w-4xl mx-auto p-5 cursor-pointer">
                                <CardHeader>
                                    <CardDescription>
                                        Title:
                                        <Input
                                            value={templateTitle}
                                            onChange={(e) => setTemplateTitle(e.target.value)}
                                        />
                                    </CardDescription>
                                    <CardDescription>
                                        Category:
                                        <Select onValueChange={setTemplateCategory}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={templateCategory}
                                                             defaultValue={templateCategory}/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Categories</SelectLabel>
                                                    <SelectItem value="Education">Education</SelectItem>
                                                    <SelectItem value="Quiz">Quiz</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </CardDescription>
                                    <CardDescription>Is public:
                                        <Select value={isPublic.toString()}
                                                onValueChange={(value) => setIsPublic(value === "true")}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={isPublic}/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>State</SelectLabel>
                                                    <SelectItem value="true">True</SelectItem>
                                                    <SelectItem value="false">False</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        Questions:
                                        {questions.map((question, index) => (
                                            <div key={question.id} className="mt-2 flex justify-between">
                                                <Input
                                                    value={question.question_text}
                                                    onChange={(e) => {
                                                        const updatedQuestions = [...questions];
                                                        updatedQuestions[index] = {
                                                            ...question,
                                                            question_text: e.target.value
                                                        };
                                                        setQuestions(updatedQuestions);
                                                    }}
                                                />
                                                <Button className='ml-5'
                                                        onClick={() => handleDeleteQuestion(question.id)}>
                                                    {t("DeleteQuestion")}
                                                </Button>
                                            </div>
                                        ))}
                                        <div className='mt-2'>
                                            <CardDescription>Add questions:</CardDescription>
                                            {addedQuestions.map((question, index) => (
                                                <Input
                                                    key={index}
                                                    className="w-full mt-2"
                                                    placeholder="Enter question text"
                                                    value={question}
                                                    onChange={(e) => fillQuestion(index, e.target.value)}
                                                />
                                            ))}
                                            <Button
                                                variant="outline"
                                                onClick={addQuestion}
                                                className="mt-3"
                                                disabled={addedQuestions.length > 0 && addedQuestions[addedQuestions.length - 1].trim() === ""}
                                            >
                                                {t("AddQuestion")}
                                            </Button>
                                        </div>
                                    </CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <Button variant='secondary' className="" onClick={handleUpdateTemplate}>{t("SaveChanges")}</Button>
                                </CardFooter>
                            </Card>
                        )}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}

//     const [template, setTemplate] = useState([]);
//     const [questions, setQuestions] = useState([]);
//
//     const fetchTemplate = async () => {
//         console.log(id)
//         const response = await getTemplateById(id, token);
//         console.log("Template:", response);
//         setTemplate(response.data.template);
//         setQuestions(response.data.template.Questions);
//         console.log(response.data.template.User.name);
//     }
//
//     useEffect(() => {
//         fetchTemplate();
//     }, []);
//
//     const handleDeleteTemplate = async () => {
//         console.log(id);
//         const response = await deleteTemplate(token, id, successDeletedTemplate);
//         console.log(response);
//     }
//
//     //edit template
//
//     const [templateTitle, setTemplateTitle] = useState(template.title);
//
//     const successDeletedTemplate = async () => {
//         router.push("/myProfile");
//     }
//
//     console.log(templateTitle);
//
//     return (
//         <SidebarProvider>
//             <AppSidebar/>
//             <div className="w-full">
//                 <main className="">
//                     <div className="flex justify-between m-2">
//                         <SidebarTrigger/>
//                         <ModeToggle/>
//                     </div>
//                     <div className='flex justify-between'>
//                         <p className="p-4 text-2xl font-bold">Template</p>
//                         <div>
//                             <Button className='m-4' onClick={handleDeleteTemplate}>Delete template</Button>
//                             <Button className='m-4'>Edit template</Button>
//                         </div>
//                     </div>
//                     <div className="p-4 w-full">
//                         <Card key={template.id} className="w-full max-w-4xl mx-auto p-5 cursor-pointer">
//                             <CardHeader>
//                                 <CardTitle>{template.title}</CardTitle>
//                                 <CardDescription>Author: {template?.User?.name || "Unknown"}</CardDescription>
//                                 <CardDescription>Category: {template.category}</CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 {questions.map((question) => (
//                                     <div key={question.id} className="gap-2">
//                                         <Label htmlFor={`question-${question.id}`}>{question.question_text}</Label>
//                                         <Input
//                                             id={`question-${question.id}`}
//                                             type="text"
//                                             placeholder="Enter response"
//                                             required
//                                         />
//                                     </div>
//                                 ))}
//                             </CardContent>
//                             <CardFooter>
//                                 <Button>Submit form</Button>
//                             </CardFooter>
//                         </Card>
//                     </div>
//                 </main>
//             </div>
//         </SidebarProvider>
//     );
// }
