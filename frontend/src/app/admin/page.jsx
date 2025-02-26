'use client';

import {AppSidebar} from "@/components/sidebar/app-sidebar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {ModeToggle} from "@/components/theme/toggle-theme/modeToggle";
import Cookie from "js-cookie";
import getUserInfo from "@/app/api/users/getUserInfo";
import {useEffect, useState} from "react";
import getAllUsers from "@/app/api/users/getAllUsers";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import getTemplateById from "@/app/api/templates/getTemplateById";
import {useRouter} from "next/navigation";

export default function Page() {
    const token = Cookie.get("token");
    const router = useRouter();

    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState([]);
    const getUser = async () => {
        const response = await getUserInfo(token);
        console.log(response.data);
        setIsAdmin(response.data.isAdmin)
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
                        <p className='p-4 text-2xl font-bold'>Users:</p>

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
                        ) : "You are not admin"}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}