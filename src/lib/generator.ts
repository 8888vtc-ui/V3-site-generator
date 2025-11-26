import { ProjectProfile, GeneratedPageContent } from '@/types';
import Anthropic from '@anthropic-ai/sdk';
import Replicate from 'replicate';

// Mock data for Free Tier
const FREE_TEMPLATES = {
    professional: {
        hero: {
            headline: "Excellence et Professionnalisme",
            subheadline: "Votre partenaire de confiance pour des services de qualité supérieure.",
            cta: "Contactez-nous",
        },
        sections: [
            {
                title: "Nos Services",
                content: "Nous offrons une gamme complète de services adaptés à vos besoins. Notre équipe d'experts est là pour vous accompagner.",
            },
            {
                title: "Pourquoi Nous Choisir ?",
                content: "Avec des années d'expérience et un engagement envers la satisfaction client, nous sommes le choix idéal.",
            },
        ],
        faq: [
            { question: "Quels sont vos tarifs ?", answer: "Nos tarifs sont compétitifs et adaptés à chaque projet. Contactez-nous pour un devis." },
            { question: "Intervenez-vous le week-end ?", answer: "Oui, nous sommes disponibles 7j/7 pour répondre à vos urgences." },
        ],
    },
    // Add more templates as needed
};

export async function generateContent(profile: ProjectProfile): Promise<GeneratedPageContent> {
    if (profile.settings.mode === 'free') {
        return generateFreeContent(profile);
    } else {
        return generateProContent(profile);
    }
}

function generateFreeContent(profile: ProjectProfile): GeneratedPageContent {
    // Simple template substitution
    const template = FREE_TEMPLATES.professional; // Default to professional for now

    return {
        hero: {
            headline: `${profile.company.name} - ${template.hero.headline}`,
            subheadline: `${profile.seo.mainKeyword} à ${profile.company.description}. ${template.hero.subheadline}`,
            cta: template.hero.cta,
        },
        sections: template.sections.map(s => ({
            ...s,
            content: s.content.replace('Nous', profile.company.name),
        })),
        faq: template.faq,
    };
}

async function generateProContent(profile: ProjectProfile): Promise<GeneratedPageContent> {
    if (!profile.settings.apiKeys?.anthropic) {
        throw new Error("Clé API Anthropic manquante");
    }

    const anthropic = new Anthropic({
        apiKey: profile.settings.apiKeys.anthropic,
        dangerouslyAllowBrowser: true, // Note: In a real app, this should be server-side
    });

    const prompt = `
    Tu es un expert SEO et Copywriter. Génère le contenu d'une landing page pour :
    Entreprise: ${profile.company.name}
    Activité: ${profile.company.description}
    Mot-clé: ${profile.seo.mainKeyword}
    Ton: ${profile.seo.tone}
    
    Structure JSON attendue:
    {
      "hero": { "headline": "...", "subheadline": "...", "cta": "..." },
      "sections": [ { "title": "...", "content": "..." } ],
      "faq": [ { "question": "...", "answer": "..." } ]
    }
  `;

    const msg = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
    });

    const textBlock = msg.content[0];
    if (textBlock.type !== 'text') throw new Error("Réponse inattendue de Claude");

    try {
        return JSON.parse(textBlock.text);
    } catch (e) {
        console.error("Failed to parse JSON from Claude", textBlock.text);
        return generateFreeContent(profile); // Fallback
    }
}

export async function generateImage(prompt: string, apiKey: string): Promise<string> {
    const replicate = new Replicate({ auth: apiKey });

    // Using a fast, cheap model for demo purposes in BYOK
    const output = await replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
            input: {
                prompt: "Professional photography, 8k, " + prompt,
                width: 1024,
                height: 576,
            }
        }
    );

    return (output as string[])[0];
}
