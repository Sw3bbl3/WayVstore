import React from 'react';
import { Layers, Monitor, Box, Zap, Lock, RefreshCw } from 'lucide-react';
import { Product, SectionId } from '../types';

const products: Product[] = [
  {
    id: 'wave-os',
    name: 'WaveOS',
    tagline: 'The OS for Cloud Natives',
    description: 'A lightweight, immutable operating system designed purely for containerized workloads and effortless scalability.',
    icon: 'os',
    features: ['Immutable File System', 'eBPF Tracing', 'Instant Boot'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'wave-engine',
    name: 'Wave Engine',
    tagline: 'Hyper-Realistic Physics',
    description: 'A Rust-based game engine prioritizing memory safety and concurrent rendering for next-gen experiences.',
    icon: 'engine',
    features: ['Ray Tracing', 'ECS Architecture', 'WebAssembly Support'],
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    id: 'wavium',
    name: 'Wavium',
    tagline: 'UI at the Speed of Light',
    description: 'An unstyled, accessible component library for React and Vue that handles the logic so you can handle the design.',
    icon: 'ui',
    features: ['WAI-ARIA Compliant', 'Headless', 'Framer Motion Ready'],
    gradient: 'from-emerald-500 to-teal-500',
  },
];

const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const Icon = product.id === 'wave-os' ? Monitor : product.id === 'wave-engine' ? Box : Layers;

  return (
    <div className="group relative bg-wayv-card rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      {/* Hover Gradient Glow */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${product.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${product.gradient} p-0.5 mb-6`}>
          <div className="w-full h-full bg-wayv-card rounded-md flex items-center justify-center">
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-sm font-mono text-wayv-accent mb-4">{product.tagline}</p>
        <p className="text-slate-400 mb-6 leading-relaxed">
          {product.description}
        </p>

        <ul className="space-y-3">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-center text-sm text-slate-300">
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.gradient} mr-3`} />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">v1.4.0 Stable</span>
            <button className="text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                Learn more &rarr;
            </button>
        </div>
      </div>
    </div>
  );
};

const ProductShowcase: React.FC = () => {
  return (
    <section id={SectionId.PRODUCTS} className="py-24 relative bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Tools for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-wayv-primary to-wayv-accent">Modern Creator</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Our ecosystem enables you to build faster, scale endlessly, and design beautifully. Open source at its core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;