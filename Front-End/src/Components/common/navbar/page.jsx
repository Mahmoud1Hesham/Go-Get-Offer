"use client";

import Link from "next/link";
import React, { useState } from "react";
import LanguageToggle from "./langSelection";
import { useTranslation } from "react-i18next";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../../public/assets/logo-GO.svg";

import { PiUserPlusFill, PiUser, PiX } from "react-icons/pi";
import useAuth from "@/Hooks/useAuth";
import { VscListSelection } from "react-icons/vsc";
import GoToTop from "./navToTopButton";

/* smooth scroll with easeInOutCubic */
const smoothScrollTo = (selector, duration = 1200) => {
    const sel = selector.startsWith("#") ? selector : `#${selector}`;
    const target = document.querySelector(sel);
    if (!target) {
        console.warn("smoothScrollTo: target not found:", sel);
        return;
    }

    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = easeInOutCubic(progress);
        window.scrollTo(0, Math.round(startY + distance * eased));
        if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
};

/* try scrolling multiple times (useful after navigation if content lazy-loads) */
const attemptScrollWithRetry = (selector, tries = 10, delay = 150) => {
    let attempt = 0;
    const sel = selector.startsWith("#") ? selector : `#${selector}`;

    const tick = () => {
        const el = document.querySelector(sel);
        if (el) {
            smoothScrollTo(sel);
            return;
        }
        attempt++;
        if (attempt < tries) setTimeout(tick, delay);
        else console.warn("attemptScrollWithRetry: element not found after retries:", sel);
    };

    tick();
};

const Navbar = () => {
    const { t, i18n } = useTranslation(["navbar"]);
    const searchParams = useSearchParams();
    const pathname = usePathname(); // ex: "/"
    const router = useRouter();
    const lang = searchParams.get("lang") || i18n.language || "en";

    const withLang = (path) => `${path}?lang=${lang}`;

    const [drawerOpen, setDrawerOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    const links = [
        { href: "/", label: t("home") },
        { href: "#about", label: t("about") },
        { href: "#features", label: t("features") },
        { href: "#blog", label: t("blog") },
        { href: "#join-us", label: t("join_us") },
        { href: "/contact-us", label: t("Contact") },
    ];

    /* handler for anchor clicks */
    const handleAnchorClick = async (href) => {
        // normalize selector
        const selector = href.startsWith("#") ? href : `#${href}`;

        // if element exists on current page -> just scroll
        if (typeof document !== "undefined" && document.querySelector(selector)) {
            smoothScrollTo(selector);
            setDrawerOpen(false);
            return;
        }

        // otherwise navigate to homepage (or the path that contains sections)
        // here we assume sections live on "/"
        // push URL like "/?lang=en#about"
        const url = `${withLang("/")}${selector}`;
        try {
            router.push(url);
        } catch (err) {
            // router.push might not return a promise in some versions; ignore
        }

        // After navigation, try to scroll a few times (retry)
        // small delay to let the page render
        setTimeout(() => attemptScrollWithRetry(selector, 20, 150), 200);

        setDrawerOpen(false);
    };

    const renderLink = ({ href, label }) => {
        const isAnchor = href.startsWith("#");
        const isActive = pathname === href; // keep simple; you can enhance logic

        if (isAnchor) {
            return (
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        handleAnchorClick(href);
                    }}
                    className={`font-extrabold ${lang === "ar" ? "font-honor" : "font-figtree"} transition-all duration-150 ${isActive ? "text-go-primary-o" : "text-go-primary-g"
                        }`}
                >
                    {label}
                </button>
            );
        }

        // normal route
        return (
            <Link
                href={withLang(href)}
                className={`font-extrabold ${lang === "ar" ? "font-honor" : "font-figtree"} transition-all duration-150 ${isActive ? "text-go-primary-o" : "text-go-primary-g"
                    }`}
                aria-current={isActive ? "page" : undefined}
            >
                {label}
            </Link>
        );
    };

    return <>
        <nav className="w-full py-2.5 bg-white shadow-md relative z-50">
            <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
                {/* Logo */}
                <div>
                    <Image src={logo} width={72} height={90} alt="App Logo" />
                </div>

                {/* Desktop Links */}
                <ul className="hidden md:flex md:gap-5 lg:gap-10 justify-around md:items-center md:[&>*]:text-sm lg:[&>*]:text-base">
                    {links.map((link) => (
                        <li key={link.href}>{renderLink(link)}</li>
                    ))}
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
                        <VscListSelection className={`text-2xl transition-transform duration-300 ease-in-out ${lang == "en" ? "scale-x-[-1]" : ""}`} />
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
                        <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-md">
                            <PiX size={28} />
                        </button>
                    </div>
                    <ul className="flex flex-col gap-6 mt-6 px-6">
                        {links.map((link) => (
                            <li key={link.href}>{renderLink(link)}</li>
                        ))}
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
        <GoToTop /> 
    </>
};

export default Navbar;
