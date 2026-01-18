import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const VideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

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
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
        
        <div className="mb-16 text-center z-10">
             <h2 className="font-serif text-4xl md:text-6xl text-offwhite/90 font-light mb-4">
                Frammenti di <span className="text-gold italic">Noi</span>
            </h2>
            <div className="h-[1px] w-24 bg-gold/50 mx-auto mb-6"></div>
            <p className="font-sans text-xs tracking-[0.3em] text-gold uppercase">
                Ricordi in movimento
            </p>
        </div>

        <div 
            ref={videoWrapperRef}
            className="relative w-full max-w-sm md:max-w-md aspect-[9/16] rounded-sm overflow-hidden border border-gold/20 shadow-[0_20px_50px_rgba(176,141,38,0.15)] bg-white"
        >
             {!hasError ? (
                 <video
                    className="w-full h-full object-cover" 
                    autoPlay
                    muted
                    loop
                    playsInline
                    onError={() => setHasError(true)}
                    src="https://drive.google.com/uc?export=download&id=1MNL-uQGy8na_v43ni_8E7AqZz737Q5E8"
                 />
             ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 text-gray-500 p-6 text-center">
                    <p className="text-xs uppercase tracking-widest mb-4">Impossibile caricare</p>
                    <a 
                    href="https://drive.google.com/file/d/1MNL-uQGy8na_v43ni_8E7AqZz737Q5E8/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gold text-gold text-xs font-bold uppercase rounded hover:bg-gold hover:text-white transition-colors"
                    >
                    Vedi Video
                    </a>
                </div>
             )}
             
             {/* Cinematic Vignette - Lighter for Light Theme */}
             <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.1)] mix-blend-multiply"></div>
             
             {/* Overlay Texture */}
             <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};