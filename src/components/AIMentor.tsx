
import React, { useState } from 'react';
import GlitchText from './GlitchText';
import { Code, ShieldAlert, Zap, Brain, Activity, Bot, RotateCcw } from 'lucide-react';

const AIMentor = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      id: 1,
      title: "AI Mentor Guide",
      description: "Get personalized guidance from our AI mentor that adapts to your learning style and progress. Receive clear explanations of complex cybersecurity concepts with interactive visual aids.",
      icon: <Bot className="text-cyber-neon w-12 h-12" />,
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
    },
    {
      id: 2,
      title: "Adaptive Learning",
      description: "Our AI dynamically adjusts challenge difficulty based on your performance and skills. The system analyzes your strengths and weaknesses to create a personalized learning path.",
      icon: <Brain className="text-cyber-purple w-12 h-12" />,
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=2070"
    },
    {
      id: 3,
      title: "Real-time Code Review",
      description: "Our AI scans your code for security vulnerabilities and suggests fixes with detailed explanations. Learn secure coding practices through practical, hands-on exercises.",
      icon: <Code className="text-cyber-green w-12 h-12" />,
      imageUrl: "https://images.unsplash.com/photo-1544890225-2f3faec4cd60?auto=format&fit=crop&q=80&w=2025"
    },
    {
      id: 4,
      title: "Attack Simulation",
      description: "Train against AI-powered virtual opponents that adapt their tactics based on your defense strategies. Experience realistic attack scenarios in a safe, controlled environment.",
      icon: <Zap className="text-cyber-red w-12 h-12" />,
      imageUrl: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&q=80&w=2080"
    },
    {
      id: 5,
      title: "Instant Feedback",
      description: "Receive immediate, detailed feedback on your solutions with animated explanations of security concepts. Understand why certain approaches work better than others.",
      icon: <Activity className="text-cyber-neon w-12 h-12" />,
      imageUrl: "https://images.unsplash.com/photo-1573164713712-03790a178651?auto=format&fit=crop&q=80&w=2069"
    }
  ];
  
  const currentFeature = features[activeFeature];
  
  return (
    <section 
      id="ai-mentor"
      className="py-24 relative overflow-hidden bg-cyber-background-alt"
    >
      {/* Abstract gradient background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyber-purple blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyber-neon blur-[150px]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-cyber-neon/10 px-3 py-1 rounded-full text-cyber-neon text-sm mb-4 terminal-text border border-cyber-neon/30">
            AI-Powered Learning
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 cyber-heading">
            Your <GlitchText text="AI Cyber Mentor" className="text-cyber-purple" />
          </h2>
          <p className="text-cyber-muted-text max-w-2xl mx-auto">
            Learn with an intelligent AI assistant that guides your cybersecurity journey, provides personalized feedback, and adapts to your skill level.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* AI Visualization */}
          <div className="order-2 md:order-1">
            <div className="cyber-card p-1 md:p-2 rounded-lg overflow-hidden shadow-xl relative h-[400px] md:h-[500px]">
              {/* Bot brain visualization */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-purple to-cyber-neon"></div>
              <div className="bg-cyber-background-alt rounded-lg h-full overflow-hidden relative">
                <div className="w-full h-full opacity-70">
                  <img
                    src={currentFeature.imageUrl}
                    alt={currentFeature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Overlay with scan effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyber-background/90 to-cyber-background/30">
                  <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-20"></div>
                  <div className="h-px w-full bg-cyber-neon/30 absolute animate-scan-line"></div>
                </div>
                
                {/* Feature icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyber-background/80 backdrop-blur-sm rounded-full transform scale-150"></div>
                    <div className="relative z-10 animate-pulse-glow">
                      {currentFeature.icon}
                    </div>
                  </div>
                </div>
                
                {/* Feature information */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-cyber-background to-cyber-background/0">
                  <h3 className="text-white text-xl font-bold mb-2 cyber-heading">{currentFeature.title}</h3>
                  <p className="text-cyber-muted-text text-sm">{currentFeature.description}</p>
                </div>
                
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <g className="opacity-30">
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="#00FFFF" strokeWidth="1" strokeDasharray="10,10" />
                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="#8B00FF" strokeWidth="1" strokeDasharray="10,10" />
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#39FF14" strokeWidth="1" strokeDasharray="10,10" />
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#FF003C" strokeWidth="1" strokeDasharray="10,10" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Features list */}
          <div className="order-1 md:order-2">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={feature.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-cyber-card-bg border border-cyber-neon/30' 
                      : 'hover:bg-cyber-background-alt'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                      <p className="text-cyber-muted-text text-sm">
                        {activeFeature === index ? feature.description : feature.description.substring(0, 60) + "..."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-8">
                <button className="cyber-button-primary w-full">
                  TRY AI MENTOR NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIMentor;
