
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Target, CheckCircle, Clock, Trophy, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: string;
  xpReward: number;
  completed: boolean;
  locked: boolean;
}

interface ChallengesModalProps {
  isOpen: boolean;
  onClose: () => void;
  levelTitle: string;
  challenges: Challenge[];
}

const ChallengesModal = ({ isOpen, onClose, levelTitle, challenges }: ChallengesModalProps) => {
  const { toast } = useToast();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  
  const handleStartChallenge = (challenge: Challenge) => {
    if (challenge.locked) {
      toast({
        title: "Challenge Locked",
        description: "Complete previous challenges to unlock this one.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedChallenge(challenge);
    toast({
      title: "Challenge Started",
      description: `You've started the ${challenge.title} challenge!`,
    });
  };
  
  const difficultyColor = {
    easy: 'bg-cyber-green text-black',
    medium: 'bg-cyber-yellow text-black',
    hard: 'bg-cyber-red text-white'
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cyber-background max-w-4xl border border-cyber-neon/30 text-white">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Target className="text-cyber-neon h-6 w-6" />
            <DialogTitle className="cyber-heading text-xl text-cyber-neon">
              {levelTitle} Challenges
            </DialogTitle>
          </div>
          <DialogDescription className="text-cyber-muted-text">
            Complete these challenges to earn XP and advance to the next level
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {challenges.map((challenge) => (
            <div 
              key={challenge.id}
              className={cn(
                "border rounded-md p-4 transition-all",
                challenge.completed 
                  ? "border-cyber-green/30 bg-cyber-green/10" 
                  : challenge.locked 
                    ? "border-cyber-muted-text/30 bg-cyber-background-alt opacity-70" 
                    : "border-cyber-neon/30 bg-cyber-background-alt hover:bg-cyber-neon/5 cursor-pointer"
              )}
              onClick={() => !challenge.completed && handleStartChallenge(challenge)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {challenge.locked && <Lock className="h-4 w-4 text-cyber-muted-text" />}
                    {challenge.completed && <CheckCircle className="h-4 w-4 text-cyber-green" />}
                    <h3 className={cn(
                      "font-bold",
                      challenge.completed ? "text-cyber-green" : challenge.locked ? "text-cyber-muted-text" : "text-white"
                    )}>
                      {challenge.title}
                    </h3>
                    <span 
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        difficultyColor[challenge.difficulty]
                      )}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-cyber-muted-text mb-3">{challenge.description}</p>
                  
                  <div className="flex items-center text-xs text-cyber-muted-text gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{challenge.timeEstimate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-3 w-3 text-cyber-neon" />
                      <span>{challenge.xpReward} XP</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  variant={challenge.completed ? "outline" : "default"}
                  className={cn(
                    challenge.completed 
                      ? "border-cyber-green text-cyber-green hover:bg-cyber-green/10" 
                      : challenge.locked 
                        ? "bg-cyber-background-alt text-cyber-muted-text cursor-not-allowed" 
                        : "cyber-button-primary text-xs"
                  )}
                  disabled={challenge.locked}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartChallenge(challenge);
                  }}
                >
                  {challenge.completed ? "COMPLETED" : challenge.locked ? "LOCKED" : "START"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengesModal;
