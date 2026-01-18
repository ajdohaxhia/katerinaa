import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { CoffeeRitual } from './components/CoffeeRitual';
import { SecretButton } from './components/SecretButton';
import { FloatingBackground } from './components/FloatingBackground';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Track mouse for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    // Updated text color class will use the new definition of offwhite (which is now dark)
    <div className="relative min-h-screen bg-background text-offwhite font-sans selection:bg-blood/20 selection:text-blood">
      {/* Noise Overlay */}
      <div className="noise-bg"></div>

      {/* Floating Emojis (Pigs & Hearts) */}
      <FloatingBackground />

      {/* Dynamic Spotlight Effect - Adapted for Light Theme */}
      {/* Red accent shadow */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 mix-blend-multiply opacity-20"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(138, 0, 0, 0.08), transparent 40%)`
        }}
      />
      {/* Gold accent shadow */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 mix-blend-multiply opacity-30"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(176, 141, 38, 0.15), transparent 40%)`
        }}
      />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Gallery />
        <CoffeeRitual />
        
        <footer className="py-32 text-center">
           <SecretButton />
        </footer>
      </main>
    </div>
  );
}