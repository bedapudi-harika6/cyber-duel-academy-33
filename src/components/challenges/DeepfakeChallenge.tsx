
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, Camera, Search, ScanFace, UserX, AlertCircle } from 'lucide-react';
import GlitchText from '@/components/GlitchText';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface DeepfakeChallengeProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeepfakeChallenge = ({ isOpen, onClose }: DeepfakeChallengeProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  
  const steps = [
    {
      title: "Identifying the Threat",
      description: "Your company's CEO appears in a video announcing an emergency stock sell-off. The video was sent to all employees. What initial analysis would you perform?",
      options: [
        { id: 0, text: "Immediately notify employees it's a scam" },
        { id: 1, text: "Analyze video metadata and digital artifacts" },
        { id: 2, text: "Call the CEO to confirm the announcement" },
        { id: 3, text: "Check if the stock market is reacting to the news" }
      ],
      correctAnswer: 1
    },
    {
      title: "Technical Analysis",
      description: "Initial analysis suggests the video may be fake. Which technical approach would be most effective to confirm your suspicions?",
      options: [
        { id: 0, text: "Run the video through a facial inconsistency detector" },
        { id: 1, text: "Check for unnatural blinking patterns and facial expressions" },
        { id: 2, text: "Compare audio frequencies with verified CEO recordings" },
        { id: 3, text: "All of the above in a combined forensic analysis" }
      ],
      correctAnswer: 3
    },
    {
      title: "Tracing the Source",
      description: "The video is confirmed to be a sophisticated deepfake. How do you trace its origin?",
      options: [
        { id: 0, text: "Analyze email headers from the distribution message" },
        { id: 1, text: "Search for similar deepfakes on known criminal forums" },
        { id: 2, text: "Examine server logs for suspicious access patterns" },
        { id: 3, text: "Coordinated approach using network forensics and header analysis" }
      ],
      correctAnswer: 3
    },
    {
      title: "Mitigation Strategy",
      description: "You've identified the source of the attack. What's your recommended mitigation strategy?",
      options: [
        { id: 0, text: "Issue a company-wide alert without technical details" },
        { id: 1, text: "Release only a brief statement acknowledging a 'technical issue'" },
        { id: 2, text: "Comprehensive response: internal communication, public statement, and technical safeguards" },
        { id: 3, text: "Keep the incident confidential while implementing security measures" }
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
        ? "That's the best approach for deepfake detection." 
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
        description: "You've completed the Deepfake Detection challenge!",
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
      <DialogContent className="bg-cyber-background max-w-4xl border border-cyber-purple/30 text-white">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Camera className="text-cyber-purple h-6 w-6" />
            <DialogTitle className="cyber-heading text-xl">
              <GlitchText text="DEEPFAKE DETECTION CHALLENGE" className="text-cyber-purple" />
            </DialogTitle>
          </div>
          <DialogDescription className="text-cyber-muted-text">
            Investigate a deepfake phishing scam in a virtual world. Identify digital forgeries and trace the attackers.
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
                        ? 'bg-cyber-purple text-white' 
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
          <div className="border border-cyber-purple/20 p-4 rounded-md bg-cyber-background-alt">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-cyber-purple/20 p-2 rounded-full">
                {currentStep === 0 && <Eye className="text-cyber-purple h-5 w-5" />}
                {currentStep === 1 && <ScanFace className="text-cyber-purple h-5 w-5" />}
                {currentStep === 2 && <Search className="text-cyber-purple h-5 w-5" />}
                {currentStep === 3 && <AlertCircle className="text-cyber-purple h-5 w-5" />}
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
                      ? 'border-cyber-purple bg-cyber-purple/10'
                      : 'border-cyber-muted-text/30 hover:border-cyber-purple/30 hover:bg-cyber-background'
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
            <Camera className="h-4 w-4 text-cyber-purple" />
            <span>Phishing campaign active: {15 - (currentStep * 3)} minutes until more employees are affected</span>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleCloseChallenge}
            className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
          >
            Abort Mission
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-cyber-purple hover:bg-cyber-purple/80 text-white"
            disabled={selectedOptions[currentStep] === undefined}
          >
            {currentStep < steps.length - 1 ? 'Next Step' : 'Complete Mission'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeepfakeChallenge;
