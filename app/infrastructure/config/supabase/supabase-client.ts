import { createClient } from '@supabase/supabase-js'
import { ConfigEnviroment } from '../env/env';

const supabaseUrl = new ConfigEnviroment().nextPublicSupabaseUrl;
const supabaseAnonKey = new ConfigEnviroment().nextPublicSupabaseKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
