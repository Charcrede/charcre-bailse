"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { projectService } from "@/services/projectService";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectDetailPage() {
    const { slug } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (typeof slug === "string") {
                // Try to fetch by slug, if not found (or if slug looks like ID), try ID?
                // Service has getBySlug.
                let data = await projectService.getBySlug(slug);
                if (!data) {
                    // Fallback to ID if slug not found (just in case url used ID)
                    data = await projectService.getById(slug);
                }
                setProject(data);
            }
            setLoading(false);
        }
        load();
    }, [slug]);

    if (loading) return <div className="p-20 text-center">Loading...</div>;
    if (!project) return <div className="p-20 text-center">Project not found</div>;

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                {project.coverImage && (
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        src={project.coverImage}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />

                <div className="relative container mx-auto px-6 h-full flex flex-col justify-end pb-12">
                    <Link href="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux projets
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-4"
                    >
                        {project.title}
                    </motion.h1>
                    <div className="flex flex-wrap gap-4 items-center">
                        {project.status === 'wip' && (
                            <Badge variant="secondary" className="text-yellow-500 bg-yellow-500/10 border-yellow-500/20">Works in Progress</Badge>
                        )}
                        <div className="flex gap-2">
                            {project.stack?.map(tech => (
                                <Badge key={tech} variant="outline" className="bg-background/50 backdrop-blur">{tech}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold mb-4">Le Problème</h2>
                        <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground whitespace-pre-wrap">
                            {project.problem}
                        </div>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold mb-4">La Solution</h2>
                        <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground whitespace-pre-wrap">
                            {project.solution}
                        </div>
                    </motion.section>

                    {/* Gallery would go here */}
                </div>

                <div className="space-y-8">
                    <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-24">
                        <h3 className="font-semibold mb-4">Liens</h3>
                        <div className="flex flex-col gap-3">
                            {project.demoUrl ? (
                                <Button className="w-full" asChild>
                                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="mr-2 h-4 w-4" /> Voir le site
                                    </a>
                                </Button>
                            ) : (
                                <Button disabled variant="secondary" className="w-full opacity-50">Demo non disponible</Button>
                            )}

                            {project.githubUrl && (
                                <Button variant="outline" className="w-full" asChild>
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 h-4 w-4" /> Code Source
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
