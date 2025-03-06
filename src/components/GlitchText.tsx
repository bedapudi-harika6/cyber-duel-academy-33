
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchOnHover?: boolean;
}

const GlitchText = ({ text, className, glitchOnHover = false }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(!glitchOnHover);
  
  useEffect(() => {
    if (!glitchOnHover) {
      const interval = setInterval(() => {
        setIsGlitching(true);
        
        const timeout = setTimeout(() => {
          setIsGlitching(false);
        }, 200);
        
        return () => clearTimeout(timeout);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [glitchOnHover]);
  
  return (
    <span 
      className={cn(
        "inline-block relative",
        isGlitching && "animate-glitch",
        className
      )}
      data-text={text}
      onMouseEnter={glitchOnHover ? () => setIsGlitching(true) : undefined}
      onMouseLeave={glitchOnHover ? () => setIsGlitching(false) : undefined}
    >
      {text}
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 text-cyber-red -translate-x-[2px] -translate-y-[2px] opacity-70 clip-path-top">
            {text}
          </span>
          <span className="absolute top-0 left-0 text-cyber-neon translate-x-[2px] translate-y-[2px] opacity-70 clip-path-bottom">
            {text}
          </span>
        </>
      )}
    </span>
  );
};

export default GlitchText;
