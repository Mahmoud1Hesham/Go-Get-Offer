'use client'

import { Badge } from '@/Components/chadcn-ui/badge';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import highlightByWords from '@/Utils/helpers/wordHighlighter';

import bgDesktopo from '../../../../public/assets/bg-web-o.svg';
import bgDesktopg from '../../../../public/assets/bg-web-g.svg';
import bgtabo from '../../../../public/assets/bg-tab-o.svg';
import bgtabg from '../../../../public/assets/bg-tab-g.svg';
import bgmobo from '../../../../public/assets/bg-mobile-o.svg';
import bgmobg from '../../../../public/assets/bg-mobile-g.svg';

import { PiTimer, PiPackage, PiChartLineUp, PiTruck } from "react-icons/pi";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { RiScales3Line } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { IoCartOutline } from "react-icons/io5";

export const PERSON_TYPES = {
    SUPPLIER: {
        name: 'Supplier',
        icons: [PiTimer, PiPackage, TbShoppingCartDiscount, PiChartLineUp]
    },
    CLIENT: {
        name: 'Business Client',
        icons: [RiScales3Line, IoCartOutline, PiTruck, GrMoney]
    },
};

const Features = ({ personType }) => {
    const { t, i18n } = useTranslation(['features']);
    const searchParams = useSearchParams();
    const lang = searchParams.get('lang') || i18n.language || 'en';

    // Simplified type checking
    const isSupplier = personType.toLowerCase() === 'supplier';
    const featureIndex = isSupplier ? 0 : 1;
    const icons = isSupplier ? PERSON_TYPES.SUPPLIER.icons : PERSON_TYPES.CLIENT.icons;

    // Safe fetch from i18n
    let featureDataRaw = t(String(featureIndex), { ns: 'features', returnObjects: true }) || {};

    // If the JSON file is an object with numeric keys, convert to array
    if (!Array.isArray(featureDataRaw)) {
        const numericKeys = Object.keys(featureDataRaw).filter(k => /^\d+$/.test(k));
        if (numericKeys.length) {
            featureDataRaw = numericKeys.sort((a, b) => Number(a) - Number(b)).map(k => featureDataRaw[k]);
        }
    }

    // Now featureData is the single object for current type
    const featureData = Array.isArray(featureDataRaw) ? featureDataRaw[0] || {} : featureDataRaw;

    // Normalize content arrays
    const contents = Array.isArray(featureData.content) ? featureData.content : [];
    const subContents = Array.isArray(featureData['sub-content']) ? featureData['sub-content'] : [];

    // Backgrounds
    const bgImages = {
        web: isSupplier ? bgDesktopo : bgDesktopg,
        tab: isSupplier ? bgtabo : bgtabg,
        mobile: isSupplier ? bgmobo : bgmobg,
    };

    return (
        <section id='features'
            className={`relative py-20 ${lang === 'ar' ? 'font-hacen' : ''}`}>
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <picture aria-hidden>
                    <source media="(min-width:1024px)" srcSet={bgImages.web?.src ?? bgImages.web} />
                    <source media="(min-width:768px)" srcSet={bgImages.tab?.src ?? bgImages.tab} />
                    <img
                        src={bgImages.mobile?.src ?? bgImages.mobile}
                        alt=""
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                </picture>
            </div>

            {/* Content */}
            <div className="container mx-auto px-[3rem] lg:px-[0] flex flex-col gap-6 text-white relative">
                {/* Title + Badge */}
                <div className={`flex flex-col text-center items-center lg:items-start ${lang === 'en' ? 'lg:text-left' : 'lg:text-right'} gap-3`}>
                    <h2 className={`text-4xl md:text-5xl font-medium ${isSupplier ? 'text-go-primary-g font-semibold' : ''}`}>
                        {featureData.title && highlightByWords(featureData.title, [
                            { word: "Go-GetOffer", className: `${isSupplier ? 'text-go-primary-e' : 'text-go-primary-o'} lg:text-6xl font-bavistage font-medium` }
                        ])}
                    </h2>

                    <Badge className={`w-fit mt-4 text-2xl md:text-2xl py-3 px-5 rounded-2xl ${isSupplier ? 'bg-go-primary-g hover:bg-go-primary-e' : 'bg-go-primary-o'}`}>
                        {featureData.badge || ''}
                    </Badge>
                </div>

                {/* Subtitle */}
                <p className={`text-2xl max-w-3xl px-4 md:px-0 text-center ${lang === 'en' ? 'lg:text-left' : 'lg:text-right'} font-medium ${isSupplier ? "text-go-primary-g" : ""}`}>
                    {featureData.subtitle || ''}
                </p>

                {/* Grid */}
                <div className="grid grid-cols-1 text-center md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 px-8 lg:px-0 items-stretch">
                    {contents.map((feature, idx) => {
                        const Icon = icons[idx] || PiTimer;
                        const subContent = subContents[idx] || '';
                        return (
                            <article
                                key={idx}
                                className={`rounded-2xl p-8 shadow-lg flex flex-col items-center gap-4 h-full ${isSupplier ? 'bg-white/40 text-go-primary-g' : 'bg-black/40 text-white'}`}
                            >
                                <div className={`flex items-center justify-center w-16 h-16 rounded-full ${isSupplier ? 'bg-go-primary-g text-white' : 'bg-go-primary-o text-white'}`}>
                                    <Icon className="text-3xl" />
                                </div>
                                <h3 className="text-lg md:text-xl font-semibold">{feature}</h3>
                                <p className="text-xl">{subContent}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;