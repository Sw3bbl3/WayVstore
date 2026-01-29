import React from 'react';
import { Calendar, Users, MessageSquare, Award, ArrowUpRight } from 'lucide-react';
import Community from '../components/Community'; // Reuse the chart section

const events = [
  {
    title: 'WaveCon 2025',
    date: 'Aug 12 - 14, 2025',
    type: 'Conference',
    location: 'San Francisco & Online',
    description: 'The biggest gathering of Wave ecosystem developers. Keynotes, workshops, and more.',
  },
  {
    title: 'Game Jam: Physics Edition',
    date: 'Oct 05, 2025',
    type: 'Hackathon',
    location: 'Global (Remote)',
    description: 'Build a game using Wave Engine in 48 hours. $10k in prizes.',
  },
  {
    title: 'Community Town Hall',
    date: 'Monthly',
    type: 'Meetup',
    location: 'Discord Stage',
    description: 'Direct Q&A with the core team. Open mic for community showcases.',
  }
];

const contributors = [
    'https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2', 'https://i.pravatar.cc/150?u=3',
    'https://i.pravatar.cc/150?u=4', 'https://i.pravatar.cc/150?u=5', 'https://i.pravatar.cc/150?u=6',
    'https://i.pravatar.cc/150?u=7', 'https://i.pravatar.cc/150?u=8'
];

const CommunityPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Global Mind</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            WayV is built by thousands of passionate developers. Connect, contribute, and create together.
          </p>
        </div>

        {/* Action Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
            <a href="#" className="group bg-wayv-card p-6 rounded-2xl border border-white/10 hover:border-wayv-primary/50 transition-all hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-400">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Discord Server</h3>
                <p className="text-slate-400 text-sm">Chat with 40k+ developers, get real-time support, and share your work.</p>
            </a>
             <a href="#" className="group bg-wayv-card p-6 rounded-2xl border border-white/10 hover:border-wayv-primary/50 transition-all hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-slate-500/20 rounded-lg text-slate-300">
                        <Users className="w-6 h-6" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">GitHub Org</h3>
                <p className="text-slate-400 text-sm">Explore the source code, file issues, and submit pull requests.</p>
            </a>
             <a href="#" className="group bg-wayv-card p-6 rounded-2xl border border-white/10 hover:border-wayv-primary/50 transition-all hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-400">
                        <Award className="w-6 h-6" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Ambassador Program</h3>
                <p className="text-slate-400 text-sm">Lead local chapters, organize meetups, and get exclusive swag.</p>
            </a>
        </div>

        {/* Events Section */}
        <div className="mb-24">
            <div className="flex items-center space-x-2 mb-8">
                <Calendar className="w-6 h-6 text-wayv-accent" />
                <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
            </div>
            <div className="space-y-4">
                {events.map((event, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between bg-white/5 border border-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                                <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
                                    event.type === 'Conference' ? 'bg-purple-500/20 text-purple-300' :
                                    event.type === 'Hackathon' ? 'bg-orange-500/20 text-orange-300' :
                                    'bg-blue-500/20 text-blue-300'
                                }`}>
                                    {event.type}
                                </span>
                                <span className="text-sm text-slate-400">{event.date}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                            <p className="text-slate-400 text-sm">{event.description}</p>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6 flex items-center">
                             <div className="text-right mr-6 hidden md:block">
                                <div className="text-sm text-white">{event.location}</div>
                             </div>
                             <button className="px-4 py-2 rounded-lg border border-white/20 text-white text-sm hover:bg-white/10 transition-colors whitespace-nowrap">
                                RSVP
                             </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Reusing existing chart component as a section */}
        <div className="mb-24">
             <Community />
        </div>

        {/* Contributors Grid */}
        <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Top Contributors This Month</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {contributors.map((url, i) => (
                    <div key={i} className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
                        <img 
                            src={url} 
                            alt="Contributor" 
                            className="relative w-16 h-16 rounded-full border-2 border-black object-cover transform transition-transform group-hover:scale-110" 
                        />
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default CommunityPage;