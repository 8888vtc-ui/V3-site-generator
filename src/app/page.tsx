'use client';

import React, { useState } from 'react';
import { SettingsProvider } from '@/context/SettingsContext';
import { GeneratorWidget } from '@/components/GeneratorWidget';
import { ArtisanTemplate } from '@/components/ArtisanTemplate';
import { generateContent } from '@/lib/generator';
import { ProjectProfile, GeneratedPageContent } from '@/types';
import { Loader2 } from 'lucide-react';

export default function Home() {
    return (
        <SettingsProvider>
            <MainContent />
        </SettingsProvider>
    );
}

function MainContent() {
    const [profile, setProfile] = useState<ProjectProfile | null>(null);
    const [content, setContent] = useState<GeneratedPageContent | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (p: ProjectProfile) => {
        setIsGenerating(true);
        setError(null);
        setProfile(p);

        try {
            // 1. Generate Content (Text)
            const generatedContent = await generateContent(p);
            setContent(generatedContent);

            // 2. Save to Database (Fire & Forget)
            import('@/lib/supabase').then(({ saveSite }) => {
                saveSite(p, generatedContent).catch(err => console.error("Failed to save site:", err));
            });

            // 3. In a real app, we would generate images here if BYOK & no upload
            // For now, the Template handles the fallback/display logic

        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : "Une erreur est survenue");
        } finally {
            setIsGenerating(false);
        }
    };

    if (content && profile) {
        return (
            <div className="relative">
                <button
                    onClick={() => { setContent(null); setProfile(null); }}
                    className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-slate-800"
                >
                    Modifier / Recommencer
                </button>
                <ArtisanTemplate content={content} profile={profile} />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-serif font-bold text-slate-900">Robin des Bois</h1>
                    <p className="text-slate-500">Le générateur de site web équitable.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                {isGenerating ? (
                    <div className="bg-white p-12 rounded-2xl shadow-xl text-center space-y-4">
                        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto" />
                        <p className="text-slate-600 font-medium animate-pulse">
                            Construction de votre site artisan...
                        </p>
                        <p className="text-xs text-slate-400">
                            Rédaction des textes • Optimisation SEO • Mise en page
                        </p>
                    </div>
                ) : (
                    <GeneratorWidget onGenerate={handleGenerate} />
                )}

                <div className="text-center text-xs text-slate-400">
                    <p>Open Source & Gratuit pour toujours.</p>
                </div>
            </div>
        </main>
    );
}
