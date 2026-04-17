import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

const REVIEWS = [
  {
    quote: "A brutalist laboratory where silence is as important as the extraction pressure.",
    author: "Studio Journal",
    issue: "VOL 12 // ARCHAIC PULSE"
  },
  {
    quote: "The concrete sanctuary Pristina didn't know it needed. Pure architectural intent.",
    author: "Minimalist Digest",
    issue: "ISSUE 04 // GREY SCALE"
  },
  {
    quote: "Every shot of espresso feels like a deliberate act of modern craftsmanship.",
    author: "The Roaster Collective",
    issue: "ESSAY 82 // DARK MATTER"
  }
];

export default function Press() {
  const { language } = useAuth();

  const t = {
    sq: {
      tag: "Arkiva // Njohja",
      title: "Shtypi i",
      titleItalic: "Përzgjedhur.",
      footer: "Diskursi vazhdon. Monròe mbetet në qendër të një revolucioni të qetë.",
      quotes: [
        {
          quote: "Një laborator brutalist ku heshtja është po aq e rëndësishme sa presioni i ekstraktimit.",
          author: "Studio Journal",
          issue: "VOL 12 // PULS ARKAIK"
        },
        {
          quote: "Shenjtërorja e betonit që Prishtina nuk e dinte se i duhej. Qëllim i pastër arkitektonik.",
          author: "Minimalist Digest",
          issue: "BOTIMI 04 // SHKALLA GRI"
        },
        {
          quote: "Çdo gotë ekspreso ndihet si një akt i qëllimshëm i mjeshtërisë moderne.",
          author: "The Roaster Collective",
          issue: "ESE 82 // MATERIE E ERRËT"
        }
      ]
    },
    en: {
      tag: "Archive // Recognition",
      title: "Selected",
      titleItalic: "Press.",
      footer: "The discourse continues. Monròe remains at the center of a quiet revolution.",
      quotes: [
        {
          quote: "A brutalist laboratory where silence is as important as the extraction pressure.",
          author: "Studio Journal",
          issue: "VOL 12 // ARCHAIC PULSE"
        },
        {
          quote: "The concrete sanctuary Pristina didn't know it needed. Pure architectural intent.",
          author: "Minimalist Digest",
          issue: "ISSUE 04 // GREY SCALE"
        },
        {
          quote: "Every shot of espresso feels like a deliberate act of modern craftsmanship.",
          author: "The Roaster Collective",
          issue: "ESSAY 82 // DARK MATTER"
        }
      ]
    }
  }[language];

  return (
    <section className="py-32 px-6 bg-surface-container-low border-t border-outline-variant relative overflow-hidden">
      <div className="grain-overlay opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="editorial-tag mb-6">{t.tag}</span>
          <h2 className="text-4xl sm:text-6xl font-headline tracking-tighter uppercase leading-none">
            {t.title} <span className="italic text-secondary">{t.titleItalic}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/20 border border-outline-variant/10 shadow-2xl">
          {t.quotes.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="p-8 sm:p-12 md:p-16 bg-background hover:bg-surface-container transition-all duration-700 flex flex-col justify-between min-h-[400px] md:min-h-[500px]"
            >
              <div className="space-y-8">
                <div className="accent-block" />
                <p className="font-headline text-2xl sm:text-3xl leading-tight tracking-tight italic">
                   "{review.quote}"
                </p>
              </div>
              
              <div className="pt-8 md:pt-12 border-t border-outline-variant/20 mt-12 md:mt-0">
                 <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[2px]">{review.author}</div>
                 <div className="text-[9px] sm:text-[10px] uppercase tracking-[4px] opacity-40 font-mono mt-2">{review.issue}</div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
           <p className="description max-w-lg mx-auto italic text-sm">
             {t.footer}
           </p>
        </div>
      </div>
    </section>
  );
}
