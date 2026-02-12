"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Trans } from 'react-i18next';

export default function AboutPage() {
    const t = useTranslations('About');
    return (
        <div className="min-w-full relative container py-20 min-h-screen bg-linear-to-r from-[#07233b] to-[#050d17]">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col md:flex-row px-2 md:px-20 lg:px-40 gap-8"
            >
                <div className="bg-white/10 border-2 border-white/50 rounded-2xl w-full md:w-1/2 overflow-hidden z-10">
                    <img src="/about-banner.png" alt="" className="z-10 w-full md:w-full" />
                </div>
                <div className="max-w-4xl mx-auto w-full md:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-start gap-4"
                    >
                        <p className="bg-[#0787ff33] py-1 px-2 w-fit rounded tracking-[4px] uppercase ">{t('title')}</p>
                        <h1 className="text-2xl lg:text-4xl font-semibold mb-4">
                            <p className="uppercase">
                                {t.rich('subtitle', {
                                    highlight: (chunks) => <span className="text-[#0788ff] font-bold">{chunks}</span>,
                                })}
                            </p>

                        </h1>
                    </motion.div>
                    <section className="">
                        <h2 className="lg:text-3xl text-xl font-bold mb-2">{t('journey_title')}</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4  lg:text-xl text-sm">
                            {t('journey_text')}
                        </p>
                    </section>

                    <section className="">
                        <h2 className="lg:text-3xl text-xl font-bold mb-2">{t('vision_title')}</h2>
                        <p className="text-muted-foreground leading-relaxed lg:text-xl text-sm">
                            {t('vision_text')}
                        </p>
                    </section>
                </div>
            </motion.div >
            <img src="/effect-2.png" alt="" className="absolute top-50 right-0" />
            <img src="/effect-1.png" alt="" className="absolute bottom-150 md:-bottom-2 left-5" />
        </div >
    );
}
