import { createClient } from '@supabase/supabase-js';
import { ProjectProfile, GeneratedPageContent } from '@/types';

// Initialize the client
// These environment variables must be set in Netlify
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveSite(profile: ProjectProfile, content: GeneratedPageContent) {
    const { data, error } = await supabase
        .from('sites')
        .insert([
            {
                profile_json: profile,
                content_json: content,
                company_name: profile.company.name,
                created_at: new Date().toISOString(),
            },
        ])
        .select()
        .single();

    if (error) {
        console.error('Error saving site:', error);
        throw error;
    }

    return data;
}
