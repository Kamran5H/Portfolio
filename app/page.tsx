'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Research from '@/components/sections/Research';
import Trajectory from '@/components/sections/Trajectory';
import Credentials from '@/components/sections/Credentials';
import Software from '@/components/sections/Software';
import LabCalculators from '@/components/sections/LabCalculators';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import DocModal, { DocItem } from '@/components/modals/DocModal';
import CVModal from '@/components/modals/CVModal';
import ResearchModal from '@/components/modals/ResearchModal';
import Toast, { ToastMessage } from '@/components/ui/Toast';
import SleepManager from '@/components/ui/SleepManager';

export default function Home() {
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleOpenDoc = (title: string, src: string, caption: string) => {
    setSelectedDoc({ title, src, caption });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-main)] antialiased selection:bg-[var(--accent-blue)] selection:text-white">
      {/* Sticky Global Navigation */}
      <Navbar onOpenCV={() => setIsCVOpen(true)} />

      {/* Main Sections Wrapper */}
      <main className="flex-1 w-full max-w-[1320px] mx-auto px-6 pt-[70px] space-y-12">
        <Hero />
        <Research onOpenResearchModal={(key) => setSelectedResearch(key)} />
        <Trajectory onOpenDoc={handleOpenDoc} />
        <Credentials onOpenDoc={handleOpenDoc} />
        <Software />
        <LabCalculators onShowToast={(msg) => addToast(msg, 'info')} />
        <Contact onToast={(msg, type) => addToast(msg, type)} />
      </main>

      {/* Global Academic Footer */}
      <Footer onOpenCV={() => setIsCVOpen(true)} />

      {/* Interactive Modals */}
      <DocModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
      <ResearchModal
        paperId={selectedResearch}
        onClose={() => setSelectedResearch(null)}
        onToast={(msg, type) => addToast(msg, type)}
      />

      {/* Lightweight Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* 3-Minute Inactivity Sleep & Scale-to-Zero Standby Manager */}
      <SleepManager
        timeoutMs={180000}
        onToast={(msg, type) => addToast(msg, type)}
      />
    </div>
  );
}
