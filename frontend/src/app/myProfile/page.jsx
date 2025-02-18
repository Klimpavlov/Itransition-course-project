'use client';

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/sidebar/app-sidebar";

export default function MyProfile() {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="w-full">
                <main className="">
                    <SidebarTrigger/>
                    <p className='p-4 text-2xl font-bold'>My templates</p>
                </main>
            </div>
        </SidebarProvider>
    );
}