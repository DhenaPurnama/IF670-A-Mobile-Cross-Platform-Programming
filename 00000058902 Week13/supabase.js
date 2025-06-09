import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dlvzstspxgrsaqlwknfj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdnpzdHNweGdyc2FxbHdrbmZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNjU0MjEsImV4cCI6MjA2Mjk0MTQyMX0.qtYoHOyOLPdcXbyV_t1B4KLj-CB3H-xwEOk3vafmLlg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
