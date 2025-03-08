import React from 'react';
import { Github, Twitter, Linkedin, Mail, ChevronRight } from 'lucide-react';
import GlitchText from './GlitchText';

const Footer = () => {
  return (
    <footer className="bg-cyber-background-alt border-t border-cyber-neon/20 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center mr-2">
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-neon to-cyber-red rounded-md rotate-45 animate-pulse-glow"></div>
                <div className="relative bg-cyber-background-alt p-2 rounded-sm">
                  <div className="text-cyber-red text-xl font-bold orbitron">hX</div>
                </div>
              </div>
              <div className="text-white text-xl font-bold orbitron">
                <GlitchText text="hackXtreme" className="text-cyber-red" glitchOnHover />
              </div>
            </div>
            <p className="text-cyber-muted-text mb-6">
              An AI-powered, gamified cybersecurity learning platform where players progress through multiple levels, earning badges & points, and switch roles between hacking and defending.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cyber-muted-text hover:text-cyber-neon transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-cyber-muted-text hover:text-cyber-neon transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-cyber-muted-text hover:text-cyber-neon transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-cyber-muted-text hover:text-cyber-neon transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 orbitron">Platform</h3>
            <ul className="space-y-2">
              <FooterLink href="#" text="Levels" />
              <FooterLink href="#" text="AI Mentor" />
              <FooterLink href="#" text="Learning Modes" />
              <FooterLink href="#" text="Leaderboards" />
              <FooterLink href="#" text="Badge System" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4 orbitron">Resources</h3>
            <ul className="space-y-2">
              <FooterLink href="#" text="Documentation" />
              <FooterLink href="#" text="API" />
              <FooterLink href="#" text="Community" />
              <FooterLink href="#" text="Help Center" />
              <FooterLink href="#" text="Privacy Policy" />
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-cyber-neon/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-cyber-muted-text text-sm mb-4 md:mb-0">
            © 2023 hackXtreme. All rights reserved.
          </div>
          
          <div className="flex items-center terminal-text text-xs">
            <a href="#" className="text-cyber-muted-text hover:text-cyber-neon transition-colors mx-3">
              Terms
            </a>
            <a href="#" className="text-cyber-muted-text hover:text-cyber-neon transition-colors mx-3">
              Privacy
            </a>
            <a href="#" className="text-cyber-muted-text hover:text-cyber-neon transition-colors mx-3">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, text }: { href: string, text: string }) => (
  <li>
    <a 
      href={href} 
      className="text-cyber-muted-text hover:text-cyber-neon transition-colors flex items-center group"
    >
      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 mr-0 group-hover:mr-1 group-hover:-ml-1" />
      {text}
    </a>
  </li>
);

export default Footer;
