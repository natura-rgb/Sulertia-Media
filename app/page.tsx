export default function Design2() {
  return (
    <main className="min-h-screen bg-[#111109] flex flex-col pt-20 pb-16 font-lora">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center border-b border-white/5">
        <div className="w-full max-w-5xl flex justify-between items-center px-8 py-5">
          <div className="font-playfair font-bold text-lg text-[#F5F0E8] tracking-tight">
            SULERTIA
            <span className="text-[9px] font-lora font-normal tracking-[3px] uppercase opacity-30 ml-1 align-super">
              MEDIA
            </span>
          </div>
          <nav className="flex items-center gap-8 text-[9px] tracking-[2px] uppercase text-[#F5F0E8] opacity-40">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#C8A96E] rounded-full animate-pulse" />
              AI Scanning
            </div>
            <button className="hover:opacity-100 transition-opacity">History Vault</button>
          </nav>
        </div>
      </header>

      {/* ARTICLE */}
      <div className="flex-1 flex items-center justify-center px-4">
        <article className="max-w-2xl w-full">

          {/* Gold rule */}
          <div className="border-t border-[#C8A96E] opacity-40 mb-6" />

          {/* Dateline */}
          <p className="text-[9px] tracking-[3px] uppercase text-[#C8A96E] mb-6">
            Today · 14:32 UTC · Science & Technology
          </p>

          {/* Headline */}
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#F5F0E8] leading-[1.15] tracking-tight mb-6">
            The EU Approves First Binding{" "}
            <em className="text-[#C8A96E] italic">AI Governance</em>{" "}
            Framework
          </h1>

          <div className="border-t border-white/10 mb-6" />

          {/* Body */}
          <p className="text-base text-[#F5F0E8]/60 leading-[1.9] mb-10">
            In a historic session in Brussels, the European Parliament passed the landmark
            AI Act by a sweeping majority, establishing the world&rsquo;s first comprehensive,
            legally binding rules for artificial intelligence systems. The regulation introduces
            tiered risk categories — banning certain real-time biometric surveillance applications
            outright, while requiring strict transparency and human oversight for high-risk
            deployments in healthcare, policing, and critical infrastructure.
          </p>

          {/* Footer */}
          <footer className="flex justify-between items-center">
            <span className="text-[9px] uppercase tracking-[2px] text-white/20">
              Via Reuters / Associated Press
            </span>
            <span className="text-[9px] text-[#C8A96E] border border-[#C8A96E]/40 px-2 py-0.5 rounded-sm">
              ↑ Score 9.4
            </span>
          </footer>
        </article>
      </div>

      {/* BOTTOM */}
      <footer className="fixed bottom-6 left-0 right-0 flex items-center justify-center gap-4 pointer-events-none">
        <div className="w-16 h-px bg-[#C8A96E] opacity-20" />
        <span className="text-[9px] tracking-[3px] uppercase text-white opacity-20">
          Analysing 847 breaking stories
        </span>
        <div className="w-16 h-px bg-[#C8A96E] opacity-20" />
      </footer>

    </main>
  )
}