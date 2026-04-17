import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";

export default function CTA() {
  const { language } = useAuth();

  const t = {
    sq: {
      title: "Tavolina juaj po ju",
      titleItalic: "pret.",
      desc: "Na u bashkoni për një përvojë të paharrueshme kafeje në atmosferën më të rehatshme në Prishtinë.",
      btn: "Siguroni Hyrjen Tuaj"
    },
    en: {
      title: "Your table is",
      titleItalic: "waiting.",
      desc: "Join us for an unforgettable coffee experience in the most comfortable atmosphere in Pristina.",
      btn: "Secure Your Entry"
    }
  }[language];

  return (
    <section id="reservations" className="py-32 bg-background text-primary border-t border-outline-variant/30">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-7xl md:text-8xl font-headline mb-12 tracking-tighter"
        >
          {t.title} <span className="italic text-secondary">{t.titleItalic}</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="description text-lg md:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed"
        >
          {t.desc}
        </motion.p>
        <motion.button 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
          className="editorial-btn bg-primary text-background px-10 sm:px-16 py-5 sm:py-6 w-full sm:w-auto"
        >
          {t.btn}
        </motion.button>
      </div>
    </section>
  );
}
