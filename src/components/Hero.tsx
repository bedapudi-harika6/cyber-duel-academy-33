import React, { useEffect, useRef } from 'react';
import GlitchText from './GlitchText';
import Terminal from './Terminal';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    let particles: Particle[] = [];
    const particleCount = 100;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles and connections
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      // Draw connections
      drawConnections(particles, ctx);
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <section className="relative min-h-screen flex items-center overflow-hidden cyber-bg">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-background/70 via-cyber-background to-cyber-background z-10"></div>
      
      <div className="container mx-auto px-6 z-20 pt-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-left">
            <div className="inline-block bg-cyber-neon/10 px-3 py-1 rounded-full text-cyber-neon text-sm mb-4 terminal-text border border-cyber-neon/30">
              AI-Powered Cyber Learning Platform
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 cyber-heading">
              <GlitchText text="hackXtreme" className="text-cyber-red" />
            </h1>
            
            <p className="text-cyber-muted-text text-lg mb-8 max-w-lg">
              Master cybersecurity through gamified learning. Switch between hacking and defending, guided by AI mentorship in real-world scenarios.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="cyber-button-primary">
                START LEARNING
              </button>
              <button className="cyber-button-secondary">
                EXPLORE LEVELS
              </button>
            </div>
            
            <div className="flex items-center mt-8 space-x-2">
              <div className="flex -space-x-2">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-cyber-background bg-gray-800 flex items-center justify-center overflow-hidden">
                    <span className="text-xs text-cyber-red font-bold">{i+1}</span>
                  </div>
                ))}
              </div>
              <span className="text-cyber-muted-text text-sm ml-2">Active cyber experts</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="cyber-card p-1 md:p-2 rounded-lg overflow-hidden shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-red via-cyber-purple to-cyber-neon"></div>
              <div className="bg-cyber-background-alt p-2 rounded-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-2 px-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-cyber-red"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-cyber-green"></div>
                  </div>
                  <div className="text-xs text-gray-400 terminal-text">hackXtreme.exe</div>
                </div>
                
                <Terminal text={["Initializing hackXtreme...", "Establishing secure connection...", "Connection established.", "Welcome to hackXtreme!", "Loading AI Cyber Mentor...", "AI Mentor online and ready to assist.", "Scanning for vulnerabilities...", "10 learning levels detected.", "Challenge database loaded.", "Are you ready to begin your training?", "Choose your path: HACK or DEFEND"]} className="h-[300px] md:h-[350px]" typingSpeed={30} />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-br from-cyber-purple to-cyber-red rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-gradient-to-br from-cyber-neon to-cyber-green rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>
    </section>;
};

// Particle class for background animation
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  canvas: HTMLCanvasElement;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.color = Math.random() > 0.5 ? '#00FFFF' : '#8B00FF';
    this.color = Math.random() > 0.8 ? '#FF003C' : this.color;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > this.canvas.width) this.x = 0;else if (this.x < 0) this.x = this.canvas.width;
    if (this.y > this.canvas.height) this.y = 0;else if (this.y < 0) this.y = this.canvas.height;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
function drawConnections(particles: Particle[], ctx: CanvasRenderingContext2D) {
  const maxDistance = 100;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < maxDistance) {
        ctx.beginPath();
        ctx.strokeStyle = particles[i].color === particles[j].color ? particles[i].color : '#FFFFFF';
        ctx.globalAlpha = 1 - distance / maxDistance;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
}
export default Hero;
