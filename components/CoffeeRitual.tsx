import React, { useState } from 'react';

type MachineState = 'idle' | 'brewing' | 'done' | 'watery' | 'broken';

export const CoffeeRitual: React.FC = () => {
  const [state, setState] = useState<MachineState>('idle');
  const [message, setMessage] = useState<string>("Fammi salire la pressione, Porcedda.");

  const handleEspresso = () => {
    if (state === 'broken') return;
    setState('brewing');
    setMessage("Scaldando i motori...");
    setTimeout(() => {
        setState('done');
        setMessage("Bollente, cremoso e nero. Come piace a noi.");
    }, 2000);
  };

  const handleDeka = () => {
    if (state === 'broken') return;
    setState('watery');
    setMessage("Deka: Acqua sporca. (Non farlo mai più).");
  };

  const handleCapciocc = () => {
    setState('broken');
    setMessage("Capciocc: BOOM! Hai rotto tutto. Sei la solita ❤️");
  };

  const reset = () => {
    setState('idle');
    setMessage("Riprova, con più passione.");
  }

  return (
    <section className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center bg-[#080808]">
        <div className="max-w-4xl w-full border border-gold/10 p-8 md:p-16 rounded-sm bg-gradient-to-b from-[#121212] to-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/5 blur-[100px] pointer-events-none"></div>

            <h2 className="font-serif text-3xl md:text-5xl text-center mb-12 text-gold/90">
                Il Nostro Rituale <span className="text-blood">Hot</span>
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-16 relative z-10">
                
                {/* Visual Representation of Machine */}
                <div className={`relative w-48 h-64 transition-transform duration-500 ${state === 'broken' ? 'shaking' : ''}`}>
                    {/* Machine Body */}
                    <div className={`absolute inset-0 rounded-t-[40px] rounded-b-md border-2 transition-colors duration-500 ${
                        state === 'broken' ? 'bg-blood/20 border-blood shadow-[0_0_20px_rgba(100,0,0,0.5)]' : 
                        state === 'watery' ? 'bg-blue-900/10 border-blue-900/30' :
                        'bg-zinc-900 border-zinc-700 shadow-xl'
                    }`}></div>

                    {/* Group Head */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-16 h-8 bg-neutral-800 rounded-sm shadow-lg border-b-4 border-neutral-950"></div>
                    
                    {/* Spout */}
                    <div className="absolute top-[calc(33%+32px)] left-1/2 -translate-x-1/2 w-2 h-4 bg-neutral-600"></div>

                    {/* Drip Stream */}
                    {(state === 'brewing' || state === 'done' || state === 'watery') && (
                         <div className={`absolute top-[calc(33%+48px)] left-1/2 -translate-x-1/2 w-1 
                            ${state === 'watery' ? 'bg-blue-400/30' : 'bg-[#3f2a1d]'} 
                            transition-all duration-1000 origin-top
                            ${state === 'brewing' ? 'h-16 animate-pulse' : state === 'done' ? 'h-0 opacity-0' : 'h-16 opacity-50'}
                         `}></div>
                    )}

                    {/* Cup */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-10 bg-white/90 rounded-b-xl rounded-t-sm shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-end justify-center overflow-hidden">
                        <div className={`w-full transition-all duration-[2000ms] ease-linear 
                            ${state === 'brewing' ? 'h-0' : state === 'done' ? 'h-3/4' : state === 'watery' ? 'h-3/4 bg-blue-100/50' : 'h-0'}
                            ${state !== 'watery' ? 'bg-[#3f2a1d]' : ''}
                        `}></div>
                    </div>
                    
                    {/* Steam */}
                    {state === 'done' && (
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1 opacity-60">
                            <span className="w-1 h-4 bg-white blur-sm rounded-full animate-[ping_1.5s_infinite]"></span>
                            <span className="w-1 h-6 bg-white blur-sm rounded-full animate-[ping_1.8s_infinite_0.2s]"></span>
                        </div>
                    )}

                    {/* Error Symbol */}
                    {state === 'broken' && (
                        <div className="absolute inset-0 flex items-center justify-center text-blood text-6xl font-bold animate-pulse drop-shadow-lg">💔</div>
                    )}
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-6 w-full md:w-auto">
                    <button 
                        onClick={handleEspresso}
                        className="group px-8 py-3 border border-gold/30 text-gold hover:bg-gold hover:text-background transition-all uppercase tracking-widest text-xs font-bold font-sans relative overflow-hidden"
                    >
                        <span className="relative z-10">Espresso</span>
                        <div className="absolute inset-0 bg-gold/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    </button>
                    <button 
                        onClick={handleDeka}
                        className="px-8 py-3 border border-white/5 text-white/30 hover:bg-white/5 hover:text-white/60 transition-all uppercase tracking-widest text-xs font-bold font-sans"
                    >
                        Deka
                    </button>
                    <button 
                        onClick={handleCapciocc}
                        className="px-8 py-3 border border-blood/50 text-blood hover:bg-blood hover:text-offwhite transition-all uppercase tracking-widest text-xs font-bold font-sans hover:shadow-[0_0_20px_rgba(100,0,0,0.4)]"
                    >
                        Capciocc
                    </button>

                    {state === 'broken' && (
                        <button onClick={reset} className="mt-4 text-[10px] text-zinc-500 underline hover:text-gold transition-colors">
                            Dai, fai la brava. Riavvia.
                        </button>
                    )}
                </div>
            </div>

            {/* Display Text */}
            <div className="mt-16 text-center h-8">
                <p className={`font-serif text-xl italic transition-all duration-300 ${
                    state === 'broken' ? 'text-blood font-bold scale-110' : 
                    state === 'done' ? 'text-gold drop-shadow-md' : 
                    state === 'watery' ? 'text-blue-300/50' : 'text-offwhite/80'
                }`}>
                    {message}
                </p>
            </div>
        </div>
    </section>
  );
};