
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Terminal, Shield, FileText } from 'lucide-react';

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  levelTitle: string;
  resources: {
    id: string;
    title: string;
    description: string;
    content: string;
    icon: 'book' | 'terminal' | 'shield' | 'file';
  }[];
}

const ResourcesModal = ({ isOpen, onClose, levelTitle, resources }: ResourcesModalProps) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'book':
        return <Book className="h-5 w-5" />;
      case 'terminal':
        return <Terminal className="h-5 w-5" />;
      case 'shield':
        return <Shield className="h-5 w-5" />;
      case 'file':
        return <FileText className="h-5 w-5" />;
      default:
        return <Book className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cyber-background max-w-4xl border border-cyber-neon/30 text-white">
        <DialogHeader>
          <DialogTitle className="cyber-heading text-xl text-cyber-neon">
            {levelTitle} Resources
          </DialogTitle>
          <DialogDescription className="text-cyber-muted-text">
            Master these key skills to progress in your cybersecurity journey
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={resources[0]?.id} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            {resources.map((resource) => (
              <TabsTrigger 
                key={resource.id} 
                value={resource.id}
                className="data-[state=active]:bg-cyber-neon/20 data-[state=active]:text-cyber-neon"
              >
                <div className="flex items-center gap-2">
                  {renderIcon(resource.icon)}
                  <span>{resource.title}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {resources.map((resource) => (
            <TabsContent key={resource.id} value={resource.id} className="space-y-4">
              <div className="border border-cyber-neon/20 rounded-md p-4 bg-cyber-background-alt">
                <h3 className="text-lg font-bold mb-2 text-cyber-neon">{resource.title}</h3>
                <p className="text-sm text-cyber-muted-text mb-4">{resource.description}</p>
                <div className="prose prose-invert max-w-none text-cyber-muted-text">
                  <div dangerouslySetInnerHTML={{ __html: resource.content }} />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ResourcesModal;
