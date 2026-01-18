import React, { useState } from 'react';
import gsap from 'gsap';

export const SecretButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const triggerExplosion = (x: number, y: number) => {
    // Create particles
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('fixed', 'w-2', 'h-2', 'rounded-full', 'bg-gold', 'z-50', 'pointer-events-none');
        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        
        // Initial pos
        gsap.set(particle, { x: x, y: y });

        // Animate
        gsap.to(particle, {
            x: x + Math.cos(angle) * velocity,
            y: y + Math.sin(angle) * velocity,
            opacity: 0,
            scale: 0,
            duration: 0.8 + Math.random() * 0.5,
            ease: "power2.out",
            onComplete: () => particle.remove()
        });
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    triggerExplosion(e.clientX, e.clientY);
    setTimeout(() => setIsOpen(true), 300);
  };

  return (
    <div className="flex flex-col items-center gap-6">
        {/* Standard Copyright Text (Low opacity) */}
        <p className="text-[10px] tracking-widest uppercase opacity-30 font-serif">
            © 2026 Porceddo & Porcedda
        </p>

        {/* Highly Visible Trigger Button */}
        <button 
            onClick={handleClick}
            className="group relative px-8 py-3 bg-transparent border border-gold text-gold rounded-full overflow-hidden transition-all duration-300 hover:bg-gold hover:text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            aria-label="Secret Surprise"
        >
            <span className="relative z-10 flex items-center gap-2 font-sans text-xs font-bold tracking-[0.2em] uppercase">
                Sorpresa per te
                <span className="group-hover:animate-bounce">🎁</span>
            </span>
        </button>

        {/* Modal Overlay - Frameless & Full */}
        {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-[fadeIn_0.5s_ease-out]">
                
                {/* Close Trigger (Entire background) */}
                <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

                {/* Content Container - No borders, no padding */}
                <div className="relative z-10 w-full h-full md:max-w-4xl md:max-h-[85vh] flex flex-col items-center justify-center p-4">
                    
                    {/* Image Container - Frameless & Full Image */}
                    <div className="relative w-full h-full shadow-[0_0_100px_rgba(212,175,55,0.15)] animate-[scaleIn_0.6s_cubic-bezier(0.16,1,0.3,1)]">
                         <img 
                            src="https://i.ibb.co/WWmfDMkj/sorpresa.avif" 
                            alt="Sorpresa per te"
                            className="w-full h-full object-contain rounded-sm"
                        />
                        
                        {/* Overlay Text */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black via-black/80 to-transparent text-center">
                             <h3 className="font-serif text-3xl md:text-5xl text-gold italic mb-2 drop-shadow-lg leading-tight">
                                un nudino solo per te <br/> ahahah
                            </h3>
                        </div>
                    </div>

                    <button 
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 md:-right-12 md:top-0 text-white/30 hover:text-white p-2"
                    >
                        ✕
                    </button>
                </div>
            </div>
        )}

        <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        `}</style>
    </div>
  );
};