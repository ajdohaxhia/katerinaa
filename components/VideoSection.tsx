import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const VideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo(videoWrapperRef.current,
            { scale: 0.9, opacity: 0, y: 50 },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "bottom bottom",
                    scrub: 1
                }
            }
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 px-6 md:px-20 bg-background flex flex-col items-center justify-center overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        
        <div className="mb-16 text-center z-10">
             <h2 className="font-serif text-4xl md:text-6xl text-offwhite/90 font-light mb-4">
                Frammenti di <span className="text-gold italic">Noi</span>
            </h2>
            <div className="h-[1px] w-24 bg-gold/50 mx-auto mb-6"></div>
            <p className="font-sans text-xs tracking-[0.3em] text-gold/60 uppercase">
                Ricordi in movimento
            </p>
        </div>

        <div 
            ref={videoWrapperRef}
            className="relative w-full max-w-sm md:max-w-md aspect-[9/16] rounded-sm overflow-hidden border border-gold/20 shadow-[0_0_80px_rgba(212,175,55,0.08)] bg-[#0a0a0a]"
        >
             <video
                className="w-full h-full object-cover" 
                autoPlay
                muted
                loop
                playsInline
                src="https://drive.google.com/uc?export=download&id=1MNL-uQGy8na_v43ni_8E7AqZz737Q5E8"
             />
             
             {/* Cinematic Vignette */}
             <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] mix-blend-multiply"></div>
             
             {/* Overlay Texture */}
             <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
};