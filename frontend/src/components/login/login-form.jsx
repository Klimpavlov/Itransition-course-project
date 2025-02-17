import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import login from "@/app/api/login/login";
import {useState} from "react";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Link from "next/link";
import {useRouter} from "next/navigation";


export function LoginForm({
                              className,
                              ...props
                          }) {

    const {toast} = useToast();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
             toast({
                title: "Please, fill all fields",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
            return;
        }
        await login(email, password, (error) => {
            toast({
                variant: "destructive",
                title: error,
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }, successRedirect);

    }

    const successRedirect = () => {
        router.push("/")
    }

    return (
        (<div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" required
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {/*<a*/}
                                    {/*  href="#"*/}
                                    {/*  className="ml-auto inline-block text-sm underline-offset-4 hover:underline">*/}
                                    {/*  Forgot your password?*/}
                                    {/*</a>*/}
                                </div>
                                <Input id="password" type="password" required
                                       onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <Button className="w-full" onClick={handleLogin}>
                                Login
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                </CardContent>
            </Card>
        </div>)
    );
}
