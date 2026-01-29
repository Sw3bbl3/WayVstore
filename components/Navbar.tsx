import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Github, Twitter } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Products', href: '/products' },
  { label: 'Community', href: '/community' },
  { label: 'About', href: '/about' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-wayv-dark/80 backdrop-blur-md border-white/10 py-3'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group cursor-pointer">
            <div className="bg-gradient-to-tr from-wayv-accent to-wayv-primary p-2 rounded-lg group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-shadow">
              <Terminal className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-mono">WayV</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-sm font-medium transition-colors relative after:content-[''] after:absolute after:h-0.5 after:bg-wayv-accent after:left-0 after:-bottom-1 after:transition-all ${
                  isActive(item.href) 
                    ? 'text-white after:w-full' 
                    : 'text-slate-300 hover:text-white after:w-0 hover:after:w-full'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Socials / CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-wayv-card/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-3 text-base font-medium rounded-md ${
                  isActive(item.href) ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 flex space-x-4 px-3">
              <Github className="w-5 h-5 text-slate-400" />
              <Twitter className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;