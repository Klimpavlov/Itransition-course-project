'use client';

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/sidebar/app-sidebar";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export default function CreateTemplatePage() {

    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="w-full">
                <main className="">
                    <SidebarTrigger/>
                    <p className='p-4 text-2xl font-bold'>Create template</p>
                    <div className="p-4">
                        <Card className="w-1/2 cursor-pointer"

                        >
                            <CardHeader>
                                <CardTitle></CardTitle>
                                <CardDescription>Title: </CardDescription>
                                <Input className='w-full' placeholder="Enter title"></Input>
                                <CardDescription>Category: </CardDescription>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select category"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Categories</SelectLabel>
                                            <SelectItem value="Education">Education</SelectItem>
                                            <SelectItem value="Quiz">Quiz</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <CardDescription>Is public: </CardDescription>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select is template public"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>State</SelectLabel>
                                            <SelectItem value={true}>True</SelectItem>
                                            <SelectItem value={false}>False</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </CardHeader>

                            <CardContent>
                                <p>Image will be there</p>
                            </CardContent>

                            <CardFooter>

                            </CardFooter>
                        </Card>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}
