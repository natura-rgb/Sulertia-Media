import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // ვიყენებთ console.error-ს, რომ Build-ის დროს პროცესი არ გაჩერდეს, 
  // მაგრამ შეცდომა დავინახოთ
  console.error('Missing Supabase environment variables')
}

export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || ''
)