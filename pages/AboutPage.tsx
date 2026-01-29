import React from 'react';
import { Target, Heart, Globe, Briefcase } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <div className="relative border-b border-white/5 bg-wayv-card/30 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
                We Are <span className="text-wayv-primary">WayV</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                We believe that the best software is built in the open. Our mission is to democratize 
                access to high-performance tooling, empowering a new generation of digital creators 
                to build the impossible.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Values */}
        <div className="grid md:grid-cols-3 gap-12 mb-32">
            <div className="text-center">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-6 transition-transform">
                    <Target className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Performance First</h3>
                <p className="text-slate-400">
                    We don't compromise on speed. Every millisecond counts, whether it's OS boot time or frame render time.
                </p>
            </div>
            <div className="text-center">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-3 hover:-rotate-6 transition-transform">
                    <Heart className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Community Driven</h3>
                <p className="text-slate-400">
                    Our roadmap is defined by our users. We build what the community needs, not what shareholders dictate.
                </p>
            </div>
             <div className="text-center">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-6 transition-transform">
                    <Globe className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Radical Openness</h3>
                <p className="text-slate-400">
                    No black boxes. Our code, our design process, and our future plans are open for everyone to see and fork.
                </p>
            </div>
        </div>

        {/* Team Grid */}
        <div className="mb-32">
            <h2 className="text-3xl font-bold text-white mb-12">The Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { name: 'Alex Chen', role: 'Founder & CEO', img: 'https://i.pravatar.cc/300?u=a' },
                    { name: 'Sarah Jones', role: 'CTO', img: 'https://i.pravatar.cc/300?u=b' },
                    { name: 'Marcus Drift', role: 'Lead Engine Dev', img: 'https://i.pravatar.cc/300?u=c' },
                    { name: 'Elena V.', role: 'Head of Product', img: 'https://i.pravatar.cc/300?u=d' },
                ].map((member, i) => (
                    <div key={i} className="group">
                        <div className="relative overflow-hidden rounded-xl mb-4">
                            <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                            <img src={member.img} alt={member.name} className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <h4 className="text-lg font-bold text-white">{member.name}</h4>
                        <p className="text-sm text-slate-500">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Careers CTA */}
        <div className="bg-gradient-to-r from-wayv-dark to-wayv-card border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-wayv-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="relative z-10">
                 <Briefcase className="w-12 h-12 text-white mx-auto mb-6" />
                 <h2 className="text-3xl font-bold text-white mb-4">Come Build With Us</h2>
                 <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                     We are hiring Rust engineers, UI designers, and Developer Advocates. Fully remote, competitive equity.
                 </p>
                 <button className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors">
                     View Open Positions
                 </button>
             </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;