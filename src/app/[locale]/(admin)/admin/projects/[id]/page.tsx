'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { projectService } from '@/services/projectService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { uploadImage } from '@/actions/upload-image';
import { Project } from '@/types';

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Partial<Project>>({
        title: '',
        slug: '',
        shortDescription: '',
        problem: '',
        solution: '',
        stack: [],
        images: [],
        status: 'wip',
    });
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

    useEffect(() => {
        loadProject();
    }, [id]);

    const loadProject = async () => {
        try {
            const project = await projectService.getById(id);
            if (project) {
                setFormData(project);
            } else {
                alert('Project not found');
                router.push('/admin');
            }
        } catch (error) {
            console.error("Error loading project", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            let coverImageUrl = formData.coverImage;
            if (coverImageFile) {
                const data = new FormData();
                data.set('file', coverImageFile);
                const result = await uploadImage(data);
                coverImageUrl = result.url;
            }

            await projectService.update(id, {
                ...formData,
                coverImage: coverImageUrl,
                stack: Array.isArray(formData.stack) ? formData.stack : [], // Ensure array
            });

            router.push('/admin');
        } catch (error) {
            console.error(error);
            alert('Failed to update project');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Slug</label>
                            <Input
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Short Description</label>
                            <Input
                                value={formData.shortDescription}
                                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Problem</label>
                                <Textarea
                                    value={formData.problem}
                                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Solution</label>
                                <Textarea
                                    value={formData.solution}
                                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Stack (comma separated)</label>
                            <Input
                                value={formData.stack?.join(', ')}
                                onChange={(e) => setFormData({ ...formData, stack: e.target.value.split(',').map(s => s.trim()) })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Cover Image</label>
                            {formData.coverImage && (
                                <div className="mb-2">
                                    <img src={formData.coverImage} alt="Cover" className="h-20 w-auto rounded border" />
                                </div>
                            )}
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                            >
                                <option value="wip">WIP</option>
                                <option value="finished">Finished</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit" disabled={saving}>
                                {saving ? 'Saving...' : 'Update Project'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
