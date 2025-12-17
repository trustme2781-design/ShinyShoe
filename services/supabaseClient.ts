import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hqfjzmjqziiqooqxkcqp.supabase.co';
// Note: In a production environment, this key should be an environment variable.
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZmp6bWpxemlpcW9vcXhrY3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NDk5MzQsImV4cCI6MjA4MTUyNTkzNH0._4_9WXO86YisHPgHVqulN-x57nKC_7FkS2GR1fx5hjg';

export const supabase = createClient(supabaseUrl, supabaseKey);
