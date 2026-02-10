"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { projectService } from "@/services/projectService";
import { Project } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import DigitalAppHero from "@/components/DigitalAppsHero";
import Loader from "@/components/project_loader";
import ImageShower from "@/components/ImageShower";
import ProjectDetails from "@/components/ProjectDetails";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [projectToShow, setProjectToShow] = useState<Project | null>(null);
    const [detailsToShow, setDetailsToShow] = useState<Project | null>(null);
    const [active, setActive] = useState(0);
    const [pages, setPages] = useState(1);
    const t = useTranslations('Projects');

    useEffect(() => {
        (async () => {
            const data = await projectService.getAll();
            setProjects(data);
            setPages(Math.ceil(data.length / 3));
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col gap-10 items-center justify-center w-full min-h-screen bg-[#07233b]">
                <Loader />
                <p className="text-white text-lg">{t('loading')}</p>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden w-full min-h-[80vh]  bg-linear-to-r from-[#07233b] to-[#050d17] pt-20 px-4 md:px-30">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-start gap-4"
            >
                <p className="bg-[#0787ff33] py-1 px-2 w-fit rounded tracking-[4px] uppercase ">{t('title')}</p>
                <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                    <p className="uppercase">
                        {t('subtitle')}
                    </p>

                </h1>
            </motion.div>



            <Swiper
                slidesPerView={1} // nombre de slides visibles
                spaceBetween={16} // espace entre slides
                pagination={{ clickable: true }} // pagination cliquable
                modules={[Pagination, Navigation]}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {projects.map((project) => (
                    <SwiperSlide key={project.id}>
                        <DigitalAppHero
                            app={project}
                            showImages={() => setProjectToShow(project)}
                            showDetails={() => setDetailsToShow(project)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {projectToShow && (
                <ImageShower app={projectToShow} closeDetails={() => setProjectToShow(null)} />
            )}

            {detailsToShow && (
                <ProjectDetails app={detailsToShow} closeDetails={() => setDetailsToShow(null)} />
            )}
            <img src="/effect-3.png" alt="" className="absolute bottom-150 md:-bottom-2 left-5" />
            <img src="/effect-4.png" alt="" className="absolute top-0 right-0" />
        </div>
    );
}
