import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";

export default function Hero() {
  const { language } = useAuth();
  
  const t = {
    sq: {
      tag: "Artizanal // Viti 2024",
      title1: "Kafe",
      title2: "Artizanale",
      title3: "& Qetësi",
      desc: "Përjetoni ndërthurjen e kafesë premium Illy dhe heshtjes strukturale në zemër të Prishtinës. Duke hulumtuar teksturat e mjeshtërisë moderne.",
      btn: "Rezervoni një Tavolinë",
      hours: "Përzgjedhja Ditore: 07:00 — 22:00",
      scroll: "Rrëshqitni për të Eksploruar"
    },
    en: {
      tag: "Artisanal // Est. 2024",
      title1: "Artisanal",
      title2: "Coffee &",
      title3: "Quietude",
      desc: "Experience the intersection of premium Illy coffee and structural silence in the heart of Pristina. Investigating the textures of modern craftsmanship.",
      btn: "Reserve a Table",
      hours: "Daily Selection: 07:00 — 22:00",
      scroll: "Scroll to Explore"
    }
  }[language];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD997sUQXZ6lfBjDL6sUm8a79_k_XGQ_deZccsnjRgh4n0cRSFC4s1rz91NSjDLv5n7zhlDV6_djpBNWPLudPxBw56mqngygtMLfL1OexOU22OhUOPsbfMctcI3wD00rHFHv0Xpx9GIvPvWhJeKiRKB9y0YKz5jU3N_slRxzyP3LUhKS8BkbyTw-ilCpzr0MsLXoOZ-q0XrsT7KAmeQ04H6fCFX4yqku4Tiw_zyDAyoNjnNVKVO9c5ey_zCIq5bX2exTqYwu6A_Q98X"
          alt="Monroe Cafe Interior"
          className="w-full h-full object-cover opacity-50 grayscale scale-100 group-hover:scale-105 transition-transform duration-[3000ms]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="editorial-tag lg:mt-0 mt-32 block"
          >
            {t.tag}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-title text-white drop-shadow-2xl"
          >
            {t.title1}<br />{t.title2}<br />{t.title3}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-[#aaaaaa] mb-12 max-w-lg leading-relaxed"
          >
            {t.desc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center sm:items-baseline gap-6 sm:gap-8"
          >
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
              className="editorial-btn w-full sm:w-auto"
            >
              {t.btn}
            </button>
            <span className="text-[10px] text-[#777] italic tracking-widest uppercase text-center sm:text-left">
              {t.hours}
            </span>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-4"
      >
         <span className="text-[8px] sm:text-[9px] uppercase tracking-[4px] font-bold">{t.scroll}</span>
         <div className="w-px h-8 sm:h-12 bg-primary animate-bounce" />
      </motion.div>
    </section>
  );
}
