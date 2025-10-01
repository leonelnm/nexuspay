import { supabase } from "./supabaseClient";

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export const getCurrentSession = async () => {
  return await supabase.auth.getSession();
}