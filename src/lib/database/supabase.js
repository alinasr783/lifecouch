import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vfughdzdixkpnkekjjlg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmdWdoZHpkaXhrcG5rZWtqamxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMDU1ODksImV4cCI6MjA2NDU4MTU4OX0.XF3H5blE-408-oKYqL5_5xj9KBz7k5LMYG7iOKq45IQ'

export const supabase = createClient(supabaseUrl, supabaseKey)