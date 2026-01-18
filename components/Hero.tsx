import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Slower, more sensual entrance
    tl.fromTo(titleRef.current, 
      { y: 80, opacity: 0, scale: 0.95, filter: "blur(10px)" },
      { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 2.5, ease: "power2.out", delay: 0.2 }
    )
    .fromTo(subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: "power2.out" },
      "-=1.5"
    );

    // Heartbeat animation for the title
    gsap.to(titleRef.current, {
        scale: 1.05,
        color: "#ebdcb2", // subtle shift to lighter gold
        textShadow: "0 0 20px rgba(212, 175, 55, 0.3)",
        repeat: -1,
        yoyo: true,
        duration: 0.8, // Faster, like a heartbeat
        ease: "power1.inOut"
    });

    // Parallax effect on scroll
    gsap.to(containerRef.current, {
      yPercent: 30,
      opacity: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      } 
    });

  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-surface/20 via-background to-background z-0 pointer-events-none" />
      
      <div className="z-10 text-center">
        <h1 
          ref={titleRef}
          className="font-serif text-5xl md:text-8xl lg:text-[9rem] leading-none text-offwhite tracking-widest uppercase opacity-0 transform-gpu mix-blend-exclusion"
        >
          <span className="italic text-gold block md:inline text-[0.6em] align-middle">My</span> Katerina
        </h1>
        <div className="mt-8 md:mt-16 overflow-hidden">
          <p 
            ref={subtitleRef}
            className="font-sans font-thin text-xs md:text-sm tracking-[0.4em] text-gold/80 uppercase opacity-0 flex items-center justify-center gap-2"
          >
            <span>Un'opera senza tempo</span>
            <span className="text-red-800 animate-pulse">❤️</span>
            <span>del tuo Porceddo</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-pulse-slow opacity-30">
        <p className="text-[10px] tracking-widest uppercase text-offwhite/40 mb-2 text-center">Scorri Piano</p>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent mx-auto"></div>
      </div>
    </section>
  );
};