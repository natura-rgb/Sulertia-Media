import { splitAtWordCount } from '@/lib/splitAtWordCount'
import { AdEditorial } from '@/components/AdBanner'

const IMAGE_URL = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80"
const POST_DATE = "April 28, 2026"

const BODY_TEXT = `In a historic session in Brussels, the European Parliament passed the landmark AI Act by a sweeping majority, establishing the world's first comprehensive, legally binding rules for artificial intelligence systems. The regulation introduces tiered risk categories — banning certain real-time biometric surveillance applications outright, while requiring strict transparency and human oversight for high-risk deployments in healthcare, policing, and critical infrastructure. Critics and proponents alike acknowledge this marks a turning point in how democratic governments engage with emerging technology. Analysts note that the Act's passage was far from smooth — years of debate, lobbying from major Silicon Valley firms, and last-minute amendments shaped the final text into something that satisfies neither hardline privacy advocates nor AI optimists entirely. What is clear is that the ripple effects will be felt far beyond Europe. Companies operating in EU markets must now audit their AI systems against a mandatory risk framework, with fines for non-compliance reaching up to 35 million euros or 7% of global annual turnover — whichever is higher. The legislation also establishes a new European AI Office tasked with coordinating enforcement across member states, a body that critics warn is underfunded relative to its mandate. Whether the Act succeeds in its goals will depend heavily on how national regulators choose to implement its provisions over the coming years.`

export default function Page() {
  const { before, after } = splitAtWordCount(BODY_TEXT, 200)

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

          <img
            src={IMAGE_URL}
            alt="Article hero"
            className="w-full h-[520px] object-cover"
          />

          {/* overlay — removed bottom source row entirely */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f3c] via-[#1a1f3c]/60 to-transparent flex flex-col justify-end px-10 pb-8 pt-10">

            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#FAECE7] text-[#993C1D] text-[9px] tracking-[2px] uppercase px-2 py-1">
                Science & Technology
              </span>
              <span className="text-[9px] text-white/45">
                {POST_DATE} · 14:32 UTC
              </span>
            </div>

            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#F5F0E8] leading-[1.15] tracking-tight mb-6">
              The EU Approves First Binding{" "}
              <em className="text-[#E8A87C] italic">AI Governance</em>{" "}
              Framework
            </h1>

            <p className="text-base text-white/60 leading-[1.8]">
              In a historic session in Brussels, the European Parliament passed
              the landmark AI Act, establishing the world&rsquo;s first legally
              binding rules for AI systems.
            </p>

          </div>
        </article>
      </div>

      {/* BODY — flush against hero, Full Story label at very top */}
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
              Via Reuters / Associated Press
            </span>
            <span className="text-[9px] uppercase tracking-[2px] text-white/20">
              {POST_DATE}
            </span>
          </div>

        </div>
      </div>

      {/* BOTTOM STATUS */}
      <footer className="mt-16 mb-10 flex items-center justify-center gap-4">
        <div className="w-16 h-px bg-[#C4521A] opacity-30" />
        <span className="text-[9px] tracking-[3px] uppercase text-[#1a1f3c] opacity-25">
          Analysing 847 breaking stories
        </span>
        <div className="w-16 h-px bg-[#C4521A] opacity-30" />
      </footer>

    </main>
  )
}