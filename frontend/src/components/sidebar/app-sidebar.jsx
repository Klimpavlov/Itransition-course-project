'use client';

import { Home, Search, Settings2, User, LogOut } from "lucide-react";
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
} from "@/components/ui/sidebar";
import Cookie from "js-cookie";
import { useTranslations } from "next-intl";

export function AppSidebar() {
    const t = useTranslations("Sidebar");

    const handleLogout = () => {
        Cookie.remove("token");
        window.location.href = "/login";
    };

    const items = [
        {
            title: t("Home"),
            url: "/",
            icon: Home,
        },
        {
            title: t("MyProfile"),
            url: "/myProfile",
            icon: User,
        },
        {
            title: t("AdminPage"),
            url: "/admin",
            icon: Settings2,
        },
        {
            title: t("Search"),
            url: "#",
            icon: Search,
        },
        {
            title: t("Logout"),
            action: handleLogout,
            icon: LogOut
        }
    ];

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
                                        {item.action ? (
                                            <button onClick={item.action} className="flex items-center gap-2">
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </button>
                                        ) : (
                                            <Link href={item.url} className="flex items-center gap-2">
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
