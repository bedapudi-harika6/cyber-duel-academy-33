
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Network, Terminal, Key, ShieldOff, UserPlus, AlertCircle } from 'lucide-react';
import GlitchText from '@/components/GlitchText';
import { useToast } from '@/hooks/use-toast';

interface CriminalNetworkChallengeProps {
  isOpen: boolean;
  onClose: () => void;
}

const CriminalNetworkChallenge = ({ isOpen, onClose }: CriminalNetworkChallengeProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  
  const steps = [
    {
      title: "Network Reconnaissance",
      description: "You're tasked with infiltrating a simulated criminal network that's planning to exploit sensitive data. What's your first step?",
      options: [
        { id: 0, text: "Launch an aggressive port scan to find all accessible servers" },
        { id: 1, text: "Perform passive reconnaissance to map the network structure" },
        { id: 2, text: "Attempt to crack login credentials for the main server" },
        { id: 3, text: "Deploy malware to establish backdoor access" }
      ],
      correctAnswer: 1
    },
    {
      title: "Access Strategy",
      description: "Your reconnaissance reveals a vulnerable node in their network. How do you proceed to gain access?",
      options: [
        { id: 0, text: "Exploit the vulnerability with a zero-day attack" },
        { id: 1, text: "Use social engineering to acquire legitimate credentials" },
        { id: 2, text: "Deploy a targeted exploit against the vulnerable node" },
        { id: 3, text: "Perform a distributed denial of service attack as a distraction" }
      ],
      correctAnswer: 2
    },
    {
      title: "Maintaining Stealth",
      description: "You've gained access to their system. How do you avoid detection while gathering intelligence?",
      options: [
        { id: 0, text: "Create a hidden user account with admin privileges" },
        { id: 1, text: "Use timestomping to hide your file access patterns" },
        { id: 2, text: "Mirror their normal network traffic patterns and operate during peak hours" },
        { id: 3, text: "Deploy a sophisticated rootkit to mask your presence" }
      ],
      correctAnswer: 2
    },
    {
      title: "Data Extraction",
      description: "You've located the sensitive data. How do you securely extract it without triggering alerts?",
      options: [
        { id: 0, text: "Compress and encrypt the data before extraction" },
        { id: 1, text: "Extract data in small chunks during normal business hours" },
        { id: 2, text: "Use steganography to hide the data in outbound traffic" },
        { id: 3, text: "Create a covert channel using DNS tunneling for data exfiltration" }
      ],
      correctAnswer: 3
    }
  ];
  
  const handleSelectOption = (optionId: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentStep] = optionId;
    setSelectedOptions(newSelectedOptions);
  };
  
  const handleNext = () => {
    // Check if option selected
    if (selectedOptions[currentStep] === undefined) {
      toast({
        title: "Selection required",
        description: "Please select an option before continuing",
        variant: "destructive"
      });
      return;
    }
    
    // Show result toast
    const isCorrect = selectedOptions[currentStep] === steps[currentStep].correctAnswer;
    toast({
      title: isCorrect ? "Correct choice!" : "Not optimal",
      description: isCorrect 
        ? "That's the best approach for network infiltration." 
        : "Not the optimal solution, but you can continue.",
      variant: isCorrect ? "default" : "destructive"
    });
    
    // Move to next step
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Challenge completed
      toast({
        title: "Challenge Completed",
        description: "You've completed the Criminal Network Infiltration challenge!",
      });
      setTimeout(() => {
        onClose();
        setCurrentStep(0);
        setSelectedOptions([]);
      }, 2000);
    }
  };
  
  const handleCloseChallenge = () => {
    setCurrentStep(0);
    setSelectedOptions([]);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleCloseChallenge}>
      <DialogContent className="bg-cyber-background max-w-4xl border border-cyber-neon/30 text-white">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Network className="text-cyber-neon h-6 w-6" />
            <DialogTitle className="cyber-heading text-xl">
              <GlitchText text="CRIMINAL NETWORK INFILTRATION CHALLENGE" className="text-cyber-neon" />
            </DialogTitle>
          </div>
          <DialogDescription className="text-cyber-muted-text">
            Hack a simulated criminal network to protect sensitive data from being exploited. Gain access while staying undetected.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Progress tracker */}
          <div className="flex justify-between px-2 mb-6">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < currentStep 
                      ? 'bg-cyber-green text-black' 
                      : index === currentStep 
                        ? 'bg-cyber-neon text-black' 
                        : 'bg-cyber-background-alt text-cyber-muted-text border border-cyber-muted-text/30'
                  }`}
                >
                  {index < currentStep ? (
                    <span>✓</span>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-16 mt-4 ${
                    index < currentStep ? 'bg-cyber-green' : 'bg-cyber-background-alt'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Current step */}
          <div className="border border-cyber-neon/20 p-4 rounded-md bg-cyber-background-alt">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-cyber-neon/20 p-2 rounded-full">
                {currentStep === 0 && <Network className="text-cyber-neon h-5 w-5" />}
                {currentStep === 1 && <ShieldOff className="text-cyber-neon h-5 w-5" />}
                {currentStep === 2 && <UserPlus className="text-cyber-neon h-5 w-5" />}
                {currentStep === 3 && <Key className="text-cyber-neon h-5 w-5" />}
              </div>
              <h3 className="text-lg font-bold">{steps[currentStep].title}</h3>
            </div>
            <p className="mb-6 text-cyber-muted-text">{steps[currentStep].description}</p>
            
            <div className="space-y-3">
              {steps[currentStep].options.map(option => (
                <div 
                  key={option.id}
                  className={`p-3 rounded-md cursor-pointer border transition-all ${
                    selectedOptions[currentStep] === option.id
                      ? 'border-cyber-neon bg-cyber-neon/10'
                      : 'border-cyber-muted-text/30 hover:border-cyber-neon/30 hover:bg-cyber-background'
                  }`}
                  onClick={() => handleSelectOption(option.id)}
                >
                  {option.text}
                </div>
              ))}
            </div>
          </div>
          
          {/* Time remaining */}
          <div className="flex items-center gap-2 text-sm text-cyber-muted-text">
            <Terminal className="h-4 w-4 text-cyber-neon" />
            <span>Data compromise in progress: {15 - (currentStep * 3)} minutes until protected data is leaked</span>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleCloseChallenge}
            className="border-cyber-neon/30 text-cyber-neon hover:bg-cyber-neon/10"
          >
            Abort Mission
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-cyber-neon hover:bg-cyber-neon/80 text-black"
            disabled={selectedOptions[currentStep] === undefined}
          >
            {currentStep < steps.length - 1 ? 'Next Step' : 'Complete Mission'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CriminalNetworkChallenge;
