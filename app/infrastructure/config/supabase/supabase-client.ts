import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gfjdmwzbkvmposmjqmrl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmamRtd3pia3ZtcG9zbWpxbXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIzMjUxNzUsImV4cCI6MTk4NzkwMTE3NX0.4Wim-e10CRpBUC1egWCJxMTBMvSoj-O84uTlLGYOAe0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
