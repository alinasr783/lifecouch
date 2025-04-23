import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oyzbukhhfaaevbsbpsop.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95emJ1a2hoZmFhZXZic2Jwc29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzODY3NTYsImV4cCI6MjA2MDk2Mjc1Nn0.05qiuNGTjF-uftpiIFgAtxzq2r0c_aDqhwduxPWNh_c'

export const supabase = createClient(supabaseUrl, supabaseKey)