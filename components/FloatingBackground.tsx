import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const EMOJIS = ["🐷", "❤️", "🐽", "💋", "🔥", "🐖", "💘"];

export const FloatingBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = containerRef.current.children;
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    Array.from(particles).forEach((particle) => {
      // Random initial setup
      gsap.set(particle, {
        x: Math.random() * w,
        y: Math.random() * h,
        scale: 0.8 + Math.random() * 1.5,
        opacity: 0, // Start invisible
        rotation: Math.random() * 360
      });

      // Fade in randomly
      gsap.to(particle, {
        opacity: 0.03 + Math.random() * 0.05, // Very subtle visibility
        duration: 2,
        delay: Math.random() * 2
      });

      // Continuous floating movement
      gsap.to(particle, {
        y: `+=${100 + Math.random() * 200}`, // Drift down or up
        x: `+=${-50 + Math.random() * 100}`, // Drift sideways
        rotation: `+=${45 + Math.random() * 90}`,
        duration: 15 + Math.random() * 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Heartbeat pulsing effect
      gsap.to(particle, {
        scale: "+=0.3",
        duration: 1 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    });

  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i} 
          className="absolute text-5xl filter blur-[2px] select-none text-red-500/50 mix-blend-screen"
        >
            {EMOJIS[i % EMOJIS.length]}
        </div>
      ))}
    </div>
  );
};