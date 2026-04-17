import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Journal() {
  const { language } = useAuth();

  const t = {
    sq: {
      tag: "Botimet // Arkiva",
      title: "Journal i",
      titleItalic: "Studios",
      viewAll: "Shiko të gjithë arkivën",
      articles: [
        {
          vol: "Vol. 01",
          theme: "Arkitektura e Heshtjes",
          desc: "Një studim mbi dritën dhe zërin në hapësirat tona brutale.",
          date: "Prill 2026"
        },
        {
          vol: "Vol. 02",
          theme: "Alkimia e Pjekjes",
          desc: "Udhëtimi i kokrrës nga Etiopia në rrugët e Prishtinës.",
          date: "Mars 2026"
        },
        {
          vol: "Vol. 03",
          theme: "Rituali i Mëngjesit",
          desc: "Pse koha që ndajmë me kafenë është forma më e pastër e meditimit.",
          date: "Shkurt 2026"
        }
      ]
    },
    en: {
      tag: "Publications // Archive",
      title: "Studio",
      titleItalic: "Journal",
      viewAll: "View full archive",
      articles: [
        {
          vol: "Vol. 01",
          theme: "Architecture of Silence",
          desc: "A study on light and sound within our brutalist spaces.",
          date: "April 2026"
        },
        {
          vol: "Vol. 02",
          theme: "Roast Alchemy",
          desc: "The bean's journey from Ethiopia to the streets of Pristina.",
          date: "March 2026"
        },
        {
          vol: "Vol. 03",
          theme: "The Morning Ritual",
          desc: "Why the time we share with coffee is the purest form of meditation.",
          date: "February 2026"
        }
      ]
    }
  }[language];

  return (
    <section id="journal" className="py-32 bg-background border-t border-outline-variant/30 relative overflow-hidden">
      <div className="grain-overlay opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="editorial-tag mb-6 block w-fit">{t.tag}</span>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-headline tracking-tighter leading-none uppercase">
              {t.title} <span className="italic text-secondary">{t.titleItalic}</span>
            </h2>
          </div>
          <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[3px] border-b border-primary pb-2 hover:gap-6 transition-all duration-500">
            {t.viewAll} <ArrowRight size={14} />
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/20 border border-outline-variant/20">
          {t.articles.map((article, idx) => (
            <motion.article 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-background p-8 md:p-12 group hover:bg-surface-container/30 transition-all duration-700 cursor-pointer relative"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-[10px] opacity-40">{article.vol}</span>
                <span className="font-mono text-[10px] opacity-40">{article.date}</span>
              </div>
              
              <h3 className="text-3xl font-headline italic mb-6 group-hover:text-primary transition-colors">
                {article.theme}
              </h3>
              <p className="description text-sm mb-12 leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                {article.desc}
              </p>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-secondary">
                <BookOpen size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{language === 'sq' ? 'Lexo më shumë' : 'Read Abstract'}</span>
              </div>

              {/* Decorative line */}
              <div className="absolute left-0 bottom-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
