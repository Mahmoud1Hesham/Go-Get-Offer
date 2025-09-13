'use client'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import joinCard from '../../../../public/assets/join-us-card/join-us-card.svg'
import { Button } from '@/Components/chadcn-ui/button';
import TextPressure from '@/Components/common/text-pressure/text-pressure-effect';

const JoinUsCard = () => {
    const { t, i18n } = useTranslation(['joinUs']);
    const searchParams = useSearchParams();
    const lang = searchParams.get('lang') || i18n.language || 'en';

    return (
        <section id='join-us' className="relative">
            <Image src={joinCard} width={2000} height={300} alt="join us card" />
            <div className="content absolute top-1/2 right-1/2 flex flex-col gap-1 md:gap-3 items-center justify-center transform translate-x-1/2 -translate-y-1/2 w-[90%]">

                {lang === 'ar' ? (
                    <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl text-white font-hacen flex flex-wrap justify-center gap-3 leading-snug text-center">
                        {t('title').split(' ').map((word, i) => (
                            <span
                                key={i}
                                className="inline-block hover:scale-125 transition-all duration-500"
                            >
                                {word}
                            </span>
                        ))}
                    </h1>
                ) : (
                    <div style={{ position: 'relative' }} className="w-full flex justify-center">
                        <div className="max-w-[80%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[60%]">
                            <TextPressure
                                text={t('title')}
                                className="font-roboto text-center text-white md:text-2xl! lg:text-5xl!"
                                textColor="#ffffff"
                                stroke={true}
                                strokeColor="#000000"
                                strokeWidth={2}
                                alpha={false}
                                flex={true}
                                weight={true}
                                width={true}   // سيبه شغال
                                italic={true}
                                minFontSize={12}
                                fontFamily="Compressa VF"
                            />
                        </div>
                    </div>
                )}

                <Button
                    className="
    text-[9px] sm:text-xs md:text-sm lg:text-base
    w-[80px] h-[22px] sm:w-[100px] sm:h-[32px] md:w-auto md:h-auto
    text-white bg-go-primary-o hover:bg-go-primary-e
  "
                >
                    {t('button')}
                </Button>

            </div>
        </section>
    )
}

export default JoinUsCard
