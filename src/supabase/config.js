// src/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cpkgcirswvieiyrgahsb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwa2djaXJzd3ZpZWl5cmdhaHNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5ODE1MTUsImV4cCI6MjA2MzU1NzUxNX0.K1hHLgtFFm-_U2EMDkUnshMTSNGlEbfC2jojo5y9yI8";

export const supabase = createClient(supabaseUrl, supabaseKey);
