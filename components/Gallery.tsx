import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type GalleryItem = {
  id: number;
  type: 'image' | 'video';
  label: string;
  caption: string;
  src: string;
};

const galleryItems: GalleryItem[] = [
  { id: 1, type: 'image', label: "Desiderio", caption: "Il primo sguardo.", src: "https://lh3.googleusercontent.com/d/1yWZ9vzDtz23L6TG8NqJntYkQEwvg_m0K" }, 
  { id: 2, type: 'image', label: "Intimità", caption: "Solo noi due.", src: "https://lh3.googleusercontent.com/d/1kCC3OVFEUrK-kdl9AVKWB87y_dEOpR-f" }, 
  { id: 3, type: 'image', label: "Passione", caption: "Il fuoco che non si spegne.", src: "https://lh3.googleusercontent.com/d/1jt5qz1g-3asg-dk4ck0imEv0OtCSoItS" }, 
  { id: 4, type: 'image', label: "Ricordi", caption: "Momenti solo nostri.", src: "https://lh3.googleusercontent.com/d/1hWJSPYo2U8qRvRX_vDv0UXF6EdTKWVgQ" },
  { id: 5, type: 'image', label: "Eternità", caption: "Io e te, Porcedda.", src: "https://lh3.googleusercontent.com/d/17hs7djAhu4EHlWOtkhhkDfyYF_0iL4N4" },
];

export const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable horizontal scroll pinning on larger screens to avoid mobile scroll trap issues
    if (window.innerWidth > 768) {
        const ctx = gsap.context(() => {
            const totalWidth = sliderRef.current!.scrollWidth;
            const windowWidth = window.innerWidth;
            
            gsap.to(sliderRef.current, {
                x: () => -(totalWidth - windowWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${totalWidth}`,
                    pin: true,
                    scrub: 1, 
                    invalidateOnRefresh: true,
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-background py-32 flex flex-col justify-center overflow-hidden">
        <div className="px-6 md:px-20 mb-20 relative z-10">
            <h2 className="font-serif text-5xl md:text-7xl text-offwhite/90 font-light">
                La <span className="text-gold italic">Collezione</span>
            </h2>
        </div>

        <div 
            ref={sliderRef}
            className="flex flex-col md:flex-row gap-12 md:gap-32 px-6 md:px-20 overflow-x-auto md:overflow-visible hide-scrollbar items-center md:items-start"
        >
            {galleryItems.map((item, index) => (
                <div 
                    key={item.id}
                    className="group relative flex-shrink-0 w-full md:w-[50vh] aspect-[2/3] bg-[#0a0a0a] overflow-hidden transition-all duration-[1.5s] ease-out hover:scale-[1.02] shadow-2xl border border-white/5"
                >
                    {/* Media Render Logic */}
                    {item.type === 'video' ? (
                         <video
                            src={item.src}
                            className="w-full h-full object-contain p-4 filter grayscale opacity-60 transition-all duration-[1.2s] ease-in-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                            autoPlay
                            muted
                            loop
                            playsInline
                         />
                    ) : (
                        <img 
                            src={item.src}
                            alt={item.label}
                            className="w-full h-full object-contain p-2 filter grayscale opacity-60 transition-all duration-[1.2s] ease-in-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                            loading="lazy"
                        />
                    )}
                    
                    {/* Clean look: Text overlays and numbers removed as requested */}
                </div>
            ))}
            
            {/* End spacer */}
            <div className="w-1 md:w-40 flex-shrink-0" />
        </div>
    </section>
  );
};