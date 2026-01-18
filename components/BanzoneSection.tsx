import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BanzoneSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);
  
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom bottom",
                scrub: 1
            }
        });

        tl.fromTo(contentRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 1 }
        )
        .fromTo(videoRef.current, 
            { x: 50, opacity: 0, scale: 0.9 },
            { x: 0, opacity: 1, scale: 1, duration: 1 },
            "<"
        );
        
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const toggleAudio = () => {
    if (videoElRef.current) {
        videoElRef.current.muted = !videoElRef.current.muted;
        setIsMuted(videoElRef.current.muted);
        if (!videoElRef.current.muted) {
            videoElRef.current.play().catch(e => console.log("Playback error", e));
        }
    }
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <section ref={containerRef} className="relative py-32 px-6 md:px-20 bg-background overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
            
            {/* Text Content */}
            <div ref={contentRef} className="flex-1 text-center md:text-right order-2 md:order-1 relative z-10">
                 <h2 className="font-serif text-5xl md:text-7xl text-offwhite/90 font-light mb-6">
                    La tua <br/>
                    <span className="text-blood italic font-bold">Banzone</span>
                </h2>
                <p className="font-sans text-sm md:text-base leading-relaxed text-gray-500 mb-8 max-w-md ml-auto">
                    Il ritmo che scorre nelle tue vene. <br/>
                    Un inno alla tua energia, Porcedda.
                </p>
                
                {/* Decorative Line */}
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-blood to-transparent mx-auto md:ml-auto md:mr-0 mb-8"></div>
                
                {/* Audio Toggle Button (External) */}
                <button 
                    onClick={toggleAudio}
                    className="group inline-flex items-center gap-3 px-6 py-3 border border-blood/30 rounded-full hover:bg-blood hover:text-white transition-all duration-300"
                >
                    <span className="text-lg">{isMuted ? '🔇' : '🔊'}</span>
                    <span className="text-xs font-bold uppercase tracking-widest">
                        {isMuted ? 'Attiva Audio' : 'Disattiva'}
                    </span>
                </button>
            </div>

            {/* Video Container */}
            <div ref={videoRef} className="flex-1 order-1 md:order-2 w-full flex justify-center md:justify-start">
                <div className="relative w-full max-w-xs aspect-[9/16] rounded-t-full rounded-b-full md:rounded-2xl overflow-hidden border-[6px] border-white shadow-[0_30px_60px_rgba(138,0,0,0.1)] bg-gray-100 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out group">
                     
                     {!hasError ? (
                         <video
                            ref={videoElRef}
                            className="w-full h-full object-cover" 
                            autoPlay
                            muted
                            loop
                            playsInline
                            onError={handleError}
                            src="https://drive.google.com/uc?export=download&id=1pDXejnRbUaDj7WDIV2mrRVZ8veHEtfqw"
                         />
                     ) : (
                         /* Fallback if Drive blocks embed */
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 text-gray-500 p-6 text-center">
                             <p className="text-xs uppercase tracking-widest mb-4">Video non caricato</p>
                             <a 
                                href="https://drive.google.com/file/d/1pDXejnRbUaDj7WDIV2mrRVZ8veHEtfqw/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blood text-white text-xs font-bold uppercase rounded hover:bg-red-900 transition-colors"
                             >
                                Apri su Drive
                             </a>
                         </div>
                     )}
                     
                     {/* Overlay Shine */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none mix-blend-overlay"></div>
                </div>
            </div>
        </div>
        
        {/* Background blobs for depth */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blood/5 rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
};