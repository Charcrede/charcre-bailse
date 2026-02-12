"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";

export default function AboutPage() {
    const divRef = useRef<HTMLDivElement>(null);

    const downloadImage = async (ref: { current: any; }) => {
    if (!ref.current) return;

    const node = ref.current;

    try {
        const dataUrl = await toPng(node, {
            quality: 1,
            pixelRatio: 2,
        });

        const link = document.createElement("a");
        link.download = "portfolio-image.png";
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error("Erreur lors du téléchargement", err);
    }
    };

    return (
        <div className="min-w-full relative container py-20 min-h-screen bg-linear-to-r from-[#07233b] to-[#050d17]">

            {/* DIV À TÉLÉCHARGER */}
            <div
                ref={divRef}
                className="relative items-center justify-center  rounded-full flex flex-col gap-3"
            >
                <img src="/home-bg.png" alt="" className="w-1/3" />
                <img src="/home-banner.png" alt="Portfolio" className="absolute w-1/3 " />
            </div>

            {/* BOUTON */}
            <div className="flex justify-center mt-50">
                <button
                    onClick={()=>{downloadImage(divRef)}}
                    className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
                >
                    Télécharger l’image
                </button>
            </div>
        </div>
    );
}
