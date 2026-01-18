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
  { id: 1, type: 'image', label: "Desiderio", caption: "Il primo sguardo.", src: "https://picsum.photos/seed/421/800/1200" },
  { id: 2, type: 'image', label: "Intimità", caption: "Solo noi due.", src: "https://picsum.photos/seed/422/800/1200" },
  { id: 3, type: 'image', label: "Passione", caption: "Il fuoco che non si spegne.", src: "https://lh3.googleusercontent.com/d/1mBiQh5kFL_AlVmOci9tD9o6SuJjhKeHx" }, 
  { id: 4, type: 'video', label: "Ricordi", caption: "Momenti solo nostri.", src: "https://drive.google.com/uc?export=download&id=1MNL-uQGy8na_v43ni_8E7AqZz737Q5E8" }, 
  { id: 5, type: 'image', label: "Eternità", caption: "Io e te, Porcedda.", src: "https://lh3.googleusercontent.com/d/17hs7djAhu4EHlWOtkhhkDfyYF_0iL4N4" }, // New photo added here
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
                    className="group relative flex-shrink-0 w-full md:w-[50vh] aspect-[2/3] bg-[#0a0a0a] overflow-hidden transition-all duration-[1.5s] ease-out hover:scale-[1.02] shadow-2xl"
                >
                    {/* Media Render Logic */}
                    {item.type === 'video' ? (
                         <video
                            src={item.src}
                            className="w-full h-full object-cover filter grayscale opacity-60 transition-all duration-[1.2s] ease-in-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                            autoPlay
                            muted
                            loop
                            playsInline
                         />
                    ) : (
                        <img 
                            src={item.src}
                            alt={item.label}
                            className="w-full h-full object-cover filter grayscale opacity-60 transition-all duration-[1.2s] ease-in-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                            loading="lazy"
                        />
                    )}
                    
                    {/* Minimal Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-100 pointer-events-none">
                         {/* Line */}
                        <div className="w-0 group-hover:w-12 h-[1px] bg-gold mb-4 transition-all duration-1000 delay-100 ease-out"></div>
                        
                        <span className="font-serif text-4xl text-transparent stroke-white group-hover:text-offwhite transition-all duration-1000 ease-out italic translate-y-4 group-hover:translate-y-0" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                            {item.label}
                        </span>
                        
                        {/* Caption (appears on hover) */}
                        <p className="font-sans text-xs text-gold mt-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-200">
                            {item.caption}
                        </p>
                    </div>

                    <div className="absolute top-4 right-4 font-sans text-[10px] tracking-widest text-gold/30">
                        N° 0{index + 1}
                    </div>
                </div>
            ))}
            
            {/* End spacer */}
            <div className="w-1 md:w-40 flex-shrink-0" />
        </div>
    </section>
  );
};