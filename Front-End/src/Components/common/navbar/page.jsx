"use client";

import Link from "next/link";
import React, { useState } from "react";
import LogoutButton from "../logout-button/page";
import LanguageToggle from "./langSelection";
import { useTranslation } from "react-i18next";
import { useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../../public/assets/logo-go.svg";

import { PiUserPlusFill, PiUser, PiX,  } from "react-icons/pi";
import useAuth from "@/Hooks/useAuth";
import { VscListSelection } from "react-icons/vsc";

const Navbar = () => {
    const { t, i18n } = useTranslation(["navbar"]);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const lang = searchParams.get("lang") || i18n.language || "en";

    const withLang = (path) => `${path}?lang=${lang}`;

    const [drawerOpen, setDrawerOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated);

    const links = [
        { href: "/", label: t("home") },
        { href: "/about", label: t("about") },
        { href: "/contact-us", label: t("contact") },
        { href: "/blog", label: t("blog") },
        { href: "/join-us", label: t("join_us") },
    ];

    return (
        <nav className="w-full py-2.5 bg-white shadow-md relative z-50">
            <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
                {/* Logo */}
                <div>
                    <Image src={logo} width={72} height={90} alt="App Logo" />
                </div>

                {/* Desktop Links */}
                <ul className="hidden md:flex md:gap-5 lg:gap-10 justify-around md:items-center md:[&>*]:text-sm lg:[&>*]:text-base">
                    {links.map(({ href, label }) => {
                        const fullHref = withLang(href);
                        const isActive = pathname === href;
                        return (
                            <li key={href}>
                                <Link
                                    href={fullHref}
                                    className={`font-extrabold ${lang === "ar" ? "font-honor" : "font-figtree"
                                        } transition-all duration-150 ${isActive ? "text-go-primary-o" : "text-go-primary-g"
                                        }`}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Desktop Actions */}
                <div className="hidden md:flex gap-4 items-center justify-center">
                    <LanguageToggle />
                    <Link
                        className={`px-4 py-3 flex justify-center md:text-sm lg:text-base items-center gap-2 bg-white ${lang === "ar" ? "font-honor" : "font-figtree"
                            } text-go-primary-g font-semibold rounded-xl border shadow`}
                        href={withLang("/login")}
                    >
                        <PiUser className="md:hidden lg:block" size={25} />
                        <span className="md:w-full lg:px-0">{t("login")}</span>
                    </Link>
                    <Link
                        className={`px-4 py-3 flex md:text-sm lg:text-base justify-center ${lang === "ar" ? "px-8 font-honor" : "px-4 font-figtree"
                            } items-center gap-2 text-white font-semibold bg-go-primary-e rounded-xl`}
                        href={withLang("/sign-up")}
                    >
                        <PiUserPlusFill className="md:hidden lg:block md:text-sm lg:text-base" size={20} />
                        <span>{t("sign_up")}</span>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-2 md:hidden">
                    <LanguageToggle />
                    <button
                        className="p-2 rounded-md transition-transform duration-300 ease-in-out"
                        onClick={() => setDrawerOpen(!drawerOpen)}
                    >
                        <VscListSelection
                            className={`text-2xl transition-transform duration-300 ease-in-out ${
                                lang == "en" ? "scale-x-[-1]" : ""
                            }`}
                        />
                    </button>
                </div>
            </div>

            {/* Drawer */}
            <aside
                aria-label="Mobile menu"
                className={`fixed top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 via-white/10 to-white/5 backdrop-blur-md border border-white/20 z-[60] transform transition-transform duration-500 ease-in-out ${drawerOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="container mx-auto">
                    <div className="flex justify-between items-center p-4 border-b">
                        <Image src={logo} width={72} height={90} alt="App Logo" />
                        <button
                            onClick={() => setDrawerOpen(false)}
                            className="p-2 rounded-md"
                        >
                            <PiX size={28} />
                        </button>
                    </div>
                    <ul className="flex flex-col gap-6 mt-6 px-6">
                        {links.map(({ href, label }) => {
                            const fullHref = withLang(href);
                            const isActive = pathname === href;
                            return (
                                <li key={href}>
                                    <Link
                                        href={fullHref}
                                        onClick={() => setDrawerOpen(false)}
                                        className={`font-extrabold ${lang === "ar" ? "font-honor" : "font-figtree"
                                            } text-lg transition-all duration-150 ${isActive ? "text-go-primary-o" : "text-white"
                                            }`}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                        {/* Actions */}
                        <li className="border-t-2 pt-5">
                            <Link
                                onClick={() => setDrawerOpen(false)}
                                href={withLang("/login")}
                                className={`flex justify-center items-center gap-2 px-4 py-3 border rounded-xl text-white bg-go-primary-o font-semibold ${lang === "ar" ? "font-honor" : "font-figtree"
                                    }`}
                            >
                                <PiUser size={20} fontWeight={900} /> {t("login")}
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => setDrawerOpen(false)}
                                href={withLang("/sign-up")}
                                className={`flex justify-center items-center gap-2 px-4 py-3 outline-none rounded-xl text-white bg-go-primary-e font-semibold ${lang === "ar" ? "font-honor" : "font-figtree"
                                    }`}
                            >
                                <PiUserPlusFill size={20} /> {t("sign_up")}
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </nav>

    );
};

export default Navbar;
