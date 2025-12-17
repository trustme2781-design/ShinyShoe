import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hqfjzmjqziiqooqxkcqp.supabase.co';
// Note: In a production environment, this key should be an environment variable.
const supabaseKey = 'sb_publishable__0ucpSU1mQnYeAovaeOK6g_dnfrYy5j';

export const supabase = createClient(supabaseUrl, supabaseKey);