import React from 'react';
import { ArrowRight, ChevronRight, Code2, Cpu, Globe, Github } from 'lucide-react';
import { SectionId } from '../types';

const Hero: React.FC = () => {
  return (
    <section id={SectionId.HERO} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-wayv-primary/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-wayv-accent/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-wayv-glow/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-wayv-accent/30 bg-wayv-accent/10 text-wayv-accent text-xs font-mono mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          v2.0 of Wave Engine is live
          <ChevronRight className="w-3 h-3 ml-1" />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up">
          <span className="block text-white mb-2">Build the Future</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-wayv-accent via-wayv-primary to-wayv-glow">
            With Open Source
          </span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          WayV empowers developers with next-gen tools. From robust operating systems to high-performance game engines.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button className="group relative px-8 py-3 bg-white text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="flex items-center">
              Start Building <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button className="px-8 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2">
            <Github className="w-5 h-5" />
            View on GitHub
          </button>
        </div>

        {/* Floating Tech Icons Mockup */}
        <div className="mt-20 relative w-full max-w-4xl mx-auto h-64 md:h-80 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-wayv-dark to-transparent z-20"></div>
          
          {/* Mock Interface Code */}
          <div className="absolute inset-0 bg-wayv-card border border-white/5 rounded-t-xl overflow-hidden shadow-2xl transform rotate-x-12 perspective-1000">
             <div className="flex items-center px-4 py-2 bg-white/5 border-b border-white/5 space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 px-3 py-1 bg-black/50 rounded text-xs font-mono text-slate-500 flex-1">main.rs — WaveEngine</div>
             </div>
             <div className="p-6 font-mono text-sm text-left overflow-hidden">
                <div className="text-pink-500">fn <span className="text-blue-400">main</span>() {'{'}</div>
                <div className="pl-4 text-slate-400">// Initialize Wave Engine Core</div>
                <div className="pl-4 text-white">let engine = <span className="text-yellow-400">WaveEngine</span>::<span className="text-cyan-400">new</span>(Config::default());</div>
                <div className="pl-4 text-white">engine.<span className="text-cyan-400">connect</span>(<span className="text-green-400">"wavium-cloud"</span>);</div>
                <div className="pl-4 mt-2 text-slate-400">// Launch immersive environment</div>
                <div className="pl-4 text-white">engine.<span className="text-cyan-400">render_loop</span>(|ctx| {'{'}</div>
                <div className="pl-8 text-white">ctx.draw_scene();</div>
                <div className="pl-4 text-white">{'}'});</div>
                <div className="text-pink-500">{'}'}</div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;