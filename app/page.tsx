import { supabase } from '@/lib/supabaseClient';
import { splitAtWordCount } from '@/lib/splitAtWordCount';
import { AdEditorial } from '@/components/AdBanner';

export default async function Page() {
  // 1. მონაცემების წამოღება
  let { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_current', true)
    .maybeSingle();

  // Fallback: თუ current არ არის, ავიღოთ ბოლო პოსტი
  if (!post) {
    const { data: latest } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    post = latest;
  }

  // 2. შემოწმება
  if (error || !post) {
    return (
      <main className="min-h-screen bg-[#E8E4D9] flex items-center justify-center font-lora">
        <div className="text-center">
          <span className="w-3 h-3 bg-red-500 rounded-full inline-block animate-ping mb-4" />
          <p className="opacity-50 tracking-[3px] uppercase text-[10px]">Waiting for AI Agent to select a post...</p>
        </div>
      </main>
    );
  }

  // 3. ლოგიკა
  const { before, after } = splitAtWordCount(post.content || '', 200);
  const formattedDate = post.created_at 
    ? new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : "Live Feed";

  return (
    <main className="min-h-screen bg-[#E8E4D9] flex flex-col font-lora">
      {/* Header და სხვა კომპონენტები უცვლელია... */}
      <div className="flex justify-center px-4 pt-10">
        <article className="max-w-3xl w-full border-l-[3px] border-[#C4521A] bg-[#1a1f3c] shadow-2xl">
           {/* ... შენი კონტენტი ... */}
           <div className="px-10 py-12 text-[#F5F0E8]/80 leading-[1.9]">
              <p className="first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-3">
                {before}
              </p>
              {after && (
                <>
                  <AdEditorial />
                  <p>{after}</p>
                </>
              )}
           </div>
        </article>
      </div>
    </main>
  );
}