import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export default function Philosophy() {
  const { language } = useAuth();

  const t = {
    sq: {
      tag: "Ekstrakt // Esencë e Pastër",
      title: "Integritet",
      titleItalic: "Brutal.",
      desc: "Monròe nuk është një kafene. Është një objekt kërkimor për gjendjen njerëzore, i ndërmjetësuar përmes kafeinës me intensitet të lartë dhe arkitekturës brutaliste.",
      origin: "Origjina",
      originVal: "Prishtina 01.",
      method: "Metoda",
      methodVal: "Ekstrakt i Ftohtë.",
      manifesto: "NE REFUZOJMË TË PËRKOHERSHMEN. NE PËRQAFOJMË BETONIN. ÇDO KOKËRR KAFEJE ËSHTË NJË VOTË PËR NJË EKZISTENCË MË TË NGADALTË DHE MË TË QËLLIMSHME. ARKITEKTURA ËSHTË E FTOHTË PËR TA BËRË KAFENË TË NDIHET MË E NGROHTË. MUZIKA ËSHTË MINIMALISTE PËR T'I BËRË MENDIMET TË NDIHEN MË TË LARTA.",
      quote: "Betoni nuk kërkon falje. As ne.",
      attr: "— Ditari i Studios Monròe, vol 4."
    },
    en: {
      tag: "Extract // Pure Essence",
      title: "Brutal",
      titleItalic: "Integrity.",
      desc: "Monròe is not a café. It is a research facility for the human condition, mediated through high-intensity caffeine and brutalist architecture.",
      origin: "Origin",
      originVal: "Pristina 01.",
      method: "Method",
      methodVal: "Cold Extract.",
      manifesto: "WE REJECT THE DISPOSABLE. WE EMBRACE THE CONCRETE. EVERY BEAN IS A VOTE FOR A SLOWER, MORE INTENTIONAL EXISTENCE. THE ARCHITECTURE IS COLD TO MAKE THE COFFEE FEEL WARMER. THE MUSIC IS MINIMAL TO MAKE THE THREATS FEEL LOUDER.",
      quote: "The concrete does not apologize. Neither do we.",
      attr: "— Studio Monròe Journal, vol 4."
    }
  }[language];

  return (
    <section className="py-20 md:py-32 px-6 border-t border-outline-variant bg-background overflow-hidden relative">
      <div className="grain-overlay opacity-[0.04] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="relative">
            <span className="editorial-tag mb-6 sm:mb-8 block">{t.tag}</span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-headline leading-[0.85] tracking-tighter mb-8 sm:mb-12 uppercase">
              {t.title} <br/>
              <span className="italic text-secondary">{t.titleItalic}</span>
            </h2>
            
            <div className="space-y-6 md:space-y-8 max-w-lg">
              <p className="description text-base sm:text-lg md:text-xl leading-relaxed">
                {t.desc}
              </p>
              
              <div className="flex gap-8 sm:gap-12 border-y border-outline-variant/30 py-8 md:py-10">
                <div>
                   <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[3px] opacity-40 mb-2 block">{t.origin}</span>
                   <span className="font-headline text-xl sm:text-2xl italic">{t.originVal}</span>
                </div>
                <div>
                   <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[3px] opacity-40 mb-2 block">{t.method}</span>
                   <span className="font-headline text-xl sm:text-2xl italic">{t.methodVal}</span>
                </div>
              </div>
              
              <p className="text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] opacity-50 font-body leading-loose">
                {t.manifesto}
              </p>
            </div>
          </div>
          
          <div className="relative aspect-square sm:aspect-[3/4] group mt-8 lg:mt-0">
            <div className="absolute -inset-4 border border-secondary/20 z-0 scale-95 group-hover:scale-100 transition-transform duration-1000" />
            <motion.div 
               initial={{ opacity: 0, scale: 1.1 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5 }}
               className="w-full h-full relative z-10 overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" 
                alt="Philosophy Image" 
                className="w-full h-full object-cover grayscale brightness-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-12 left-12 right-12">
                 <div className="p-10 backdrop-blur-md bg-background/40 relative">
                    <div className="accent-block absolute top-0 left-0 w-full opacity-50" />
                    <p className="font-headline italic text-2xl mb-4 leading-tight">
                      "{t.quote}"
                    </p>
                    <span className="text-[10px] font-bold tracking-[4px] uppercase opacity-60">{t.attr}</span>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
