import React from 'react';
import { Terminal } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-wayv-dark border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="h-6 w-6 text-wayv-primary" />
              <span className="text-xl font-bold text-white font-mono">WayV</span>
            </div>
            <p className="text-slate-500 text-sm">
              Empowering the next generation of creators with open source tools built for performance and scale.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-wayv-accent transition-colors">WaveOS</a></li>
              <li><a href="#" className="hover:text-wayv-accent transition-colors">Wave Engine</a></li>
              <li><a href="#" className="hover:text-wayv-accent transition-colors">Wavium UI</a></li>
              <li><a href="#" className="hover:text-wayv-accent transition-colors">Enterprise</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-wayv-accent transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-wayv-accent transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-wayv-accent transition-colors">Community Forum</a></li>
              <li><a href="#" className="hover:text-wayv-accent transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-wayv-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-wayv-accent transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-wayv-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-wayv-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} WayV Technology Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-slate-600">
            {/* Social Icons Placeholder */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;