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
import login from "@/app/[locale]/api/login/login";
import {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast"
import register from "@/app/[locale]/api/register/register";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";


export function RegisterForm({
                                 className,
                                 ...props
                             }) {

    const {toast} = useToast();
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast({
                title: "Please, fill all fields",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
            return;
        }
        await register(name, email, password, (error) => {
            toast({
                variant: "destructive",
                title: error,
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }, successRedirect);
    }

    const successRedirect = () => {
        router.push("/login");
    }

    const t = useTranslations("Register");

    return (
        (<div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{t("Register")}</CardTitle>
                    <CardDescription>
                        {t("RegisterText")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">{t("Name")}</Label>
                            <Input id="name" type="name" placeholder={t("placeholderName")} required
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">{t("Email")}</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">{t("Password")}</Label>
                                {/*<a*/}
                                {/*  href="#"*/}
                                {/*  className="ml-auto inline-block text-sm underline-offset-4 hover:underline">*/}
                                {/*  Forgot your password?*/}
                                {/*</a>*/}
                            </div>
                            <Input id="password" type="password" placeholder={t("placeholderPassword")} required
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <Button className="w-full" onClick={handleRegister}>
                            {t("Register")}
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        {t("footerMessage")}
                        <Link href="/login" className="underline underline-offset-4">
                            {t("SignIn")}
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>)
    );
}
