'use client';

import {AppSidebar} from "@/components/sidebar/app-sidebar";
import {useEffect, useState} from "react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import getUserInfo from "@/app/[locale]/api/users/getUserInfo";
import getAllTemplates from "@/app/[locale]/api/templates/getTemplates";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import getTemplateById from "@/app/[locale]/api/templates/getTemplateById";
import {useParams, useRouter} from 'next/navigation'
import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/theme/toggle-theme/modeToggle";
import getTemplateForms from "@/app/[locale]/api/forms/getTemplateForms";
import Cookie from "js-cookie";


export default function templateForms() {
    // const token = localStorage.getItem("token");
    const token = Cookie.get("token");
    const {id} = useParams();
    const router = useRouter();

    const [templateTitle, setTemplateTitle] = useState('');
    const [templateCategory, setTemplateCategory] = useState('');
    // const [isPublic, setIsPublic] = useState(null);
    const [forms, setForms] = useState([]);
    // const [userInfo, setUserInfo] = useState([]);


    const [selectedForm, setSelectedForm] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const fetchTemplate = async () => {
        const response = await getTemplateById(id, token);
        const data = response.data.template;

        setTemplateTitle(data.title);
        setTemplateCategory(data.category);
        // setIsPublic(data.is_public);
    };


    const getForms = async () => {
        const response = await getTemplateForms(token, id);
        console.log("Fetched forms:", response);
        setForms(response.data.forms);
    }

    useEffect(() => {
        getForms();
        fetchTemplate();
    }, []);

    const openModal = (form) => {
        setSelectedForm(form);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedForm(null);
        setIsModalOpen(false);
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
                    <div className='flex justify-between'>
                        <p className='p-4 text-2xl font-bold'>Template "{templateTitle}" forms</p>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
                        {forms.length !== 0 ? forms.map((form) => (
                            <Card key={form.id} className="cursor-pointer"
                                  onClick={() => openModal(form)}
                            >
                                <CardHeader>
                                    <CardTitle>Author: {form.user.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>Title: {templateTitle}</CardDescription>
                                    <CardDescription>Category: {templateCategory}</CardDescription>
                                </CardContent>
                            </Card>
                        )) :
                            <span>There are no forms</span>
                        }

                        {isModalOpen && selectedForm && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/2">
                                    <Card key={selectedForm.id} className=""
                                    >
                                        <CardHeader>
                                            <CardTitle>Form Details</CardTitle>
                                            <CardDescription>Author: {selectedForm.user.name}</CardDescription>
                                            <CardDescription>Title: {templateTitle}</CardDescription>
                                            <CardDescription>Category: {templateCategory}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            {selectedForm.Answers.map((answer) => (
                                                    <div key={answer.id} className='mt-2'>
                                                        <CardDescription>Question: {answer.Question.question_text}</CardDescription>
                                                        <CardDescription>Answer: {answer.answerText}</CardDescription>
                                                    </div>
                                            ))}
                                        </CardContent>
                                    </Card>

                                    <Button className='mt-2' onClick={closeModal}>
                                        Close
                                    </Button>
                                </div>
                            </div>
                        )}

                    </div>

                </main>
            </div>
        </SidebarProvider>
    );
}
