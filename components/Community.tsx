import React from 'react';
import {  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Users, Star, GitFork, Heart } from 'lucide-react';
import { SectionId } from '../types';

const data = [
  { month: 'Jan', contributors: 120 },
  { month: 'Feb', contributors: 150 },
  { month: 'Mar', contributors: 280 },
  { month: 'Apr', contributors: 390 },
  { month: 'May', contributors: 560 },
  { month: 'Jun', contributors: 780 },
  { month: 'Jul', contributors: 1200 },
];

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ icon, value, label }) => (
  <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
    <div className="mb-3 text-wayv-accent">{icon}</div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-slate-400 font-mono">{label}</div>
  </div>
);

const Community: React.FC = () => {
  return (
    <section id={SectionId.COMMUNITY} className="py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-wayv-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-wayv-glow/10 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Powered by <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Global Collaboration
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              WayV isn't just a company; it's a movement. Thousands of developers contribute code, design, and ideas to our ecosystem every day. Join us on GitHub and Discord.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <StatCard icon={<Star className="w-6 h-6" />} value="12.5k" label="GitHub Stars" />
              <StatCard icon={<Users className="w-6 h-6" />} value="4.2k" label="Community Members" />
              <StatCard icon={<GitFork className="w-6 h-6" />} value="850+" label="Contributors" />
              <StatCard icon={<Heart className="w-6 h-6" />} value="100%" label="Open Source" />
            </div>
            
            <button className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-slate-200 transition-colors w-full sm:w-auto">
              Join Discord Community
            </button>
          </div>

          <div className="bg-wayv-card/50 rounded-2xl p-6 border border-white/10 backdrop-blur-md shadow-2xl h-[400px]">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Contributor Growth
            </h3>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorContributors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="contributors" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorContributors)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Community;