'use client';

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/sidebar/app-sidebar";
import {ModeToggle} from "@/components/theme/toggle-theme/modeToggle";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import getUserById from "@/app/[locale]/api/users/getUserById";
import deleteUser from "@/app/[locale]/api/users/deleteUser";
import makeAdmin from "@/app/[locale]/api/users/makeAdmin";
import removeAdmin from "@/app/[locale]/api/users/removeAdmin";
import toggleBlockUser from "@/app/[locale]/api/users/toggleBlockUser";
import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import Cookie from "js-cookie";
import {Button} from "@/components/ui/button";

export default function UserByIdPage() {
    const token = Cookie.get("token");
    const {id} = useParams();
    const router = useRouter();

    const [user, setUser] = useState({
        name: '',
        email: '',
        id: '',
        isAdmin: false,
        isBlocked: false
    });

    const fetchUser = async () => {
        const response = await getUserById(id, token);
        console.log(response.data);
        setUser(response.data.user);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleDeleteUser = async () => {
        await deleteUser(token, user.id, successRedirect);
    }

    const handleMakeAdmin = async () => {
        await makeAdmin(token, user.id, fetchUser);
    }

    const handleRemoveAdmin = async () => {
        await removeAdmin(token, user.id, fetchUser);
    }

    const handleToggleBlock = async () => {
        await toggleBlockUser(token, user.id, fetchUser);
    }

    const successRedirect = () => {
        router.push("/admin")
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
                        <p className='p-4 text-2xl font-bold'>User:</p>
                    </div>
                    <div className='flex'>
                        <div className="p-4 w-1/3">
                            <Card key={user.id} className="cursor-pointer">
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
                        </div>
                        <div className='flex flex-col gap-2 p-4'>
                            <Button className='mr-2' onClick={handleDeleteUser}>Delete user</Button>
                            <Button className='mr-2' onClick={handleToggleBlock}>
                                {user.isBlocked ? "Unblock user" : "Block user"}
                            </Button>
                            <Button className='mr-2' onClick={handleMakeAdmin}>Make admin</Button>
                            <Button onClick={handleRemoveAdmin}>Remove admin</Button>
                        </div>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}
