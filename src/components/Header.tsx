import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, Unlock, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GlitchText from './GlitchText';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-cyber-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto py-4 px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="relative w-10 h-10 flex items-center justify-center mr-2">
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-red to-cyber-red rounded-md rotate-45 animate-pulse-glow"></div>
                <div className="relative bg-cyber-background-alt p-2 rounded-sm">
                  <div className="text-cyber-red text-xl font-bold orbitron">hX</div>
                </div>
              </div>
              <div className="text-white text-xl font-bold orbitron hidden sm:block">
                <GlitchText text="hackXtreme" className="text-cyber-red" glitchOnHover />
              </div>
            </Link>
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
          
          {/* Login/User Button */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-cyber-muted-text hover:text-cyber-red">
                  <User size={20} />
                </Link>
                <button onClick={handleLogout} className="cyber-button-secondary flex items-center space-x-2 text-xs">
                  <LogOut size={14} />
                  <span>LOGOUT</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="cyber-button-secondary flex items-center space-x-2 text-xs">
                <Lock size={14} />
                <span>LOGIN</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-cyber-background/95 backdrop-blur-md border-t border-cyber-red/30 transition-all duration-300 ${isMenuOpen ? 'max-h-screen animate-fade-in' : 'max-h-0 overflow-hidden'}`}>
        <div className="container mx-auto py-4 px-6">
          <nav className="flex flex-col space-y-4">
            <NavLinks mobile setIsMenuOpen={setIsMenuOpen} />
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-cyber-red block py-2 terminal-text"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }} 
                  className="cyber-button-secondary flex items-center justify-center space-x-2 mt-4 text-xs"
                >
                  <LogOut size={14} />
                  <span>LOGOUT</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="cyber-button-secondary flex items-center justify-center space-x-2 mt-4 text-xs"
                onClick={() => setIsMenuOpen(false)}
              >
                <Lock size={14} />
                <span>LOGIN</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

interface NavLinksProps {
  mobile?: boolean;
  setIsMenuOpen?: (isOpen: boolean) => void;
}

const NavLinks = ({ mobile, setIsMenuOpen }: NavLinksProps) => {
  const { isAuthenticated } = useAuth();
  
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Levels', path: '/#levels' },
    { name: 'AI Mentor', path: '/#ai-mentor' },
    { name: 'Learning Modes', path: '/#learning-modes' },
  ];
  
  if (isAuthenticated) {
    links.push({ name: 'Dashboard', path: '/dashboard' });
  }
  
  const handleClick = () => {
    if (mobile && setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`terminal-text ${
            mobile 
              ? "text-white hover:text-cyber-red block py-2" 
              : "text-cyber-muted-text hover:text-cyber-red transition-colors"
          }`}
          onClick={handleClick}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default Header;
