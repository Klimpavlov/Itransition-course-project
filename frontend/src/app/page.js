'use client';

import {AppSidebar} from "@/components/sidebar/app-sidebar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import getUserInfo from "@/app/api/users/getUserInfo";
import {useEffect} from "react";

export default function Home() {
    const token = localStorage.getItem("token");
    const getUser = async () => {
        await getUserInfo(token);
    }

    useEffect(() => {
        getUser();
    }, [])

  return (
      <SidebarProvider>
          <AppSidebar/>
          <div className="">
              <main className="">
                  <SidebarTrigger/>
                  ллл
              </main>
          </div>
      </SidebarProvider>
  );
}
