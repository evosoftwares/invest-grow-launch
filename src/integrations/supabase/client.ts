// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bjbdldakxktwhfrnpwas.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqYmRsZGFreGt0d2hmcm5wd2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MzM3ODksImV4cCI6MjA2NTUwOTc4OX0.1ijBdy6YYFGGLaFe_nkddrpsyd0K_zWUU7kWEbho6qY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);