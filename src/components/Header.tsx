
import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, Unlock } from 'lucide-react';
import GlitchText from './GlitchText';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-cyber-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto py-4 px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative w-10 h-10 flex items-center justify-center mr-2">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-neon to-cyber-purple rounded-md rotate-45 animate-pulse-glow"></div>
              <div className="relative bg-cyber-background-alt p-2 rounded-sm">
                <div className="text-cyber-neon text-xl font-bold orbitron">HvD</div>
              </div>
            </div>
            <div className="text-white text-xl font-bold orbitron hidden sm:block">
              <GlitchText text="HACKERS" className="text-cyber-red mr-2" glitchOnHover />
              <span className="text-gray-400">vs</span>
              <GlitchText text="DEFENDERS" className="text-cyber-neon ml-2" glitchOnHover />
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLinks />
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Login Button */}
          <div className="hidden md:flex items-center">
            <button className="cyber-button-secondary flex items-center space-x-2 text-xs">
              <Lock size={14} />
              <span>LOGIN</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-cyber-background/95 backdrop-blur-md border-t border-cyber-neon/30 animate-fade-in">
          <div className="container mx-auto py-4 px-6">
            <nav className="flex flex-col space-y-4">
              <NavLinks mobile setIsMenuOpen={setIsMenuOpen} />
              <button className="cyber-button-secondary flex items-center justify-center space-x-2 mt-4 text-xs">
                <Lock size={14} />
                <span>LOGIN</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinksProps {
  mobile?: boolean;
  setIsMenuOpen?: (isOpen: boolean) => void;
}

const NavLinks = ({ mobile, setIsMenuOpen }: NavLinksProps) => {
  const links = [
    { name: 'Home', path: '#' },
    { name: 'Levels', path: '#levels' },
    { name: 'AI Mentor', path: '#ai-mentor' },
    { name: 'Learning Modes', path: '#learning-modes' },
  ];
  
  const handleClick = () => {
    if (mobile && setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  
  return (
    <>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.path}
          className={`terminal-text ${
            mobile 
              ? "text-white hover:text-cyber-neon block py-2" 
              : "text-cyber-muted-text hover:text-cyber-neon transition-colors"
          }`}
          onClick={handleClick}
        >
          {link.name}
        </a>
      ))}
    </>
  );
};

export default Header;
