import React from 'react';
import { Monitor, Layers, Box, ChevronRight, Terminal as TerminalIcon, Cpu, Zap } from 'lucide-react';

const ProductsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20 animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-wayv-primary to-wayv-accent">WayV Ecosystem</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A suite of interconnected tools designed for the next generation of performance-critical applications.
          </p>
        </div>

        {/* WaveOS */}
        <section className="mb-32 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-3xl -z-10 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="bg-wayv-card border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Monitor className="w-8 h-8 text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">WaveOS</h2>
                </div>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                  The first operating system designed exclusively for ephemeral container workloads. 
                  WaveOS strips away legacy kernel bloat to deliver <span className="text-white font-semibold">sub-100ms boot times</span> and hardware-level isolation.
                </p>
                <ul className="space-y-4 mb-8">
                    {[
                        'Immutable by default file system',
                        'Native eBPF observability stack',
                        'WASM-based kernel modules'
                    ].map((feat, i) => (
                        <li key={i} className="flex items-center text-slate-400">
                            <ChevronRight className="w-4 h-4 text-blue-400 mr-2" />
                            {feat}
                        </li>
                    ))}
                </ul>
                <div className="flex gap-4">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">Download ISO</button>
                    <button className="px-6 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10">Documentation</button>
                </div>
              </div>
              <div className="bg-[#0f111a] rounded-xl p-4 font-mono text-sm border border-white/5 shadow-2xl transform rotate-1 transition-transform group-hover:rotate-0">
                <div className="flex space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-1">
                    <div className="text-slate-500"># Boot sequence log</div>
                    <div className="text-green-400">➜  ~ waveos boot --kernel=v2.4.0</div>
                    <div className="text-slate-300">[0.001s] Kernel loaded @ 0x400000</div>
                    <div className="text-slate-300">[0.012s] Filesystem mounted (Read-Only)</div>
                    <div className="text-slate-300">[0.045s] Network stack initialized (eBPF active)</div>
                    <div className="text-slate-300">[0.089s] User space ready.</div>
                    <div className="text-blue-400 font-bold">System ready in 92ms.</div>
                    <div className="animate-pulse text-white">_</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wave Engine */}
        <section className="mb-32 relative group">
           <div className="absolute inset-0 bg-gradient-to-l from-violet-500/10 to-transparent rounded-3xl -z-10 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
           <div className="bg-wayv-card border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="order-2 md:order-1 relative h-64 md:h-80 bg-black rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                  {/* Abstract stylized wireframe representation */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900/40 via-transparent to-transparent"></div>
                  <Box className="w-32 h-32 text-violet-500 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute bottom-4 left-4 text-xs font-mono text-violet-300">
                    Render Time: 0.4ms <br/>
                    Triangles: 4.2M
                  </div>
               </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-violet-500/20 rounded-lg">
                    <Cpu className="w-8 h-8 text-violet-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Wave Engine</h2>
                </div>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                  Built in Rust for safety without sacrificing speed. Wave Engine utilizes a data-oriented ECS architecture that scales across all available CPU cores automatically.
                </p>
                 <ul className="space-y-4 mb-8">
                    {[
                        'Real-time Global Illumination',
                        'Hot-reloadable Rust scripting',
                        'WebGPU and Vulkan backend'
                    ].map((feat, i) => (
                        <li key={i} className="flex items-center text-slate-400">
                            <ChevronRight className="w-4 h-4 text-violet-400 mr-2" />
                            {feat}
                        </li>
                    ))}
                </ul>
                <button className="px-6 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors">
                    Start Creating
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Wavium */}
        <section className="relative group">
           <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent rounded-3xl -z-10 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
           <div className="bg-wayv-card border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-emerald-500/20 rounded-lg">
                    <Layers className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Wavium UI</h2>
                </div>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                  Stop fighting your component library. Wavium provides the behavioral primitives for complex UI interactions, leaving the styling entirely up to you (or use our presets).
                </p>
                 <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <h4 className="text-white font-bold mb-1">Headless</h4>
                        <p className="text-xs text-slate-400">Full control over markup and styles.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <h4 className="text-white font-bold mb-1">Accessible</h4>
                        <p className="text-xs text-slate-400">WAI-ARIA compliance out of the box.</p>
                    </div>
                 </div>
                <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                    View Components
                </button>
              </div>
              <div className="bg-[#1e1e1e] rounded-xl p-6 border border-white/5 shadow-inner">
                  <div className="flex flex-col space-y-4">
                      {/* Mock UI Elements */}
                      <div className="h-2 bg-white/10 rounded w-1/3"></div>
                      <div className="flex space-x-4">
                          <button className="flex-1 py-2 bg-emerald-500 rounded text-black text-xs font-bold hover:scale-105 transition-transform">
                             Primary Action
                          </button>
                          <button className="flex-1 py-2 bg-white/10 rounded text-white text-xs hover:bg-white/20">
                             Secondary
                          </button>
                      </div>
                      <div className="p-4 bg-black/20 rounded border border-white/5">
                          <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-slate-400">Volume</span>
                              <span className="text-xs text-emerald-400">75%</span>
                          </div>
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full w-3/4 bg-emerald-500"></div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProductsPage;