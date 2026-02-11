"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function FullStackPage() {
  const t = useTranslations('Skills');
  const { locale } = useParams<{ locale: 'fr' | 'en' }>();
  return (
    <div className="relative min-h-screen bg-linear-to-r from-[#07233b] to-[#050d17] text-white">
      <div className="z-20 backdrop-blur-2xl">
        {/* HERO */}
        <section className="container mx-auto px-6 pt-24 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start gap-4"
          >
            <p className="bg-[#0787ff33] py-1 px-2 w-fit rounded tracking-[4px] uppercase ">{t('page_title')}</p>
            <h1 className="text-2xl md:text-3xl font-semibold mb-">
              <p className="uppercase">
                {t('title')}
              </p>
            </h1>
            <p className="text-gray-300 text-sm w-full md:w-1/2">{t('intro')}</p>
          </motion.div>
        </section>

        {/* WHAT I BUILD */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6">
            {t('build_title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BACKEND */}
            <div className="rounded-2xl border border-white/15 p-8 bg-white/5">
              <h3 className="text-xl font-semibold mb-4">{t('backend.title')}</h3>
              <ul className="space-y-3 text-gray-300">
                {t.raw('backend.items').map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* FRONTEND */}
            <div className="rounded-2xl border border-white/15 p-8 bg-white/5">
              <h3 className="text-xl font-semibold mb-4">{t('frontend.title')}</h3>
              <ul className="space-y-3 text-gray-300">
                {t.raw('frontend.items').map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* STACK */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">{t('stack.title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Frontend</h4>
              <p className="text-gray-300">
                {t.raw('stack.frontend').split(' · ').join(', ')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Backend</h4>
              <p className="text-gray-300">
                {t.raw('stack.backend').split(' · ').join(', ')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Workflow</h4>
              <p className="text-gray-300">
                {t.raw('stack.workflow').split(' · ').join(', ')}
              </p>
            </div>
          </div>
        </motion.section>

        {/* HOW I WORK */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-6 pt-12">
          <h2 className="text-2xl font-semibold mb-8">{t('workflow.title')}</h2>
          <p className="text-gray-300 max-w-3xl">
            {t('workflow.text')}
          </p>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-6 py-12">
          <div className="rounded-2xl border border-white/20 p-6 md:p-12 text-center bg-white/5">
            <h3 className="text-2xl font-semibold mb-4">
              {t('contact.title')}
            </h3>
            <p className="text-gray-300 mb-8">{t('contact.lets_talk')}</p>
            <a
              href={"/" + locale + "/contact"}
              className="inline-block bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-lg font-medium"
            >
              {t('contact.join_me')}
            </a>
          </div>
        </motion.section>
      </div>
      {/* <div className="absolute top-0 left-0 bottom-0 right-0 pointer-events-none z-0">
        <img src="/effect-3.png" alt="" className="absolute bottom-150 md:-bottom-2 left-5" />
        <img src="/effect-4.png" alt="" className="absolute top-0 right-0" />
      </div> */}

    </div>
  );
}
