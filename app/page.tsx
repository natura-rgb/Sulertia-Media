import { supabase } from '@/lib/supabaseClient';
import { splitAtWordCount } from '@/lib/splitAtWordCount';
import { AdEditorial } from '@/components/AdBanner';

export default async function Page() {
  // 1. მონაცემების წამოღება Supabase-იდან
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_current', true)
    .single();

  // 2. თუ პოსტი არ მოიძებნა ან შეცდომაა
  if (error || !post) {
    return (
      <main className="min-h-screen bg-[#E8E4D9] flex items-center justify-center font-lora">
        <p className="opacity-50 tracking-widest uppercase text-xs">Waiting for AI Agent to select a post...</p>
      </main>
    );
  }

  // 3. ტექსტის გაყოფა (შენი ლოგიკით)
  const { before, after } = splitAtWordCount(post.content, 200);

  // 4. თარიღის ფორმატირება
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <main className="min-h-screen bg-[#E8E4D9] flex flex-col font-lora">
      {/* HEADER */}
      <header className="sticky top-0 left-0 right-0 z-50 flex justify-center bg-[#E8E4D9]/95 backdrop-blur-sm border-b border-black/5 transition-all duration-300">
        <div className="w-full max-w-5xl flex justify-between items-center px-8 py-5">
          <div className="font-playfair font-bold text-lg tracking-tight text-[#1a1f3c]">
            SULERTIA
            <span className="text-[9px] font-lora font-normal tracking-[3px] uppercase opacity-40 ml-1 align-super">
              MEDIA
            </span>
          </div>
          <nav className="flex items-center gap-8 text-[9px] tracking-[2px] uppercase text-[#1a1f3c] opacity-60">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              AI Scanning
            </div>
            <button>History Vault</button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <div className="flex justify-center px-4 pt-0">
        <article className="max-w-3xl w-full border-l-[3px] border-[#C4521A] relative overflow-hidden shadow-sm">
          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-[520px] object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f3c] via-[#1a1f3c]/60 to-transparent flex flex-col justify-end px-10 pb-8 pt-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#FAECE7] text-[#993C1D] text-[9px] tracking-[2px] uppercase px-2 py-1">
                {post.category || 'General'}
              </span>
              <span className="text-[9px] text-white/45">
                {formattedDate} · AI Score: {post.importance_score}
              </span>
            </div>

            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#F5F0E8] leading-[1.15] tracking-tight mb-6">
              {post.title}
            </h1>

            <p className="text-base text-white/60 leading-[1.8] line-clamp-3">
              {before.trim()}...
            </p>
          </div>
        </article>
      </div>

      {/* BODY */}
      <div className="flex justify-center px-4">
        <div className="max-w-3xl w-full bg-[#1a1f3c] border-l-[3px] border-[#C4521A] px-10 pt-5 pb-10">
          <p className="text-[9px] tracking-[3px] uppercase text-[#E8A87C] opacity-60 mb-3">
            Full Story
          </p>
          <div className="border-t border-[#E8A87C]/20 mb-5" />
          
          <p className="text-base text-[#F5F0E8]/60 leading-[1.9]">
            {before.trim()}
          </p>

          {after && (
            <>
              <AdEditorial />
              <p className="text-base text-[#F5F0E8]/60 leading-[1.9]">
                {after.trim()}
              </p>
            </>
          )}

          <div className="border-t border-[#E8A87C]/15 mt-12 pt-6 flex justify-between items-center">
            <span className="text-[9px] uppercase tracking-[2px] text-white/20">
              Sulertia Protocol AI Selection
            </span>
            <span className="text-[9px] uppercase tracking-[2px] text-white/20">
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM STATUS */}
      <footer className="mt-16 mb-10 flex items-center justify-center gap-4">
        <div className="w-16 h-px bg-[#C4521A] opacity-30" />
        <span className="text-[9px] tracking-[3px] uppercase text-[#1a1f3c] opacity-25">
          Analysing Breaking Stories
        </span>
        <div className="w-16 h-px bg-[#C4521A] opacity-30" />
      </footer>
    </main>
  );
}