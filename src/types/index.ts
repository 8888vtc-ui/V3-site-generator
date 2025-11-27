export type ProjectProfile = {
  id: string;
  company: {
    name: string;
    description: string;
    industry: string;
  };
  contact: {
    email?: string;
    phone?: string;
    address?: string;
  };
  seo: {
    mainKeyword: string;
    tone: 'professional' | 'friendly' | 'luxury' | 'urgent';
  };
  images: {
    hero?: string; // URL or Base64
    gallery: string[]; // URLs or Base64
    source: 'stock' | 'upload' | 'generated';
  };
  settings: {
    mode: 'free' | 'byok';
    template: 'artisan' | 'modern'; // New field
    apiKeys?: {
      anthropic?: string;
      replicate?: string;
    };
  };
};

export type PagePlanEntry = {
  slug: string;
  title: string;
  type: 'home' | 'service' | 'about' | 'contact';
  seo: {
    title: string;
    description: string;
  };
};

export type GeneratedPageContent = {
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  sections: Array<{
    title: string;
    content: string; // Markdown or HTML
    image?: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
};
