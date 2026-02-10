'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { projectService } from '@/services/projectService';
import { Project } from '@/types';

function InputBase(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl bg-white/5 border border-white/10
      px-4 py-3 text-sm text-white placeholder-white/40
      focus:outline-none focus:ring-2 focus:ring-[#0788ff] transition"
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full min-h-30 rounded-xl bg-white/5 border border-white/10
      px-4 py-3 text-sm text-white placeholder-white/40
      focus:outline-none focus:ring-2 focus:ring-[#0788ff] transition"
    />
  );
}

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function uploadImageClient(file: File) {
    const data = new FormData();
    data.set('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: data,
    });

    if (!res.ok) {
      throw new Error('Upload failed');
    }

    return res.json() as Promise<{ url: string; public_id: string }>;
  }


  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    link: '',
    type: 'web_app',
    shortDescription: { fr: '', en: '' },
    stack: [],
    status: 'wip',
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverImageUrl = '';
      const galleryUrls: string[] = [];

      for (let i = 0; i < galleryImages.length; i++) {
        const file = galleryImages[i];

        const res = await uploadImageClient(file);
        galleryUrls.push(res.url);

        if (i === 0) {
          coverImageUrl = res.url;
        }
      }

      await projectService.create({
        ...(formData as any),
        coverImage: coverImageUrl,
        images: galleryUrls,
        stack: formData.stack || [],
      });

      router.push('/fr/admin');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création du projet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-white mb-10">
        Nouveau <span className="text-[#0788ff]">Projet</span>
      </h1>

      <div className="rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-10">
        <form onSubmit={handleSubmit} className="space-y-8 mx-auto max-w-2xl">

          {/* Core Infos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputBase
              placeholder="Titre du projet"
              value={formData.title}
              onChange={(e) => {setFormData({ ...formData, title: e.target.value }); setFormData((prev) => ({ ...prev, slug: e.target.value.split(' ').join('-').toLowerCase() }))}}
              required
            />
            <InputBase
              placeholder="slug-du-projet"
              value={formData.title?.split(' ').join('-').toLowerCase() || ''}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Textarea
              placeholder="Description (FR)"
              value={formData.shortDescription?.fr || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shortDescription: {
                    ...formData.shortDescription!,
                    fr: e.target.value,
                  },
                })
              }
            />
            <Textarea
              placeholder="Description (EN)"
              value={formData.shortDescription?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shortDescription: {
                    ...formData.shortDescription!,
                    en: e.target.value,
                  },
                })
              }
            />

          </div>


          <InputBase
            placeholder="Lien du projet (ex: https://monprojet.com)"
            value={formData.link || ''}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          />


          {/* Stack */}
          <InputBase
            placeholder="Stack (React, Next.js, Firebase...)"
            value={formData.stack?.join(', ') || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                stack: e.target.value.split(',').map((s) => s.trim()),
              })
            }
          />


          {/* Images */}
          <div className="space-y-4">
            <label className="text-sm text-white/60">Images du projet (max 3)</label>
            <InputBase
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setGalleryImages(Array.from(e.target.files || []).slice(0, 3))
              }
            />
          </div>

          {/* Status */}
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value as any })
            }
            className="w-full rounded-xl bg-white/5 border border-white/10
            px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#0788ff]"
          >
            <option className='text-black' value="wip">Work in progress</option>
            <option className='text-black' value="finished">Finished</option>
          </select>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value as any })
            }
            className="w-full rounded-xl bg-white/5 border border-white/10
            px-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#0788ff]"
          >
            <option className='text-black' value="web_app">Web application</option>
            <option className='text-black' value="mobile_app">Mobile application</option>
            <option className='text-black' value="library">Library</option>
            <option className='text-black' value="tool">Tool</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl font-semibold text-white
            bg-[#0788ff] hover:bg-[#0675db]
            transition-transform hover:scale-[1.02]"
          >
            {loading ? 'Création en cours...' : 'Créer le projet'}
          </button>
        </form>
      </div>
    </div>
  );
}
