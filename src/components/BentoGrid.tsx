import { motion } from "motion/react";
import { GALLERY_IMAGES } from "../constants";
import { useAuth } from "../context/AuthContext";

export default function BentoGrid() {
  const { language } = useAuth();

  const t = {
    sq: {
      title: "Krijuar për",
      titleItalic: "Lidhje",
      desc: "Çdo cep i Monròe është krijuar për të frymëzuar. Nga ngrohtësia taktile e dushkut deri te aroma e kokrrave të sapopjekura.",
      plate: "Pjata"
    },
    en: {
      title: "Crafted for",
      titleItalic: "Connection",
      desc: "Every corner of Monròe is designed to inspire. From the tactile warmth of oak to the aroma of freshly ground beans.",
      plate: "Plate"
    }
  }[language];

  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-headline text-primary mb-6 tracking-tight"
          >
            {t.title} <span className="text-secondary italic">{t.titleItalic}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="description text-lg"
          >
            {t.desc}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-outline-variant/30 border border-outline-variant/30">
          {GALLERY_IMAGES.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative overflow-hidden group border border-outline-variant/10 ${
                item.cols === 8 ? "md:col-span-8" : "md:col-span-4"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                <span className="editorial-tag text-white/50 mb-2">{t.plate} {index + 1}</span>
                <h3 className="text-white text-2xl font-headline italic">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
