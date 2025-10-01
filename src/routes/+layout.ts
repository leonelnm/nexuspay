export const ssr = false;
export const prerender = false;

// This file is used to disable SSR and prerendering for the entire app
// because Supabase's auth client relies on browser APIs like localStorage
// which are not available during server-side rendering.