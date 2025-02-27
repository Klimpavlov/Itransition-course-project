'use client';

import {AppSidebar} from "@/components/sidebar/app-sidebar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {ModeToggle} from "@/components/theme/toggle-theme/modeToggle";
import Cookie from "js-cookie";
import getUserInfo from "@/app/[locale]/api/users/getUserInfo";
import {useEffect, useState} from "react";
import getAllUsers from "@/app/[locale]/api/users/getAllUsers";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import getTemplateById from "@/app/[locale]/api/templates/getTemplateById";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import removeAdmin from "@/app/[locale]/api/users/removeAdmin";
import {useTranslations} from "next-intl";
import {LanguageSwitcher} from "@/components/switchLanguage/language-switcher";

export default function Page() {
    const token = Cookie.get("token");
    const router = useRouter();

    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState([]);
    const [users, setUsers] = useState([]);
    const getUser = async () => {
        const response = await getUserInfo(token);
        console.log(response.data);
        setUserId(response.data.id);
        setIsAdmin(response.data.isAdmin);
    }

    const getUsers = async () => {
        const response = await getAllUsers(token);
        console.log(response.data);
        setUsers(response.data)
    }

    useEffect(() => {
        getUser();
        getUsers();
    }, []);


    const handleChooseUser = async (userId) => {
        console.log(userId)
        const response = await getTemplateById(userId, token);
        console.log("Template:", response);
        router.push(`/admin/users/${userId}`);
    };

    const handleDemoteSelf = async () => {
        await removeAdmin(token, userId, getUser);
    }

    const t = useTranslations("AdminPage");

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
                        <p className='p-4 text-2xl font-bold'>{t("Users")}:</p>
                        {isAdmin ?
                            <Button className='m-4' onClick={handleDemoteSelf}>{t("DenyAdmin")}</Button>
                            : <></>
                        }

                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
                        {isAdmin ? users.map((user) =>
                            (
                                <Card key={user.id} className="cursor-pointer"
                                      onClick={() => handleChooseUser(user.id)}
                                >
                                    <CardHeader>
                                        <CardTitle>Username: {user.name}</CardTitle>
                                        <CardDescription>Email: {user.email}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>User id: {user.id}</CardDescription>
                                        <CardDescription>Is admin: {user.isAdmin ? 'Yes' : 'No'}</CardDescription>
                                        <CardDescription>Is blocked: {user.isBlocked ? 'Yes' : 'No'}</CardDescription>
                                    </CardContent>
                                    <CardFooter>
                                    </CardFooter>
                                </Card>
                            )
                        ) : t("NotAdmin")}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}