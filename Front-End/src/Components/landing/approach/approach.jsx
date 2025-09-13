"use client";
import Image from "next/image";
import React from "react";
import signup from "../../../../public/assets/signup.png";
import inspection from "../../../../public/assets/inspection.png";
import negotiation from "../../../../public/assets/negotiation.png";
import agreement from "../../../../public/assets/agreement.png";
import highlightByWords from "@/Utils/helpers/wordHighlighter";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";

const items = [
    { image: signup, number: "01" },
    { image: inspection, number: "02" },
    { image: negotiation, number: "03" },
    { image: agreement, number: "04" },
];

const Approach = () => {
    const { t, i18n } = useTranslation(["approach"]);
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || i18n.language || "en";

    return (
        <section id="about"
            className="w-full bg-go-background-e"
            aria-labelledby="approach-title"
        >
            <div className="container mx-auto">
                <div className="py-16 md:py-20 lg:py-12">
                    <h2
                        className={`font-bold text-center text-go-primary-g text-3xl md:text-5xl lg:text-5xl mb-4 ${lang === "ar" ? "font-hacen font-semibold" : ""
                            }`}
                    >
                        {highlightByWords(t("title"), [
                            {
                                word: "Go-GetOffer",
                                className:
                                    "text-go-primary-e font-bavistage tracking-wide font-medium text-4xl md:text-6xl lg:text-6xl",
                            },
                        ])}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={`
                                                item p-6 flex flex-col items-center text-center
                                                ${index % 2 === 0 ? "md:mb-32" : "md:mt-32"}`}>
                                {/* Image */}
                                <div
                                    className="rounded-full bg-go-background-g p-3 flex justify-center items-center
                                                md:h-24 sm:h-14 h-24 
                                                md:w-24 sm:w-14 w-24 mb-4"
                                >
                                    <Image
                                        src={item.image}
                                        width={400}
                                        height={400}
                                        className="w-full"
                                        alt={`Step ${item.number} image`}
                                    />
                                </div>

                                {/* content*/}
                                <div
                                    className={`text-go-primary-g ${lang === "ar" ? "md:text-right" : "md:text-left"
                                        }`}
                                >
                                    <h2 className={`font-bold text-xl mb-2 ${lang == 'ar' ? "font-hacen" : "font-figtree"}`}>
                                        {item.number}.<br />
                                        {t(`steps.${index}.title`)}
                                    </h2>
                                    <p className="font-semibold sm:px-5 md:px-0">
                                        {highlightByWords(t(`steps.${index}.content`), [
                                            {
                                                word: "Go-GetOffer",
                                                className:
                                                    "text-go-primary-e font-bavistage tracking-wide font-medium text-lg",
                                            },
                                        ])}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Approach;
