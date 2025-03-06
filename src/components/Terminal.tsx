
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface TerminalProps {
  text: string[];
  className?: string;
  typingSpeed?: number;
  prompt?: string;
  autoStart?: boolean;
  infinite?: boolean;
}

const Terminal = ({ 
  text, 
  className, 
  typingSpeed = 50, 
  prompt = ">", 
  autoStart = true,
  infinite = false
}: TerminalProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(autoStart);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Handle typing animation
  useEffect(() => {
    if (!isTyping || currentLine >= text.length) return;
    
    if (currentChar < text[currentLine].length) {
      const timer = setTimeout(() => {
        setCurrentChar(currentChar + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else {
      // Line complete
      setDisplayedLines([...displayedLines, text[currentLine]]);
      
      const timer = setTimeout(() => {
        setCurrentChar(0);
        setCurrentLine(currentLine + 1);
        
        // If we reached the end and infinite is true, start over
        if (currentLine === text.length - 1 && infinite) {
          setCurrentLine(0);
          setDisplayedLines([]);
        }
      }, typingSpeed * 10);
      
      return () => clearTimeout(timer);
    }
  }, [currentChar, currentLine, displayedLines, infinite, isTyping, text, typingSpeed]);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines, currentChar]);

  return (
    <div 
      className={cn(
        "bg-cyber-background-alt p-4 rounded-md border border-cyber-neon/30 terminal-text text-sm overflow-auto relative",
        className
      )}
      ref={terminalRef}
    >
      <div className="scan-line"></div>
      
      {/* Complete lines */}
      {displayedLines.map((line, i) => (
        <div key={i} className="mb-2">
          <span className="text-cyber-neon mr-2">{prompt}</span>
          <span className="text-white">{line}</span>
        </div>
      ))}
      
      {/* Currently typing line */}
      {currentLine < text.length && (
        <div>
          <span className="text-cyber-neon mr-2">{prompt}</span>
          <span className="text-white">{text[currentLine].substring(0, currentChar)}</span>
          <span className="w-2 h-4 bg-cyber-neon inline-block animate-terminal-cursor ml-1"></span>
        </div>
      )}
      
      {!isTyping && !autoStart && (
        <button 
          className="absolute bottom-4 right-4 px-2 py-1 bg-cyber-neon/20 text-cyber-neon text-xs rounded hover:bg-cyber-neon/30 transition-colors"
          onClick={() => setIsTyping(true)}
        >
          Run
        </button>
      )}
    </div>
  );
};

export default Terminal;
