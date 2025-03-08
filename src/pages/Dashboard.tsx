
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import GlitchText from '@/components/GlitchText';
import Terminal from '@/components/Terminal';

const Dashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen bg-cyber-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            <GlitchText text={`WELCOME, ${user.username.toUpperCase()}`} className="text-cyber-red" glitchOnHover />
          </h1>
          <p className="text-cyber-muted-text terminal-text">Security clearance: Level 1 | Role: {user.role}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="cyber-card p-1 rounded-lg overflow-hidden shadow-xl mb-6">
              <div className="bg-cyber-background-alt p-4 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-red via-cyber-red to-cyber-red"></div>
                <h2 className="text-xl font-bold text-white mb-4">Current Mission</h2>
                
                <div className="bg-cyber-background p-4 rounded border border-cyber-border mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-cyber-red terminal-text">MISSION #001</span>
                    <span className="bg-cyber-red/20 text-cyber-red px-2 py-1 rounded text-xs terminal-text">IN PROGRESS</span>
                  </div>
                  <h3 className="text-white text-lg mb-2">Web Application Reconnaissance</h3>
                  <p className="text-cyber-muted-text mb-4">Learn how to gather intelligence on web applications and identify potential vulnerabilities.</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="w-2/3">
                      <div className="h-2 bg-cyber-background-alt rounded-full overflow-hidden">
                        <div className="h-full bg-cyber-red" style={{ width: '35%' }}></div>
                      </div>
                      <div className="text-xs text-cyber-muted-text mt-1">35% Complete</div>
                    </div>
                    <button className="cyber-button-secondary text-xs px-3 py-1">CONTINUE</button>
                  </div>
                </div>
                
                <h3 className="text-white text-lg mb-2">Recommended Next Steps</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-cyber-red mt-2 mr-2"></span>
                    <span className="text-cyber-muted-text">Complete Basic Reconnaissance module</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-cyber-red mt-2 mr-2"></span>
                    <span className="text-cyber-muted-text">Practice OSINT techniques in sandbox environment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1 h-1 rounded-full bg-cyber-red mt-2 mr-2"></span>
                    <span className="text-cyber-muted-text">Attempt Challenge #1: Find the hidden vulnerability</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="cyber-card p-1 rounded-lg overflow-hidden shadow-xl">
              <div className="bg-cyber-background-alt p-4 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-red via-cyber-red to-cyber-red"></div>
                <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                
                <div className="space-y-4">
                  <div className="border-l-2 border-cyber-red pl-4 pb-4">
                    <p className="text-xs text-cyber-muted-text">Today, 14:32</p>
                    <p className="text-white">Completed lesson: "HTTP Headers and their Security Implications"</p>
                  </div>
                  <div className="border-l-2 border-cyber-red pl-4 pb-4">
                    <p className="text-xs text-cyber-muted-text">Today, 11:15</p>
                    <p className="text-white">Earned badge: "Network Scanner"</p>
                  </div>
                  <div className="border-l-2 border-cyber-red pl-4 pb-4">
                    <p className="text-xs text-cyber-muted-text">Yesterday, 19:45</p>
                    <p className="text-white">Started new mission: "Web Application Reconnaissance"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="cyber-card p-1 rounded-lg overflow-hidden shadow-xl mb-6">
              <div className="bg-cyber-background-alt p-4 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-red via-cyber-red to-cyber-red"></div>
                <h2 className="text-xl font-bold text-white mb-4">AI Mentor</h2>
                
                <Terminal 
                  text={[
                    "Connecting to AI Mentor...",
                    "Connection established.",
                    `Hello ${user.username}, I've analyzed your progress.`,
                    "You're making good progress in web reconnaissance.",
                    "I suggest focusing on HTTP header analysis next.",
                    "Would you like me to prepare a practical exercise?",
                  ]} 
                  className="h-[200px]" 
                  typingSpeed={30}
                />
                
                <div className="mt-4 flex space-x-2">
                  <button className="cyber-button-primary text-xs flex-1">YES</button>
                  <button className="cyber-button-secondary text-xs flex-1">NO</button>
                </div>
              </div>
            </div>
            
            <div className="cyber-card p-1 rounded-lg overflow-hidden shadow-xl">
              <div className="bg-cyber-background-alt p-4 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-red via-cyber-red to-cyber-red"></div>
                <h2 className="text-xl font-bold text-white mb-4">Stats</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-cyber-muted-text text-sm">XP</span>
                      <span className="text-cyber-red text-sm">1,240 / 2,000</span>
                    </div>
                    <div className="h-2 bg-cyber-background rounded-full overflow-hidden">
                      <div className="h-full bg-cyber-red" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-cyber-muted-text text-sm">Level</span>
                      <span className="text-cyber-red text-sm">3 / 20</span>
                    </div>
                    <div className="h-2 bg-cyber-background rounded-full overflow-hidden">
                      <div className="h-full bg-cyber-red" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl text-cyber-red font-bold">7</div>
                      <div className="text-xs text-cyber-muted-text">Challenges Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-cyber-red font-bold">4</div>
                      <div className="text-xs text-cyber-muted-text">Badges Earned</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
