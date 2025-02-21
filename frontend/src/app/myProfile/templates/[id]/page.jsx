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
import editTemplate from "@/app/api/templates/editTemplate";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import updateQuestions from "@/app/api/questions/updateQuestions";


export default function MyTemplatePage() {
    const token = localStorage.getItem("token");
    const {id} = useParams();
    const router = useRouter();

    const [template, setTemplate] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [templateTitle, setTemplateTitle] = useState('');
    const [templateCategory, setTemplateCategory] = useState('');
    const [isPublic, setIsPublic] = useState(null);

    const [questionText, setQuestionText] = useState('')

    useEffect(() => {
        const fetchTemplate = async () => {
            const response = await getTemplateById(id, token);
            const data = response.data.template;

            setTemplate(data);
            setQuestions(data.Questions);

            setTemplateTitle(data.title);
            setTemplateCategory(data.category);
            setIsPublic(data.is_public);
        };

        fetchTemplate();
    }, []);

    const handleDeleteTemplate = async () => {
        await deleteTemplate(token, id, () => router.push("/myProfile"));
    };

    const handleUpdateTemplate = async () => {
        const updatedData = {
            title: templateTitle,
            category: templateCategory,
            is_public: isPublic
        };

        const response = await editTemplate(token, id, templateTitle, templateCategory, isPublic);
        console.log("Updated template:", response);

        setTemplate({...template, ...updatedData});
    };

    const handleUpdateQuestions = async () => {
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

        // = [{
        // id: 16,
        // question_text: "try edit question 16?",
        // type: "text",
        // description: "",
        // show_in_results: true,
        // position: 1
        // }];

        const response = await updateQuestions(token, updatedQuestions);
        console.log(response);
    }

    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="w-full">
                <main>
                    <div className="flex justify-between m-2">
                        <SidebarTrigger/>
                        <ModeToggle/>
                    </div>
                    <div className="flex justify-between">
                        <p className="p-4 text-2xl font-bold">Template</p>
                        <div>
                            <Button className="m-4" onClick={handleDeleteTemplate}>Delete template</Button>
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
                                        {questions.map((question) => (
                                            <div key={question.id} className="">
                                                <Input
                                                    value={questionText.question_text}
                                                    onChange={(e) => setQuestionText(e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <Button className="" onClick={handleUpdateTemplate}>Save changes</Button>
                                    <Button className="" onClick={handleUpdateQuestions}>TEST REQUEST UPDATE
                                        QUESTIONS</Button>
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
