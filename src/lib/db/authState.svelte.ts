import type { Session } from "@supabase/supabase-js";

export const authSession = $state({
  session: null as Session | null
});