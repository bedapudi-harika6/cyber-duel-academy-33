
import React, { useState } from 'react';
import Badge, { BadgeType } from './Badge';
import GlitchText from './GlitchText';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft, Trophy, Award, Lock } from 'lucide-react';

const levels = [
  {
    id: 1,
    title: "Cyber Explorer",
    type: "explorer" as BadgeType,
    description: "Master the basics of cybersecurity and ethical hacking",
    skills: ["Cybersecurity Fundamentals", "Ethical Hacking Principles", "Basic Threat Models"]
  },
  {
    id: 2,
    title: "Bug Hunter",
    type: "bug-hunter" as BadgeType,
    description: "Learn vulnerability scanning and weak password attacks",
    skills: ["Vulnerability Scanning", "Password Cracking", "Security Misconfiguration"]
  },
  {
    id: 3,
    title: "Code Defender",
    type: "secure-coder" as BadgeType,
    description: "AI-guided coding exercises for secure programming",
    skills: ["Secure Coding Practices", "Input Validation", "Error Handling"]
  },
  {
    id: 4,
    title: "Firewall Guardian",
    type: "network-defender" as BadgeType,
    description: "Hands-on firewall configuration & traffic monitoring",
    skills: ["Firewall Configuration", "Traffic Analysis", "Network Security"]
  },
  {
    id: 5,
    title: "Ethical Hacker",
    type: "white-hat" as BadgeType,
    description: "Exploit and patch common vulnerabilities",
    skills: ["Penetration Testing", "Vulnerability Exploitation", "Security Patching"]
  },
  {
    id: 6,
    title: "Security Analyst",
    type: "soc-analyst" as BadgeType,
    description: "Real-world attack detection & incident response",
    skills: ["Attack Detection", "Incident Response", "Threat Analysis"]
  },
  {
    id: 7,
    title: "Cryptography Master",
    type: "crypto-warrior" as BadgeType,
    description: "Hashing, encryption, and decryption challenges",
    skills: ["Encryption Algorithms", "Key Management", "Cryptographic Attacks"]
  },
  {
    id: 8,
    title: "Cyber Warrior",
    type: "red-team" as BadgeType,
    description: "AI-generated Capture The Flag (CTF) battles",
    skills: ["CTF Challenges", "Red Team Operations", "Advanced Exploitation"]
  },
  {
    id: 9,
    title: "Threat Hunter",
    type: "threat-analyst" as BadgeType,
    description: "Advanced malware analysis & threat intelligence",
    skills: ["Malware Analysis", "Threat Intelligence", "Advanced Persistent Threats"]
  },
  {
    id: 10,
    title: "Cyber Legend",
    type: "cyber-master" as BadgeType,
    description: "AI-powered real-world attack-defense scenarios",
    skills: ["Advanced Attack Vectors", "Defense-in-Depth", "Zero-Day Mitigation"]
  }
];

const LevelProgression = () => {
  const [activeLevel, setActiveLevel] = useState(1);
  const currentLevel = levels.find(level => level.id === activeLevel);
  
  const handlePrev = () => {
    setActiveLevel(prev => Math.max(prev - 1, 1));
  };
  
  const handleNext = () => {
    setActiveLevel(prev => Math.min(prev + 1, levels.length));
  };
  
  return (
    <section 
      id="levels"
      className="py-24 relative overflow-hidden"
    >
      {/* Background grid effect */}
      <div className="absolute inset-0 cyber-bg opacity-20"></div>
      
      {/* Section header */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-cyber-neon/10 px-3 py-1 rounded-full text-cyber-neon text-sm mb-4 terminal-text border border-cyber-neon/30">
            Level-Based Progression
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 cyber-heading">
            Master <GlitchText text="10 Cyber Levels" className="text-cyber-neon" />
          </h2>
          <p className="text-cyber-muted-text max-w-2xl mx-auto">
            Progress from beginner to cyber expert through our gamified learning path. Each level unlocks new challenges and earns you prestigious badges.
          </p>
        </div>
        
        {/* Horizontal level progression bar for mobile and desktop */}
        <div className="relative mb-16 px-4">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-cyber-neon/20 -translate-y-1/2"></div>
          
          <div className="flex justify-between relative">
            {levels.map((level, index) => {
              const isActive = level.id === activeLevel;
              const isUnlocked = level.id <= 3;
              
              return (
                <div 
                  key={level.id}
                  className={cn(
                    "flex flex-col items-center transition-all duration-300 cursor-pointer relative",
                    isActive ? "scale-110 z-10" : "opacity-70 hover:opacity-100"
                  )}
                  onClick={() => setActiveLevel(level.id)}
                >
                  <div 
                    className={cn(
                      "relative w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center mb-2 transition-all",
                      isActive 
                        ? "bg-cyber-neon border-cyber-neon text-black" 
                        : isUnlocked 
                          ? "bg-cyber-background border-cyber-neon/50 text-cyber-neon" 
                          : "bg-cyber-background-alt border-cyber-neon/20 text-cyber-muted-text"
                    )}
                  >
                    {isUnlocked ? level.id : <Lock className="w-4 h-4" />}
                    
                    {/* Connecting line */}
                    {index < levels.length - 1 && (
                      <div className={cn(
                        "absolute top-1/2 left-full w-[calc(100%-2rem)] h-0.5",
                        level.id < 3 ? "bg-cyber-neon" : "bg-cyber-neon/20"
                      )}></div>
                    )}
                  </div>
                  
                  <span className={cn(
                    "text-xs terminal-text absolute top-12 whitespace-nowrap",
                    isActive ? "text-cyber-neon" : "text-cyber-muted-text",
                    "hidden md:block" // Hide labels on mobile
                  )}>
                    {level.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Current level details card */}
        <div className="cyber-card relative overflow-hidden mx-auto max-w-4xl">
          {/* Progression indicator */}
          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyber-neon to-cyber-neon" style={{ width: `${(activeLevel / levels.length) * 100}%` }}></div>
          
          {/* Mobile level switcher */}
          <div className="flex items-center justify-between bg-cyber-background-alt p-3">
            <button
              onClick={handlePrev}
              disabled={activeLevel === 1}
              className={cn(
                "p-2 rounded transition-colors",
                activeLevel === 1 ? "text-gray-600 cursor-not-allowed" : "text-cyber-neon hover:bg-cyber-neon/10"
              )}
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center">
              <Badge 
                type={currentLevel?.type || 'explorer'}
                level={currentLevel?.id || 1}
                unlocked={currentLevel?.id! <= 3}
                size="sm"
                showLabel={false}
              />
              <span className="ml-2 text-white font-medium text-sm terminal-text">
                Level {currentLevel?.id}: {currentLevel?.title}
              </span>
            </div>
            
            <button
              onClick={handleNext}
              disabled={activeLevel === levels.length}
              className={cn(
                "p-2 rounded transition-colors",
                activeLevel === levels.length ? "text-gray-600 cursor-not-allowed" : "text-cyber-neon hover:bg-cyber-neon/10"
              )}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex justify-center">
                <Badge 
                  type={currentLevel?.type || 'explorer'}
                  level={currentLevel?.id || 1}
                  unlocked={currentLevel?.id! <= 3}
                  size="lg"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold cyber-heading mb-3 text-center md:text-left">
                  Level {currentLevel?.id}: {currentLevel?.title}
                </h3>
                
                <p className="text-cyber-muted-text mb-6">
                  {currentLevel?.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3 terminal-text flex items-center">
                    <span className="inline-block w-2 h-2 bg-cyber-neon rounded-full mr-2"></span>
                    Key Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentLevel?.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-cyber-background px-3 py-1 rounded-full text-xs border border-cyber-neon/30 text-cyber-neon"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <button className={cn(
                    "cyber-button-primary", 
                    currentLevel?.id! <= 3 ? "" : "opacity-50 cursor-not-allowed"
                  )}>
                    {currentLevel?.id! <= 3 ? "START LEVEL" : "LOCKED"}
                  </button>
                  
                  {currentLevel?.id! <= 3 && (
                    <button className="cyber-button-secondary flex items-center">
                      <Trophy size={16} className="mr-2" />
                      VIEW CHALLENGES
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress footer */}
          <div className="bg-cyber-background-alt p-4 border-t border-cyber-neon/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center">
                <Award size={16} className="text-cyber-neon mr-2" />
                <span className="text-sm text-cyber-muted-text">
                  <span className="text-white">3 of 10</span> levels unlocked
                </span>
              </div>
              <div className="text-sm text-cyber-muted-text flex items-center">
                <div className="w-32 h-1.5 bg-cyber-neon/20 rounded-full mr-3 overflow-hidden">
                  <div className="h-full bg-cyber-neon rounded-full" style={{ width: '70%' }}></div>
                </div>
                <span className="text-cyber-neon">250 XP</span> needed for next level
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LevelProgression;
