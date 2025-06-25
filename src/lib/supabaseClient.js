// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vywjskzobuphhjjnydjt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5d2pza3pvYnVwaGhqam55ZGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MjE3OTUsImV4cCI6MjA2NTk5Nzc5NX0.cTquHl0awF3UwN70dRG87NbspjqPwIXvI4rT5EcVXPo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
