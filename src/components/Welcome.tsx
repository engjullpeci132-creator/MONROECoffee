import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";

export default function Welcome() {
  const { language } = useAuth();

  const t = {
    sq: {
      tag: "Vëllimi 04 // Botimi i Studios",
      title1: "Qetësi",
      title2: "Brutale",
      desc: "Në zemër të Prishtinës, Monròe hulumton heshtjen strukturore. Duke eksploruar ndërlidhjen e teksturave të kafesë krudo dhe mjegullës eterike të mëngjesit.",
      btn: "Procesi Ynë"
    },
    en: {
      tag: "Volume 04 // Studio Issue",
      title1: "Brutal",
      title2: "Quietude",
      desc: "In the heart of Pristina, Monròe investigated structural silence. Investigating the intersection of raw coffee textures and the ethereal morning mist.",
      btn: "Our Process"
    }
  }[language];

  return (
    <section id="story" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <span className="editorial-tag shadow-black/20 drop-shadow-md">
            {t.tag}
          </span>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-headline text-white tracking-tighter leading-[0.8] mb-12">
            {t.title1}<br />{t.title2}
          </h2>
          <p className="description text-lg text-[#aaaaaa] max-w-md">
            {t.desc}
          </p>
          <div className="pt-4">
            <a href="#" className="editorial-btn inline-block">
              {t.btn}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/5] border border-outline-variant/30 overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnhxwhQkZzhQe1vpSkjNPyT-8z1UY_SVEyJkHgfrS8uOHFfPYZHamieu1g8QDvK6kybhuOTJYPRpIj1__cekZIwIjY_bu12bGg_x5USa6E6XzvlNV_UYzSyCYhHnfyGpRssQsZi7HB-S7oAeSFljocbVyvU3kkRC2WHkpXql8NDRNCVkQ4tGdNwZkMnQ7N8tnLIA31QfwXgltGwBQNSXPOiFnF6rdlds3z7kEvap6vOlbnDlfGgvD_xARJvPq8R2QJbzXY2T8voabW"
              alt="Barista at work"
              className="w-full h-full object-cover grayscale opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-surface-container border border-outline-variant p-8 hidden lg:flex flex-col justify-end">
            <span className="text-4xl font-headline text-primary mb-2 tracking-tighter italic">100%</span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[2px] leading-tight">
              Arabica // Illy Roast
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
