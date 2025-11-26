'use client';

import React from 'react';
import { GeneratedPageContent, ProjectProfile } from '@/types';
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export function ArtisanTemplate({ content, profile }: { content: GeneratedPageContent; profile: ProjectProfile }) {
    const heroImage = profile.images.hero || "https://images.unsplash.com/photo-1581094794329-cd11965d1162?q=80&w=2532&auto=format&fit=crop"; // Fallback

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Navigation */}
            <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                    <span className="text-xl font-serif font-bold tracking-tight text-slate-900">
                        {profile.company.name}
                    </span>
                    <a href="#contact" className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
                        {content.hero.cta}
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Hero"
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl lg:text-7xl font-serif font-medium tracking-tight text-slate-900 mb-6 leading-[1.1]">
                        {content.hero.headline}
                    </h1>
                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {content.hero.subheadline}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-emerald-700 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-emerald-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Demander un Devis
                        </button>
                        <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-lg font-medium hover:bg-slate-50 transition-all">
                            En savoir plus
                        </button>
                    </div>
                </div>
            </header>

            {/* Content Sections */}
            <main className="max-w-4xl mx-auto px-6 py-20 space-y-24">
                {content.sections.map((section, idx) => (
                    <section key={idx} className="group">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className={`flex-1 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                                <h2 className="text-3xl font-serif mb-6 text-slate-900">{section.title}</h2>
                                <div className="prose prose-slate prose-lg text-slate-600">
                                    <p>{section.content}</p>
                                </div>
                            </div>
                            {/* Placeholder for section images if we had them */}
                            <div className="flex-1 w-full aspect-video bg-slate-100 rounded-2xl overflow-hidden shadow-sm">
                                <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                                    <CheckCircle2 className="w-12 h-12 opacity-20" />
                                </div>
                            </div>
                        </div>
                    </section>
                ))}

                {/* FAQ */}
                <section className="bg-slate-50 rounded-3xl p-12">
                    <h2 className="text-3xl font-serif mb-10 text-center">Questions Fréquentes</h2>
                    <div className="grid gap-6 max-w-2xl mx-auto">
                        {content.faq.map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                                <p className="text-slate-600">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer id="contact" className="bg-slate-900 text-slate-300 py-20">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
                    <div>
                        <h3 className="text-white text-2xl font-serif mb-6">{profile.company.name}</h3>
                        <p className="max-w-xs text-slate-400">{profile.company.description}</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-white font-medium mb-4">Contact</h4>
                        {profile.contact.email && (
                            <a href={`mailto:${profile.contact.email}`} className="flex items-center gap-3 hover:text-white transition-colors">
                                <Mail className="w-5 h-5" /> {profile.contact.email}
                            </a>
                        )}
                        {profile.contact.address && (
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5" /> {profile.contact.address}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="bg-slate-800 rounded-xl p-6 text-center space-y-3">
                            <p className="text-sm text-slate-400">Site généré par Robin des Bois</p>
                            <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-500 transition-colors">
                                Créer mon site gratuit
                            </button>
                            <a
                                href="https://buy.stripe.com/test_..."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-xs text-slate-500 hover:text-emerald-400 transition-colors"
                            >
                                ☕ Offrir un café au développeur
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
