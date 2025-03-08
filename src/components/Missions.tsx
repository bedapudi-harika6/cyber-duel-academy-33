
import React, { useState } from 'react';
import { Shield, Camera, Network, Flag } from 'lucide-react';
import GlitchText from './GlitchText';
import { cn } from '@/lib/utils';
import RansomwareChallenge from './challenges/RansomwareChallenge';
import DeepfakeChallenge from './challenges/DeepfakeChallenge';
import CriminalNetworkChallenge from './challenges/CriminalNetworkChallenge';

interface MissionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  className?: string;
  onStartMission: () => void;
}

const Mission = ({
  icon,
  title,
  description,
  difficulty,
  className,
  onStartMission
}: MissionProps) => {
  const difficultyColor = {
    easy: 'bg-cyber-green text-black',
    medium: 'bg-cyber-yellow text-black',
    hard: 'bg-cyber-red text-white'
  };
  
  return (
    <div className={cn("cyber-card p-1 rounded-lg overflow-hidden shadow-xl relative group", className)}>
      {/* Highlight border */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyber-neon via-cyber-purple to-cyber-red opacity-30 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="bg-cyber-background-alt p-6 rounded-lg relative overflow-hidden h-full flex flex-col">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-red via-cyber-purple to-cyber-neon"></div>
        
        {/* Mission number badge */}
        <div className="absolute top-4 right-4">
          {/* Badge content if needed */}
        </div>
        
        {/* Mission icon */}
        <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-cyber-background border border-cyber-neon/30 text-cyber-neon">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-3 cyber-heading">
          {title}
        </h3>
        
        <p className="text-cyber-muted-text mb-6 flex-grow">
          {description}
        </p>
        
        <button 
          className="cyber-button-secondary w-full flex items-center justify-center gap-2"
          onClick={onStartMission}
        >
          <Flag size={16} />
          START MISSION
        </button>
      </div>
    </div>
  );
};

const Missions = () => {
  const [ransomwareChallengeOpen, setRansomwareChallengeOpen] = useState(false);
  const [deepfakeChallengeOpen, setDeepfakeChallengeOpen] = useState(false);
  const [criminalNetworkChallengeOpen, setCriminalNetworkChallengeOpen] = useState(false);
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 cyber-bg opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-cyber-red/10 px-3 py-1 rounded-full text-cyber-red text-sm mb-4 terminal-text border border-cyber-red/30">
            High-Priority Missions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 cyber-heading">
            <GlitchText text="Critical Cyber Missions" className="text-cyber-red" />
          </h2>
          <p className="text-cyber-muted-text max-w-2xl mx-auto">
            Complete these urgent missions to test your skills against the most pressing cyber threats facing society today. 
            Each mission simulates a real-world scenario.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Mission 
            icon={<Shield size={24} />} 
            title="Ransomware Response" 
            description="Stop an AI-powered ransomware attack on a hospital. Analyze the malware, contain the threat, and recover encrypted patient data." 
            difficulty="hard" 
            onStartMission={() => setRansomwareChallengeOpen(true)}
          />
          
          <Mission 
            icon={<Camera size={24} />} 
            title="Deepfake Detection" 
            description="Investigate a deepfake phishing scam in a virtual world. Identify digital forgeries and trace the attackers." 
            difficulty="medium"
            onStartMission={() => setDeepfakeChallengeOpen(true)}
          />
          
          <Mission 
            icon={<Network size={24} />} 
            title="Criminal Network Infiltration" 
            description="Hack a simulated criminal network to protect sensitive data from being exploited. Gain access while staying undetected." 
            difficulty="medium"
            onStartMission={() => setCriminalNetworkChallengeOpen(true)}
          />
        </div>
      </div>
      
      {/* Challenge Dialogs */}
      <RansomwareChallenge 
        isOpen={ransomwareChallengeOpen} 
        onClose={() => setRansomwareChallengeOpen(false)} 
      />
      
      <DeepfakeChallenge 
        isOpen={deepfakeChallengeOpen} 
        onClose={() => setDeepfakeChallengeOpen(false)} 
      />
      
      <CriminalNetworkChallenge 
        isOpen={criminalNetworkChallengeOpen} 
        onClose={() => setCriminalNetworkChallengeOpen(false)} 
      />
    </section>
  );
};

export default Missions;
