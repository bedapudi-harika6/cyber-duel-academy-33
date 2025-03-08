
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Shield, Clock, AlertCircle, FileText, Database, Terminal } from 'lucide-react';
import GlitchText from '@/components/GlitchText';
import { useToast } from '@/hooks/use-toast';

interface RansomwareChallengeProps {
  isOpen: boolean;
  onClose: () => void;
}

const RansomwareChallenge = ({ isOpen, onClose }: RansomwareChallengeProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  
  const steps = [
    {
      title: "Initial Response",
      description: "A ransomware attack has been detected at City Hospital. Critical patient systems are locked and attackers are demanding 50 BTC. What's your first action?",
      options: [
        { id: 0, text: "Pay the ransom immediately to restore systems" },
        { id: 1, text: "Isolate infected systems to prevent further spread" },
        { id: 2, text: "Try to break the encryption with brute force" },
        { id: 3, text: "Call the FBI and wait for instructions" }
      ],
      correctAnswer: 1
    },
    {
      title: "Threat Analysis",
      description: "You've isolated the infected systems. Your analysis reveals the ransomware is a variant of CryptoLocker. What do you identify as the attack vector?",
      options: [
        { id: 0, text: "Unpatched operating system vulnerability" },
        { id: 1, text: "SQL injection through the patient portal" },
        { id: 2, text: "Phishing email with malicious attachment" },
        { id: 3, text: "Compromised third-party vendor credentials" }
      ],
      correctAnswer: 2
    },
    {
      title: "Data Recovery",
      description: "You've identified that the hospital's backup system was last run 72 hours ago. How do you proceed with data recovery?",
      options: [
        { id: 0, text: "Restore from backups and accept the 72-hour data loss" },
        { id: 1, text: "Attempt partial recovery from snapshots alongside backups" },
        { id: 2, text: "Use shadow copies to recover critical patient data first" },
        { id: 3, text: "Negotiate with attackers for partial decryption key" }
      ],
      correctAnswer: 2
    },
    {
      title: "System Restoration",
      description: "The recovery has begun. Which order do you prioritize system restoration?",
      options: [
        { id: 0, text: "Admin systems → Patient records → Life support monitoring" },
        { id: 1, text: "Patient records → Life support monitoring → Admin systems" },
        { id: 2, text: "Life support monitoring → Patient records → Admin systems" },
        { id: 3, text: "Whatever can be restored fastest first" }
      ],
      correctAnswer: 2
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
        ? "That's the best approach in this situation." 
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
        description: "You've completed the Ransomware Response challenge!",
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
      <DialogContent className="bg-cyber-background max-w-4xl border border-cyber-red/30 text-white">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Shield className="text-cyber-red h-6 w-6" />
            <DialogTitle className="cyber-heading text-xl">
              <GlitchText text="RANSOMWARE RESPONSE CHALLENGE" className="text-cyber-red" />
            </DialogTitle>
          </div>
          <DialogDescription className="text-cyber-muted-text">
            Stop an AI-powered ransomware attack on a hospital. Analyze the malware, contain the threat, and recover encrypted patient data.
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
                        ? 'bg-cyber-red text-white' 
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
          <div className="border border-cyber-red/20 p-4 rounded-md bg-cyber-background-alt">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-cyber-red/20 p-2 rounded-full">
                {currentStep === 0 && <Shield className="text-cyber-red h-5 w-5" />}
                {currentStep === 1 && <AlertCircle className="text-cyber-red h-5 w-5" />}
                {currentStep === 2 && <Database className="text-cyber-red h-5 w-5" />}
                {currentStep === 3 && <Terminal className="text-cyber-red h-5 w-5" />}
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
                      ? 'border-cyber-red bg-cyber-red/10'
                      : 'border-cyber-muted-text/30 hover:border-cyber-red/30 hover:bg-cyber-background'
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
            <Clock className="h-4 w-4 text-cyber-red" />
            <span>Hospital systems critically impacted: {15 - (currentStep * 3)} minutes until patient care affected</span>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleCloseChallenge}
            className="border-cyber-red/30 text-cyber-red hover:bg-cyber-red/10"
          >
            Abort Mission
          </Button>
          <Button 
            onClick={handleNext}
            className="cyber-button-primary"
            disabled={selectedOptions[currentStep] === undefined}
          >
            {currentStep < steps.length - 1 ? 'Next Step' : 'Complete Mission'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RansomwareChallenge;
