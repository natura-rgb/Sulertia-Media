export default function EditorialClassic() {
  return (
    <main className="min-h-screen bg-[#F9F7F2] flex flex-col items-center justify-center p-4 md:p-8 font-serif selection:bg-orange-100">
      {/* Header: AI Status & Navigation [cite: 14, 15] */}
      <header className="fixed top-0 w-full max-w-6xl flex justify-between p-8 text-[10px] tracking-[0.2em] uppercase opacity-60">
        <div className="font-bold tracking-tighter text-lg italic">SULERTIA<span className="text-[8px] align-top ml-0.5">MEDIA</span></div>
        <div className="flex gap-10 items-center">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            AI Scanning
          </div>
          <button className="hover:line-through transition-all">History Vault</button>
        </div>
      </header>

      {/* Main Content Card [cite: 13] */}
      <article className="relative max-w-4xl w-full bg-[#FCFAF7] p-8 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-black/5 leading-relaxed group">
        <div className="flex justify-between items-center mb-10 text-[10px] uppercase tracking-widest opacity-40">
          <div className="flex gap-4">
            <span className="text-orange-700">Science & Technology</span>
            <span>Today, 14:32 UTC</span>
          </div>
          <div className="text-green-700 font-bold border border-green-700/20 px-2 py-0.5 rounded-sm bg-green-50/50">
            ↑ Score 9.4
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-medium mb-10 text-[#1a1a1a] leading-[1.1] tracking-tight">
          The EU Approves First Binding <span className="italic text-orange-800/80 underline decoration-1 underline-offset-8">AI Governance</span> Framework
        </h1>

        <p className="text-lg md:text-xl font-sans font-light text-black/70 mb-12 max-w-2xl">
          In a historic session in Brussels, the European Parliament passed the landmark AI Act, establishing the world's first comprehensive, legally binding rules for artificial intelligence systems.
        </p>

        <footer className="flex justify-between items-center pt-8 border-t border-black/5 mt-16">
          <span className="text-[10px] opacity-30 uppercase tracking-widest">Via Reuters / Associated Press</span>
          <button className="text-sm font-sans border-b border-black/20 hover:border-black transition-colors pb-1">Read full story →</button>
        </footer>
      </article>

      {/* Bottom Info [cite: 14] */}
      <footer className="fixed bottom-8 text-[10px] opacity-30 uppercase tracking-[0.3em] flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-black/20"></div>
          Analysing 847 breaking stories
          <div className="w-12 h-[1px] bg-black/20"></div>
        </div>
      </footer>
    </main>
  );
}