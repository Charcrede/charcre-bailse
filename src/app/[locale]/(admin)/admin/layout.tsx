'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { FiLogOut, FiGrid, FiTool } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { locale } = useParams<{ locale: 'fr' | 'en' }>();

  useEffect(() => {
    const unsubscribe = authService.onUserChanged((user) => {
      if (!user) router.push('/' + locale + '/login');
      else setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-r from-[#07233b] to-[#050d17]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-[#0788ff] border-white/20"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen text-white bg-linear-to-r from-[#07233b] to-[#050d17]">
      
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-20 w-64 p-6 transition-transform duration-300
        backdrop-blur-xl bg-white/5 border-r border-white/10
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <h2 className="text-2xl font-bold mb-10 tracking-tight">
          Admin<span className="text-[#0788ff]">Panel</span>
        </h2>

        <nav className="space-y-3">
          <a
            href="/fr/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl
            text-white/80 hover:text-white
            hover:bg-white/10 transition-all"
          >
            <FiGrid size={18} />
            Projects
          </a>

          <a
            href="/fr/admin/skills"
            className="flex items-center gap-3 px-4 py-3 rounded-xl
            text-white/80 hover:text-white
            hover:bg-white/10 transition-all"
          >
            <FiTool size={18} />
            Skills
          </a>

          <button
            onClick={() => authService.logout()}
            className="flex items-center gap-3 px-4 py-3 mt-8 w-full text-left rounded-xl
            text-red-400 hover:text-red-300
            hover:bg-red-500/10 transition-all"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 md:hidden z-30
        p-2 rounded-lg backdrop-blur-md bg-white/10
        border border-white/10"
      >
        <GiHamburgerMenu size={22} />
      </button>

      {/* Main Content */}
      <main className="flex-1 p-8 md:ml- text-white">
        {children}
      </main>
    </div>
  );
}
