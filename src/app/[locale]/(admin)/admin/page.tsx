'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { projectService } from '@/services/projectService';
import { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await projectService.getAll();
            setProjects(data);
        } catch (error) {
            console.error("Failed to load projects", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            await projectService.delete(id);
            loadProjects();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg text-gray-500 dark:text-gray-400 animate-pulse">Loading projects...</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8 text-white ">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-4xl font-extrabold text-gray-100">Mes Projets</h1>
                <Link href="/fr/admin/projects/new">
                    <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg transition-all transform hover:scale-105">
                        <Plus className="h-5 w-5" /> Nouveau projet
                    </Button>
                </Link>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <Card
                        key={project.id}
                        className="
                group relative overflow-hidden rounded-2xl
                border border-gray-200/70 dark:border-gray-700/60
                bg-white dark:bg-gray-900
                shadow-md hover:shadow-2xl
                transition-all duration-500
                hover:-translate-y-1
            "
                    >
                        {/* Gradient glow */}
                        <div className="
                absolute inset-0 opacity-0 group-hover:opacity-100
                transition-opacity duration-500
                bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10
                pointer-events-none
            " />

                        {/* Header */}
                        <CardHeader className="relative z-10 px-5 py-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    {project.title}
                                </CardTitle>

                                <span className="
                        text-xs px-2 py-1 rounded-full
                        bg-blue-100 text-blue-700
                        dark:bg-blue-500/20 dark:text-blue-300
                    ">
                                    Project
                                </span>
                            </div>
                        </CardHeader>

                        {/* Content */}
                        <CardContent className="relative z-10 px-5 pb-5 flex flex-col h-full">
                            <p className="
                    text-sm leading-relaxed
                    text-gray-600 dark:text-gray-400
                    mb-6 line-clamp-3
                ">
                                {project.shortDescription.fr}
                            </p>

                            {/* Actions */}
                            <div className="
                    mt-auto flex gap-2 opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-300
                ">
                                <Link href={`/fr/admin/projects/${project.id}`} className="flex-1">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="
                                w-full flex items-center justify-center gap-2
                                hover:bg-blue-50 hover:text-blue-600
                                dark:hover:bg-blue-500/10
                                transition-all
                            "
                                    >
                                        <Edit className="h-4 w-4" />
                                        Éditer
                                    </Button>
                                </Link>

                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => project.id && handleDelete(project.id)}
                                    className="
                            flex-1 flex items-center justify-center gap-2
                            transition-all hover:scale-[1.02]
                        "
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Supprimer
                                </Button>
                            </div>
                        </CardContent>

                        {/* Border highlight */}
                        <div className="
                absolute inset-0 rounded-2xl
                ring-1 ring-transparent
                group-hover:ring-blue-500/30
                transition
                pointer-events-none
            " />
                    </Card>
                ))}
            </div>

        </div>
    );
}
