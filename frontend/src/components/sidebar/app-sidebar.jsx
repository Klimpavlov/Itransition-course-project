import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import getUserInfo from "@/app/api/users/getUserInfo";
import {useEffect, useState} from "react";
import Cookie from "js-cookie";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "My profile",
        url: "/myProfile",
        icon: Inbox,
    },
    {
        title: "Admin page",
        url: "/admin",
        icon: Settings,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    }
]

export function AppSidebar() {
    // const token = Cookie.get("token");
    //
    // const [isAdmin, setIsAdmin] = useState(false);
    // const getUser = async () => {
    //     const response = await getUserInfo(token);
    //     console.log(response.data);
    //     setIsAdmin(response.data.isAdmin)
    // }
    //
    // useEffect(() => {
    //     getUser();
    // }, []);


    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            {/*{isAdmin === true ?*/}
                            {/*    <SidebarMenuItem key="admin">*/}
                            {/*        <SidebarMenuButton asChild>*/}
                            {/*            <Link href="/admin">*/}
                            {/*                <Home />*/}
                            {/*                <span>Admin page</span>*/}
                            {/*            </Link>*/}
                            {/*        </SidebarMenuButton>*/}
                            {/*    </SidebarMenuItem> : ""}*/}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
