
import React from 'react';
import { cn } from "@/lib/utils";
import { Shield, ShieldCheck, Bug, Code, Shield as Firewall, Zap, Binary, Flag, Search, Award } from 'lucide-react';

export type BadgeType = 
  | 'explorer'
  | 'bug-hunter'
  | 'secure-coder'
  | 'network-defender'
  | 'white-hat'
  | 'soc-analyst'
  | 'crypto-warrior'
  | 'red-team'
  | 'threat-analyst'
  | 'cyber-master';

interface BadgeProps {
  type: BadgeType;
  level: number;
  unlocked?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const badgeConfig = {
  'explorer': {
    icon: Shield,
    title: 'Cyber Explorer',
    color: 'from-blue-400 to-teal-400',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-400/30',
  },
  'bug-hunter': {
    icon: Bug,
    title: 'Bug Hunter',
    color: 'from-orange-400 to-yellow-400',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-400/30',
  },
  'secure-coder': {
    icon: Code,
    title: 'Code Defender',
    color: 'from-green-400 to-emerald-400',
    textColor: 'text-green-400',
    borderColor: 'border-green-400/30',
  },
  'network-defender': {
    icon: Firewall,
    title: 'Firewall Guardian',
    color: 'from-blue-500 to-indigo-500',
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500/30',
  },
  'white-hat': {
    icon: Zap,
    title: 'Ethical Hacker',
    color: 'from-violet-500 to-purple-500',
    textColor: 'text-violet-500',
    borderColor: 'border-violet-500/30',
  },
  'soc-analyst': {
    icon: ShieldCheck,
    title: 'Security Analyst',
    color: 'from-red-500 to-pink-500',
    textColor: 'text-red-500',
    borderColor: 'border-red-500/30',
  },
  'crypto-warrior': {
    icon: Binary,
    title: 'Cryptography Master',
    color: 'from-cyan-400 to-blue-500',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-400/30',
  },
  'red-team': {
    icon: Flag,
    title: 'Cyber Warrior',
    color: 'from-cyber-red to-cyber-purple',
    textColor: 'text-cyber-red',
    borderColor: 'border-cyber-red/30',
  },
  'threat-analyst': {
    icon: Search,
    title: 'Threat Hunter',
    color: 'from-amber-500 to-orange-600',
    textColor: 'text-amber-500',
    borderColor: 'border-amber-500/30',
  },
  'cyber-master': {
    icon: Award,
    title: 'Cyber Legend',
    color: 'from-cyber-neon to-cyber-green',
    textColor: 'text-cyber-neon',
    borderColor: 'border-cyber-neon/30',
  },
};

const Badge = ({ 
  type, 
  level, 
  unlocked = false, 
  className, 
  size = 'md',
  showLabel = true,
}: BadgeProps) => {
  const config = badgeConfig[type];
  const IconComponent = config.icon;
  
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-xl',
    lg: 'w-24 h-24 text-3xl',
  };
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div 
        className={cn(
          "relative rounded-full flex items-center justify-center",
          sizeClasses[size],
          unlocked ? `bg-gradient-to-br ${config.color}` : "bg-gray-700",
          unlocked ? "shadow-lg" : "",
        )}
      >
        <IconComponent className={cn(
          "w-1/2 h-1/2",
          unlocked ? "text-white" : "text-gray-500"
        )} />
        
        {/* Level indicator */}
        <div className={cn(
          "absolute -bottom-1 -right-1 rounded-full flex items-center justify-center text-xs font-bold",
          "w-6 h-6 border-2 border-cyber-background",
          unlocked ? "bg-cyber-background text-white" : "bg-gray-800 text-gray-500"
        )}>
          {level}
        </div>
        
        {/* Glow effect for unlocked badges */}
        {unlocked && (
          <div className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-br",
            config.color,
            "opacity-50 blur-md -z-10"
          )}></div>
        )}
      </div>
      
      {showLabel && (
        <span className={cn(
          "mt-2 text-xs font-medium",
          unlocked ? config.textColor : "text-gray-500"
        )}>
          {config.title}
        </span>
      )}
    </div>
  );
};

export default Badge;
