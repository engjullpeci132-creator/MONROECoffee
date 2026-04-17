import { Globe, Instagram, Twitter } from "lucide-react";
import { useAuth } from '../context/AuthContext';

export default function Footer() {
  const { language } = useAuth();

  const t = {
    sq: {
      tag: "Fund faqja // Prishtinë",
      copy: "© 2026 MONRÒE COFFEE ARTISANS / EDIZIONI I PRISHTINËS",
      links: ["Menu", "Journal", "Lokacioni", "Rezervimet"],
      address: "Rexhep Luci St, Prishtinë",
      motto: "Për ata që e kuptojnë heshtjen si formë të artit."
    },
    en: {
      tag: "Footer // Pristina",
      copy: "© 2026 MONRÒE COFFEE ARTISANS / PRISTINA EDITION",
      links: ["Menu", "Journal", "Location", "Reservations"],
      address: "Rexhep Luci St, Pristina",
      motto: "For those who understand silence as an art form."
    }
  }[language];

  return (
    <footer className="bg-background py-24 border-t border-outline-variant/20 relative overflow-hidden">
      <div className="grain-overlay opacity-[0.02]" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2 space-y-8">
            <span className="editorial-tag block w-fit">{t.tag}</span>
            <div className="accent-block w-12" />
            <span className="text-5xl font-bold text-primary font-headline tracking-tighter uppercase block leading-none">
              MONRÒE
            </span>
            <p className="description text-sm max-w-sm italic opacity-60">
              {t.motto}
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[3px] opacity-40">Mensa</h4>
            <nav className="flex flex-col gap-4">
              {t.links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-headline italic hover:text-primary transition-all hover:translate-x-2"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[3px] opacity-40">Social</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/monroe.pr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 border border-outline-variant/30 hover:border-primary transition-colors inline-block"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/monroeprishtina/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 border border-outline-variant/30 hover:border-primary transition-colors inline-block"
              >
                <Globe size={18} />
              </a>
            </div>
            <p className="text-[10px] font-mono opacity-40 uppercase tracking-tighter">
              {t.address}
            </p>
          </div>
        </div>

        <div className="pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-bold opacity-30 tracking-[4px] uppercase">
            {t.copy}
          </p>
          <div className="flex gap-8 text-[9px] font-bold opacity-30 tracking-[2px] uppercase">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms of Archive</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
