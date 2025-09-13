'use client'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { useTranslation } from 'react-i18next';
import buffet from '../../../../public/assets/blog/buffet2.jpeg'
import cleaning from '../../../../public/assets/blog/hands-holding-cleaning-tools-solutions.jpg'
import office from '../../../../public/assets/blog/desk-supplies-composition-high-angle.jpg'
import packaging from '../../../../public/assets/blog/packaging.svg'
import food from '../../../../public/assets/blog/food.svg'
import medical from '../../../../public/assets/blog/still-life-medical-tools.jpg'
import frame1 from '../../../../public/assets/blog/blog-frame1.svg'
import frame2 from '../../../../public/assets/blog/blog-frame2.svg'
import { PiArrowUpRight } from "react-icons/pi";
import Image from 'next/image';

function Blog() {
  const { t, i18n } = useTranslation(['blogLanding']);
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || i18n.language || 'en';

  const cards = [
    {
      id: 1,
      title: t("items.0.0"),
      subtitle: t("items.0.1"),
      image: buffet.src,
      bgColor: "bg-go-background-gr",
      textColor: "text-go-primary-g",
      titleColor: "text-go-primary-o",
      lang
    },
    {
      id: 2,
      title: t("items.1.0"),
      subtitle: t("items.1.1"),
      image: cleaning.src,
      bgColor: "bg-gray-600",
      textColor: "text-go-blog-p",
      titleColor: "text-go-primary-o",
      lang
    },
    {
      id: 3,
      title: t("items.2.0"),
      subtitle: t("items.2.1"),
      image: food.src,
      bgColor: "bg-yellow-600",
      textColor: "text-go-blog-p",
      titleColor: "text-go-primary-o",
      lang
    },
    {
      id: 4,
      title: t("items.3.0"),
      subtitle: t("items.3.1"),
      image: office.src,
      bgColor: "bg-gray-800",
      textColor: "text-go-blog-p",
      titleColor: "text-go-primary-o",
      lang
    },
    {
      id: 5,
      title: t("items.4.0"),
      subtitle: t("items.4.1"),
      image: packaging.src,
      bgColor: "bg-green-700",
      textColor: "text-go-blog-p",
      titleColor: "text-go-primary-o",
      lang
    },
    {
      id: 6,
      title: t("items.5.0"),
      subtitle: t("items.5.1"),
      image: medical.src,
      bgColor: "bg-blue-600",
      textColor: "text-go-blog-p",
      titleColor: "text-go-primary-o",
      lang
    },
  ];

  return (
    <main>
      <section id='blog' className="py-12 bg-go-background-gr px-4 md:px-0">
        <div className="container mx-auto">
          {/* Header */}
          <header className="mb-5 flex flex-col items-center justify-center lg:block">
            <h1
              className={`text-4xl md:text-[82px] text-center mb-2 lg:mb-0 ${lang == "ar"
                  ? "font-hacen font-medium md:text-right"
                  : "font-lemands font-bold md:text-left"
                } tracking-wider text-go-primary-e`}
            >
              {t("title")}
            </h1>
            <p
              className={`text-lg md:text-2xl text-center ${lang == "ar" ? "lg:text-right" : "lg:text-left"
                } w-7/12 text-go-primary-g font-semibold`}
            >
              {t("subtitle")}
            </p>
          </header>

          {/* Cards Grid */}
          <div
            className="
              grid gap-4 
              grid-cols-4 grid-rows-12
              md:grid-cols-6 md:grid-rows-10
              lg:grid-cols-12 lg:grid-rows-12
            "
          >
            {/* Card 1 */}
            <article
              className="
                col-span-4 row-span-4
                md:col-span-4 md:row-span-7
                lg:col-span-4 lg:row-span-12
              "
            >
              <Card {...cards[0]} isFrameOne={true} />
            </article>

            {/* Card 2 */}
            <article
              className="
                col-span-4 row-span-2 row-start-5
                md:col-span-3 md:row-span-3 md:col-start-1 md:row-start-8
                lg:h-60 lg:col-span-5 lg:row-span-6 lg:col-start-5
              "
            >
              <Card {...cards[1]} isFrameTwo={true} />
            </article>

            {/* Card 3 */}
            <article
              className="
                col-span-2 row-span-2 row-start-7
                md:col-span-3 md:row-span-3 md:col-start-4 md:row-start-8
                lg:h-60 lg:col-span-3 lg:row-span-6 lg:col-start-5 lg:row-start-7
              "
            >
              <Card {...cards[2]} />
            </article>

            {/* Card 4 */}
            <article
              className="
                col-span-2 row-span-2 col-start-3 row-start-7
                md:col-span-2 md:row-span-3 md:col-start-5 md:row-start-1
                lg:h-60 lg:col-span-2 lg:row-span-6 lg:col-start-8 lg:row-start-7
              "
            >
              <Card isSmallest={true} {...cards[3]} />
            </article>

            {/* Card 5 */}
            <article
              className="
                col-span-4 row-span-2 row-start-9
                md:col-span-2 md:row-span-2 md:col-start-5 md:row-start-4
                lg:h-60 lg:col-span-3 lg:row-span-6 lg:col-start-10 lg:row-start-1
              "
            >
              <Card {...cards[4]} />
            </article>

            {/* Card 6 */}
            <article
              className="
                col-span-4 row-span-2 row-start-11
                md:col-span-2 md:row-span-2 md:col-start-5 md:row-start-6
                lg:h-60 lg:col-span-3 lg:row-span-6 lg:col-start-10 lg:row-start-7
              "
            >
              <Card {...cards[5]} />
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}

function Card({
  title,
  subtitle,
  image,
  bgColor,
  textColor,
  titleColor,
  isFrameOne,
  isFrameTwo,
  isSmallest,
  lang,
}) {
  return (
    <article
      className={`${bgColor} relative overflow-hidden h-full w-full p-5 flex flex-col rounded-4xl justify-between group`}
    >
      {/* Background */}
      <Image
        src={typeof image === "string" ? image : image.src}
        alt={title}
        width={500}
        height={500}
        className="absolute inset-0 h-full w-full object-cover [clip-path:inset(0_round_1rem)]"
      />

      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-black/30 transition-all duration-300 
          ${!isFrameOne ? "group-hover:opacity-0" : ""}`}
      />

      {/* Frame 1 */}
      {isFrameOne && (
        <img
          src={frame1.src}
          alt=""
          aria-hidden="true"
          className={`absolute -bottom-1 z-20 object-cover rounded-4xl 
            ${lang === "ar" ? "-right-1 scale-x-[-1]" : "-left-1"}`}
        />
      )}

      {/* Frame 2 */}
      {isFrameTwo && (
        <img
          src={frame2.src}
          alt=""
          aria-hidden="true"
          className={`absolute -top-1 z-20 transition-all duration-500 ease-out
      ${lang === "ar"
              ? "-left-1 scale-x-[-1] group-hover:-translate-x-40 group-hover:-translate-y-40"
              : "-right-1 group-hover:translate-x-40 group-hover:-translate-y-40"
            }`}
        />
      )}

      {isFrameTwo && (
        <div
          aria-hidden="true"
          className={`absolute top-2 rounded-full z-30 w-16 h-16 bg-go-primary-e flex items-center justify-center
      transition-all duration-500 ease-out
      ${lang === "ar"
              ? "left-1 group-hover:-translate-x-40 group-hover:-translate-y-40"
              : "right-1 group-hover:translate-x-40 group-hover:-translate-y-40"
            }`}
        >
          <PiArrowUpRight size={28} className="text-white transition-all duration-500 ease-out" />
        </div>
      )}

      <div
        className={`flex-1 z-30 relative flex flex-col justify-end transition-all duration-300
    ${!isFrameOne ? "group-hover:opacity-0" : ""}`}
      >
        <h2
          className={`${titleColor} text-2xl font-bold ${isSmallest ? "text-[22px] leading-8" : ""
            } mb-2 ${lang === "ar" ? "text-right text-[28px]" : "text-left leading-4"}`}
        >
          {title}
        </h2>
        <p
          className={` leading-4 font-bold 
    ${textColor} text-base
    ${lang === "ar" ? "text-right" : "text-left"}
    ${isFrameOne
              ? lang === "ar"
                ? "pl-52   md:pl-64 lg:pl-32 xl:pl-52 2xl:pl-64 leading-5"
                : "pr-52 md:pr-64 lg:pr-32 xl:pr-52 2xl:pr-64 leading-5"
              : ""}`}
        >
          {subtitle}
        </p>
      </div>

      {!isFrameOne && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all duration-300 group-hover:opacity-100 z-40"
        >
          <div className="w-16 h-16 rounded-full bg-go-primary-e flex items-center justify-center">
            <PiArrowUpRight size={28} className="text-white" />
          </div>
        </div>
      )}
    </article>
  );
}

export default Blog;
