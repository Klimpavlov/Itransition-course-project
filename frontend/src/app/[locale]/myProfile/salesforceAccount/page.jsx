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
import {Input} from "@/components/ui/input";
import createSalesforceAccount from "@/app/[locale]/api/salesforce/createAccount";
import createSalesforceContact from "@/app/[locale]/api/salesforce/createContact";
import getSalesforceToken from "@/app/[locale]/api/salesforce/getSalesforceToken";
import {toast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast";


export default function MyProfile() {
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
        return /^\+?[0-9]{10,15}$/.test(phone);
    };

    const handleCreateSalesforceAccount = async () => {

        if (!firstName || !lastName || !email || !phone) {
            toast({
                title: "Error",
                description: "Please fill in all the fields.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
            return;
        }

        if (!validateEmail(email)) {
            toast({
                title: "Error",
                description: "Invalid email format.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
            return;
        }

        if (!validatePhone(phone)) {
            toast({
                title: "Error",
                description: "Invalid phone number. Must be 10-15 digits.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
            return;
        }

        const accessToken = await getSalesforceToken();
        console.log(accessToken);
        if (accessToken) {
            const accountResponse = await createSalesforceAccount(firstName, accessToken);
            console.log(accountResponse);

            const contactResponse = await createSalesforceContact(firstName, lastName, email, phone, accountResponse.id, accessToken);
            console.log(contactResponse);
            toast({
                title: "Success",
                description: `Contact created with ID: ${contactResponse.id}`,
            });
        }
    }



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
                    <div className='flex justify-between'>
                        <p className='p-4 text-2xl font-bold'>Add additional information about yourself to Salesforce</p>
                    </div>
                    <div className="flex justify-center p-4">
                        <div className='w-1/3'>
                        <Card className="cursor-pointer"
                        >
                            <CardHeader>
                                <CardTitle></CardTitle>
                                <CardDescription>First name:</CardDescription>
                                <Input
                                    className="w-full"
                                    placeholder="Enter First name"
                                    type='firstName'
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <CardDescription>Last name:</CardDescription>
                                <Input
                                    className="w-full"
                                    type='lastName'
                                    placeholder="Enter Last name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </CardHeader>
                            <CardContent>
                                <CardDescription>Email:</CardDescription>
                                <Input
                                    className="w-full"
                                    placeholder="Enter Email"
                                    onBlur={(e) => {
                                        if (!validateEmail(e.target.value)) {
                                            toast({ title: "Error", description: "Invalid email format." });
                                        }
                                    }}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <CardDescription>Phone:</CardDescription>
                                <Input
                                    className="w-full"
                                    placeholder="Enter Phone"
                                    onBlur={(e) => {
                                        if (!validatePhone(e.target.value)) {
                                            toast({ title: "Error", description: "Invalid phone number." });
                                        }
                                    }}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleCreateSalesforceAccount}>Submit</Button>
                            </CardFooter>
                        </Card>
                        </div>
                    </div>

                </main>
            </div>
        </SidebarProvider>
    );
}
