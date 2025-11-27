'use client';

import React from 'react';
import { GeneratedPageContent, ProjectProfile } from '@/types';
import { ArrowRight, Check, Github, Twitter, Linkedin } from 'lucide-react';

export function ModernTemplate({ content, profile }: { content: GeneratedPageContent; profile: ProjectProfile }) {
    const heroImage = profile.images.hero || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop";

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-white selection:bg-indigo-500 selection:text-white">
            {/* Navbar */}
            <nav className="fixed w-full z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        {profile.company.name}
                    </span>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                        {content.hero.cta}
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        Nouveau : {profile.seo.mainKeyword}
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                        {content.hero.headline}
                    </h1>

                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {content.hero.subheadline}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group">
                            Commencer maintenant
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Hero Image Preview */}
                    <div className="mt-20 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/10">
                        <img src={heroImage} alt="Dashboard" className="w-full aspect-[16/9] object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    </div>
                </div>
            </header>

            {/* Features Grid */}
            <section className="py-24 bg-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {content.sections.map((section, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors group">
                                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Check className="w-6 h-6 text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-white">{section.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {section.content.substring(0, 150)}...
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 border-t border-white/10">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-center">Questions & Réponses</h2>
                    <div className="space-y-4">
                        {content.faq.map((item, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-white/5 border border-white/10">
                                <h3 className="font-semibold text-lg mb-2 text-indigo-200">{item.question}</h3>
                                <p className="text-slate-400">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/10 bg-slate-950">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-slate-500 text-sm">
                        © 2024 {profile.company.name}. Powered by Robin des Bois.
                    </div>
                    <div className="flex gap-6">
                        <Github className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer" />
                        <Twitter className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer" />
                        <Linkedin className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer" />
                    </div>
                </div>
            </footer>
        </div>
    );
}
