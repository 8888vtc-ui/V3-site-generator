'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProjectProfile } from '@/types';

type SettingsContextType = {
    apiKeys: {
        anthropic: string;
        replicate: string;
    };
    setApiKeys: (keys: { anthropic: string; replicate: string }) => void;
    uploadedImages: {
        hero: string | null;
        gallery: string[];
    };
    setUploadedImages: (images: { hero: string | null; gallery: string[] }) => void;
    mode: 'free' | 'byok';
    setMode: (mode: 'free' | 'byok') => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [apiKeys, setApiKeys] = useState({ anthropic: '', replicate: '' });
    const [uploadedImages, setUploadedImages] = useState<{ hero: string | null; gallery: string[] }>({
        hero: null,
        gallery: [],
    });
    const [mode, setMode] = useState<'free' | 'byok'>('free');

    // Load from localStorage on mount
    useEffect(() => {
        const storedKeys = localStorage.getItem('robin_api_keys');
        if (storedKeys) {
            setApiKeys(JSON.parse(storedKeys));
            setMode('byok'); // Auto-switch if keys exist
        }
    }, []);

    // Save to localStorage when keys change
    useEffect(() => {
        if (apiKeys.anthropic || apiKeys.replicate) {
            localStorage.setItem('robin_api_keys', JSON.stringify(apiKeys));
        }
    }, [apiKeys]);

    return (
        <SettingsContext.Provider
            value={{
                apiKeys,
                setApiKeys,
                uploadedImages,
                setUploadedImages,
                mode,
                setMode,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
