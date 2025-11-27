'use client';

import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { ProjectProfile } from '@/types';
import { Upload, Settings, Wand2, Image as ImageIcon } from 'lucide-react';
import { clsx } from 'clsx';

export function GeneratorWidget({ onGenerate }: { onGenerate: (profile: ProjectProfile) => void }) {
    const { mode, setMode, apiKeys, setApiKeys, uploadedImages, setUploadedImages } = useSettings();
    const [formData, setFormData] = useState({
        companyName: '',
        activity: '',
        city: '',
        email: '',
    });
    const [template, setTemplate] = useState<'artisan' | 'modern'>('artisan');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'hero' | 'gallery') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'hero') {
                    setUploadedImages({ ...uploadedImages, hero: reader.result as string });
                } else {
                    setUploadedImages({ ...uploadedImages, gallery: [...uploadedImages.gallery, reader.result as string] });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const profile: ProjectProfile = {
            id: crypto.randomUUID(),
            company: {
                name: formData.companyName,
                description: formData.activity,
                industry: 'general',
            },
            contact: { email: formData.email, address: formData.city },
            seo: { mainKeyword: formData.activity, tone: 'professional' },
            images: {
                hero: uploadedImages.hero || undefined,
                gallery: uploadedImages.gallery,
                source: uploadedImages.hero ? 'upload' : 'stock',
            },
            settings: { mode, template, apiKeys },
        };
        onGenerate(profile);
    };

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Wand2 className="w-6 h-6" />
                    Robin Generator
                </h2>
                <p className="text-emerald-100 text-sm mt-1">Créez votre site pro en 30 secondes.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Mode Switcher */}
                <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                    <button
                        type="button"
                        onClick={() => setMode('free')}
                        className={clsx(
                            "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                            mode === 'free' ? "bg-white shadow-sm text-emerald-700" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        Gratuit
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('byok')}
                        className={clsx(
                            "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                            mode === 'byok' ? "bg-white shadow-sm text-purple-700" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        Expert (BYOK)
                    </button>
                </div>

                {/* Basic Fields */}
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Nom de votre entreprise"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Activité (ex: Plombier à Paris)"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        value={formData.activity}
                        onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Votre email (pour le devis)"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                {/* Image Upload */}
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-emerald-400 transition-colors">
                    <input
                        type="file"
                        id="hero-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'hero')}
                    />
                    <label htmlFor="hero-upload" className="cursor-pointer flex flex-col items-center gap-2 text-gray-500 hover:text-emerald-600">
                        {uploadedImages.hero ? (
                            <img src={uploadedImages.hero} alt="Hero" className="h-16 w-full object-cover rounded-md" />
                        ) : (
                            <>
                                <ImageIcon className="w-8 h-8" />
                                <span className="text-xs">Ajouter une photo (Hero)</span>
                            </>
                        )}
                    </label>
                </div>

                {/* BYOK Fields */}
                {mode === 'byok' && (
                    <div className="bg-purple-50 p-4 rounded-lg space-y-3 border border-purple-100">
                        <h3 className="text-xs font-semibold text-purple-800 uppercase tracking-wider flex items-center gap-1">
                            <Settings className="w-3 h-3" /> Clés API (Stockées localement)
                        </h3>
                        <input
                            type="password"
                            placeholder="Clé Anthropic (sk-...)"
                            className="w-full px-3 py-2 text-sm rounded border border-purple-200 focus:ring-2 focus:ring-purple-500 outline-none"
                            value={apiKeys.anthropic}
                            onChange={(e) => setApiKeys({ ...apiKeys, anthropic: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Clé Replicate (r8_...)"
                            className="w-full px-3 py-2 text-sm rounded border border-purple-200 focus:ring-2 focus:ring-purple-500 outline-none"
                            value={apiKeys.replicate}
                            onChange={(e) => setApiKeys({ ...apiKeys, replicate: e.target.value })}
                        />
                    </div>
                )}

                {/* Template Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Choisir un style :</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => setTemplate('artisan')}
                            className={clsx(
                                "p-3 rounded-lg border-2 text-left transition-all",
                                template === 'artisan' ? "border-emerald-500 bg-emerald-50" : "border-gray-100 hover:border-gray-200"
                            )}
                        >
                            <div className="font-serif font-bold text-slate-900">Artisan</div>
                            <div className="text-xs text-slate-500">Élégant & Classique</div>
                        </button>
                        <button
                            type="button"
                            onClick={() => setTemplate('modern')}
                            className={clsx(
                                "p-3 rounded-lg border-2 text-left transition-all",
                                template === 'modern' ? "border-indigo-500 bg-indigo-50" : "border-gray-100 hover:border-gray-200"
                            )}
                        >
                            <div className="font-sans font-bold text-slate-900">Modern</div>
                            <div className="text-xs text-slate-500">Tech & Sombre</div>
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className={clsx(
                        "w-full py-4 rounded-xl font-bold text-white shadow-lg transform transition-all hover:scale-[1.02]",
                        mode === 'free' ? "bg-emerald-600 hover:bg-emerald-700" : "bg-purple-600 hover:bg-purple-700"
                    )}
                >
                    Générer mon Site {mode === 'free' ? 'Gratuit' : 'Premium'}
                </button>
            </form>
        </div>
    );
}
