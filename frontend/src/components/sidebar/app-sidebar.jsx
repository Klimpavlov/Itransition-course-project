import {  Home, Search, Settings2, User, LogOut } from "lucide-react";
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

const handleLogout = () => {
    Cookie.remove("token");
    window.location.href = "/login";
};

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
        icon: User,
    },
    {
        title: "Admin page",
        url: "/admin",
        icon: Settings2,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Logout",
        action: handleLogout,
        icon: LogOut
    }
]

export function AppSidebar() {
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
                                            <Link href={item.url}>
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
    )
}
