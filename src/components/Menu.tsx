import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { MENU_ITEMS } from "../constants";
import { useAuth } from "../context/AuthContext";

export default function Menu() {
  const { language } = useAuth();
  const [liveMenu, setLiveMenu] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const t = {
    sq: {
      tag: "Koleksioni",
      title: "Ushqim",
      titleItalic: "Mjeshtëri",
      investigation: "Hulumtimi 01 — Prishtinë"
    },
    en: {
      tag: "The Collection",
      title: "Sustenance",
      titleItalic: "Craft",
      investigation: "Investigation 01 — Pristina"
    }
  }[language];

  useEffect(() => {
    const q = query(collection(db, 'menu_items'), orderBy('order', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setLiveMenu(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        setLiveMenu(MENU_ITEMS); // Fallback to editorial defaults
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'menu_items');
      setLiveMenu(MENU_ITEMS);
      setLoading(false);
    });
    return unsub;
  }, []);

  const categories = Array.from(new Set(liveMenu.map(item => item.category || 'Featured')));

  return (
    <section id="menu" className="py-24 md:py-32 bg-background border-t border-outline-variant/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
          <div className="max-w-xl">
            <span className="editorial-tag mb-4">{t.tag}</span>
            <h2 className="text-5xl sm:text-7xl font-headline tracking-tighter leading-[0.85] text-white">
              {t.title}<br />& <span className="italic text-secondary">{t.titleItalic}</span>
            </h2>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[4px] text-[#555] italic">
            {t.investigation}
          </div>
        </header>

        <div className="space-y-32">
          {categories.map((category) => (
            <div key={category || 'unassigned'} className="space-y-12">
              <div className="flex items-center gap-6">
                <h3 className="text-[12px] font-bold uppercase tracking-[6px] text-secondary">
                  {category}
                </h3>
                <div className="h-px bg-outline-variant/30 flex-1" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/30 border border-outline-variant/30">
                {liveMenu
                  .filter(item => (item.category || 'Featured') === category)
                  .map((item, idx) => (
                  <motion.div
                    key={`${category}-${item.id || item.title || idx}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="p-6 md:p-10 bg-background group hover:bg-surface-container transition-colors duration-500"
                  >
                    <div className="aspect-[3/2] mb-8 overflow-hidden grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex justify-between items-baseline mb-4">
                      <h4 className="text-xl font-headline tracking-tight text-white italic">
                        {item.title}
                      </h4>
                      <span className="text-lg font-bold text-secondary">{item.price}</span>
                    </div>
                    <div className="h-px bg-outline-variant/30 w-12 mb-4" />
                    <p className="description text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
