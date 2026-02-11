"use client";

import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function ContactPage() {
  const t = useTranslations('Contact');
  const locale = useLocale(); // fr / en

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSuccess(true);
      form.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Erreur lors de l’envoi du message.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-w-full relative py-0 min-h-screen bg-linear-to-r overflow-hidden from-[#07233b] to-[#050d17]">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row px-2 md:px-30 gap-8 backdrop-blur-2xl"
      >
        <section className="relative mx-auto px-4 py-20 z-20">
          <div className="rounded-2xl  overflow-hidden border border-[#043b6e]">
            {/* HEADER */}
            <div className="bg-[#041c33] border-b border-[#043b6e] grid grid-cols-1 pt-8 bg- lg:grid-cols-12 gap-6 p-6 lg:p-12">
              <div className="lg:col-span-4" />
              <div className="lg:col-span-8">
                <h5 className="text-3xl font-semibold mb-2">
                  {t('title')}
                </h5>
                <p className="text-gray-400">
                  {t('subtitle')}
                </p>
              </div>
            </div>

            {/* CONTENT */}
            <div className="bg-[#07233b] grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-12">
              <div className="lg:col-span-4 order-2 md:order-1 space-y-8 md:mt-24">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-100 uppercase">
                      {t('writeEmail')}
                    </label>
                    <a
                      href="mailto:charcrede@gmail.com"
                      className="text-blue-400 hover:underline"
                    >
                      charcrede@gmail.com
                    </a>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-100 uppercase">
                      {t('phone')}
                    </label>
                    <a
                      href="tel:+229 0140460010"
                      className="text-blue-400 hover:underline"
                    >
                      +229 0140460010
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="bg-[#0762f7] text-white w-10 h-10 rounded-full px-auto flex items-center justify-center border-2 border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-5 h-5 fill-white"><path d="M80 299.3l0 212.7 116 0 0-212.7 86.5 0 18-97.8-104.5 0 0-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2l0-88.7C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4l0 42.1-66 0 0 97.8 66 0z" /></svg>
                  </button>
                  <button className="bg-[#1a1e22] text-white w-10 h-10 rounded-full px-auto flex items-center justify-center border-2 border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-white"><path d="M173.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM252.8 8c-138.7 0-244.8 105.3-244.8 244 0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1 100-33.2 167.8-128.1 167.8-239 0-138.7-112.5-244-251.2-244zM105.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9s4.3 3.3 5.6 2.3c1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
                  </button>
                  <button className="bg-[#007ab5] text-white w-10 h-10 rounded-full px-auto flex items-center justify-center border-2 border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 fill-white"><path d="M100.3 448l-92.9 0 0-299.1 92.9 0 0 299.1zM53.8 108.1C24.1 108.1 0 83.5 0 53.8 0 39.5 5.7 25.9 15.8 15.8s23.8-15.8 38-15.8 27.9 5.7 38 15.8 15.8 23.8 15.8 38c0 29.7-24.1 54.3-53.8 54.3zM447.9 448l-92.7 0 0-145.6c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7l0 148.1-92.8 0 0-299.1 89.1 0 0 40.8 1.3 0c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3l0 164.3-.1 0z" /></svg>
                  </button>
                </div>
              </div>
              {/* FORM */}
              <div className="lg:col-span-8 order-1 md:order-2">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <input type="hidden" name="lang" value={locale} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm">{t('firstName')}</label>
                      <input
                        type="text"
                        placeholder={t('name') + " *"}
                        name="name"
                        className="w-full rounded-lg bg-white/10 border border-white/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm">{t('email')}</label>
                      <input
                        type="email"
                        name="email"
                        placeholder={t('email') + " *"}
                        className="w-full rounded-lg bg-white/10 border border-white/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm">{t('subject')}</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder={t('subject') + " *"}
                      className="w-full rounded-lg bg-white/10 border border-white/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <input type="text" name="company" className="hidden" />
                  <div>
                    <label className="block mb-2 text-sm">{t('message')}</label>
                    <textarea
                      rows={4}
                      placeholder={t('message') + " *"}
                      name="message"
                      className="w-full rounded-lg bg-white/10 border border-white/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-3 font-medium hover:bg-blue-700 transition"
                  >
                    {t('send')}
                  </button>
                </form>
              </div>


            </div>
            {/* IMAGE */}
          </div>
          <div className="hidden lg:block absolute top-[15%] left-[5%]">
            <img
              src="/contact-us.png"
              alt="Contact illustration"
              className="w-2/5"
            />
          </div>
        </section>

      </motion.div >
      <img src="/effect-2.png" alt="" className="absolute top-50 right-0" />
      <img src="/effect-1.png" alt="" className="absolute -bottom-60 md:-bottom-20 left-5" />
    </div >
  );
}
