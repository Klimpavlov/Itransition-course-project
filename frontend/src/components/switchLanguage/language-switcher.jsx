"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const toggleLanguage = () => {
        const newLocale = currentLocale === "en" ? "ru" : "en";
        router.push(`/${newLocale}${pathname.replace(/^\/(en|ru)/, "")}`);
    };

    return (
        <Button onClick={toggleLanguage} className="mr-2">
            {currentLocale === "en" ? "ru" : "en"}
        </Button>
    );
}
