import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Physicality() {
  const { language } = useAuth();

  const t = {
    sq: {
      tag: "Hapësira // Lokacioni",
      title: "Fizikaliteti i",
      titleItalic: "Studios",
      location: "Adresa",
      address: "Rruga Rexhep Luci, Prishtinë, 10000",
      hours: "Orari",
      weekdays: "Hën - Prem",
      weekend: "Sht - Die",
      contact: "Kontakti",
      mapLabel: "Koordinatat Pozitive",
      visit: "Na Vizitoni"
    },
    en: {
      tag: "Space // Location",
      title: "Studio",
      titleItalic: "Physicality",
      location: "Address",
      address: "Rexhep Luci St, Pristina, 10000",
      hours: "Hours",
      weekdays: "Mon - Fri",
      weekend: "Sat - Sun",
      contact: "Contact",
      mapLabel: "Positive Coordinates",
      visit: "Visit Us"
    }
  }[language];

  return (
    <section id="location" className="py-32 bg-surface-container/20 border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="editorial-tag mb-6 block w-fit">{t.tag}</span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-headline tracking-tighter leading-none uppercase mb-12">
              {t.title} <span className="italic text-secondary">{t.titleItalic}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <MapPin size={16} />
                  <h4 className="text-[10px] font-bold uppercase tracking-[3px]">{t.location}</h4>
                </div>
                <p className="description text-sm opacity-70 italic">{t.address}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Clock size={16} />
                  <h4 className="text-[10px] font-bold uppercase tracking-[3px]">{t.hours}</h4>
                </div>
                <div className="description text-sm opacity-70 italic">
                  <p>{t.weekdays}: 07:00 — 22:00</p>
                  <p>{t.weekend}: 09:00 — 23:00</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Phone size={16} />
                  <h4 className="text-[10px] font-bold uppercase tracking-[3px]">{t.contact}</h4>
                </div>
                <div className="description text-sm opacity-70 italic">
                  <p>+383 49 123 456</p>
                  <p>hello@monroe.coffee</p>
                </div>
              </div>

              <div className="pt-8 flex flex-col gap-8">
                <a 
                  href="https://maps.app.goo.gl/A521mujt7tByDLNE7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="editorial-btn px-12 py-5 bg-background border border-outline-variant hover:border-primary transition-all text-center inline-block"
                >
                  {t.visit}
                </a>

                {/* Popular Times Simulation */}
                <div className="border border-outline-variant/30 p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-[2px] opacity-40">{language === 'sq' ? 'Kohët Popullore' : 'Popular Times'}</span>
                    <span className="text-[10px] font-bold text-secondary">{language === 'sq' ? 'Më e ngarkuar tani' : 'Peak Hour Now'}</span>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {[30, 45, 60, 80, 100, 90, 70, 50, 40, 30, 20, 15].map((h, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 ${i === 4 ? 'bg-secondary' : 'bg-primary/20'} transition-all`} 
                        style={{ height: `${h}%` }} 
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[8px] font-mono opacity-30">
                    <span>08:00</span>
                    <span>14:00</span>
                    <span>22:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group mt-12 lg:mt-0">
            <div className="absolute -inset-4 border border-primary/20 scale-95 group-hover:scale-100 transition-transform duration-1000" />
            <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden grayscale contrast-125 opacity-70 group-hover:opacity-100 transition-all duration-1000">
              <img 
                src="https://picsum.photos/seed/monroe-brutalist/1200/1500" 
                alt="Monroe Space" 
                className="w-full h-full object-cover transform transition-transform duration-[3000ms] group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 p-4 sm:p-6 bg-background/80 backdrop-blur-md border border-outline-variant/30">
                <span className="text-[8px] sm:text-[10px] font-mono opacity-50 block mb-1 sm:mb-2">{t.mapLabel}</span>
                <span className="text-lg sm:text-xl font-headline italic">42.6629° N, 21.1655° E</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
