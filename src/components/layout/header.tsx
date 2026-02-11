"use client";

import { usePathname, Link, useRouter } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";
import Switch from "../ui/Switch";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('Header');
    const locale = useLocale();

    const navItems = [
        { name: t("home"), path: "/" },
        { name: t("about"), path: "/about" },
        { name: t("projects"), path: "/projects" },
        { name: t("skills"), path: "/skills" },
        { name: t("contact"), path: "/contact" },
    ];

    const toggleLocale = () => {
        const nextLocale = locale === 'fr' ? 'en' : 'fr';
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-30 py-4 backdrop-blur-md ${pathname === "/" ? "bg-linear-to-r from-[#07233b] to-[#050d17]" : "bg-[#050d17]"} transition-colors`}>
            <Link href="/" className="text-4xl font-bold tracking-tighter flex items-center gap-2">
                <img src="/logo.png" alt="logo" className="w-16 h-auto" />
            </Link>

            <nav className="hidden md:flex items-center gap-6 font-semibold uppercase">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <div className="relative group" key={item.path}>
                            <Link
                                href={item.path}
                                className={`relative text-sm font-medium transition-colors`}
                            >
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-5.25 left-0 right-0 h-px bg-primary"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                            <div className={`absolute rounded h-0.5 w-0 group-hover:w-full duration-500 -bottom-2 left-0 right-0 bg-white ${isActive ? "w-full" : "w-0"}`}></div>
                        </div>
                    );
                })}
                <button onClick={toggleLocale} className="ml-4 text-sm font-bold border border-white/20 rounded px-2 py-1 hover:bg-white/10 transition cursor-pointer">
                    {locale.toUpperCase()}
                </button>
            </nav>
            <div className="md:hidden flex items-center gap-4">
                <button onClick={toggleLocale} className="text-sm font-bold border border-white/20 rounded px-2 py-1 hover:bg-white/10 transition cursor-pointer">
                    {locale.toUpperCase()}
                </button>
                <Switch checked={isOpen} onChange={(checked) => { setIsOpen(checked) }} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut",
                        }}
                        className="uppercase h-content absolute top-full left-0 right-0 px-4 w-full border-t border-[#363c44] md:hidden flex flex-col justify-center items-start text-start font-semibold bg-linear-to-r from-[#050d17] to-[#040c16]"
                    >
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;

                            return (
                                <div
                                    className="relative group py-2 mb-4"
                                    key={item.path}
                                >
                                    <Link
                                        href={item.path}
                                        className="relative text-sm font-medium transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}

                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute -bottom-5.25 left-0 right-0 h-px bg-primary"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 380,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                    </Link>
                                    <div className={`absolute rounded h-0.5 w-0 group-hover:w-full duration-500 -bottom-2 left-0 right-0 bg-white ${isActive ? "w-full" : "w-0"}`}></div>
                                </div>
                            );
                        })}
                    </motion.nav>
                )}
            </AnimatePresence>

        </header >
    );
}
