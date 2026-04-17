import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, User as UserIcon, LogOut, ChevronRight } from "lucide-react";
import { NAV_LINKS } from "../constants";
import { useAuth } from "../context/AuthContext";
import BookingForm from "./BookingForm";
import AnnouncementBar from "./AnnouncementBar";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { user, role, signIn, signInDemo, logout, language, setLanguage } = useAuth();

  const t = {
    sq: {
      studio: "STUDIO",
      home: "BALLINA",
      journal: "JOURNAL",
      location: "LOKACIONI",
      menu: "MENUJA",
      res: "REZERVIMET",
      story: "HISTORIA JONË",
      dash: "PANELI",
      signIn: "Qasju",
      logout: "Dil",
      reserve: "Rezervo",
      sommelier: "Sommelier"
    },
    en: {
      studio: "STUDIO",
      home: "HOME",
      journal: "JOURNAL",
      location: "LOCATION",
      menu: "MENU",
      res: "RESERVATIONS",
      story: "OUR STORY",
      dash: "DASHBOARD",
      signIn: "Sign In",
      logout: "Log Out",
      reserve: "Reserve",
      sommelier: "Sommelier"
    }
  }[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleOpenBooking = () => setIsBookingOpen(true);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("open-booking", handleOpenBooking);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("open-booking", handleOpenBooking);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <header 
          className={`transition-all duration-300 border-b ${
            isScrolled ? "glass-header py-3 lg:py-4 shadow-xl" : "bg-transparent py-6 lg:py-8"
          } border-[#343333]`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
            <div className="flex items-center gap-4 lg:mr-10">
              <button 
                className="lg:hidden text-primary p-2 -ml-2 hover:bg-white/5 transition-colors rounded-full"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
              <a href="/" className="text-xl sm:text-2xl font-bold tracking-tighter text-primary font-headline uppercase leading-none">
                MONRÒE
              </a>
            </div>

            <nav className="hidden lg:flex items-center gap-4 xl:gap-8 flex-1 justify-center">
              <Link
                to="/"
                className="text-[12px] font-bold text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-[2px]"
              >
                {t.studio}
              </Link>
              <a
                href="/"
                className="text-[12px] font-bold text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-[2px]"
              >
                {t.home}
              </a>
              <a
                href="#menu"
                className="text-[12px] font-bold text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-[2px]"
              >
                {t.menu}
              </a>
              <a
                href="#journal"
                className="text-[12px] font-bold text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-[2px]"
              >
                {t.journal}
              </a>
              <a
                href="#location"
                className="text-[12px] font-bold text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-[2px]"
              >
                {t.location}
              </a>
              <a
                href="#reservations"
                className="text-[12px] font-bold text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-[2px]"
              >
                {t.res}
              </a>
              <a
                href="#story"
                className="text-[12px] font-bold text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-[2px]"
              >
                {t.story}
              </a>
              {role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-[12px] font-bold text-secondary hover:text-primary transition-colors duration-300 uppercase tracking-[2px] flex items-center gap-1"
                >
                  {t.dash} <ChevronRight size={10} />
                </Link>
              )}
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 border-r border-outline-variant pr-4 mr-2">
                <button 
                  onClick={() => setLanguage('sq')}
                  className={`text-[10px] font-bold tracking-widest transition-colors ${language === 'sq' ? 'text-secondary' : 'text-on-surface-variant opacity-40 hover:opacity-100'}`}
                >
                  SQ
                </button>
                <span className="text-[10px] opacity-20">/</span>
                <button 
                  onClick={() => setLanguage('en')}
                  className={`text-[10px] font-bold tracking-widest transition-colors ${language === 'en' ? 'text-secondary' : 'text-on-surface-variant opacity-40 hover:opacity-100'}`}
                >
                  EN
                </button>
              </div>

              {user ? (
                <div className="flex items-center gap-4">
                  <Link 
                    to="/profile"
                    className="hidden lg:flex items-center gap-4 border border-outline-variant/30 px-3 py-1 hover:border-primary transition-all group"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#555] italic group-hover:text-primary">
                      {user.displayName?.split(' ')[0]}
                    </span>
                    <UserIcon size={14} className="text-[#555] group-hover:text-primary" />
                  </Link>
                  <button 
                    onClick={logout}
                    className="hidden sm:flex items-center text-on-surface-variant hover:text-red-500 transition-colors"
                    title={t.logout}
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4 hidden lg:flex">
                   <button 
                    onClick={signInDemo}
                    className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors border border-secondary/30 px-2 py-0.5 rounded"
                  >
                    Demo Admin
                  </button>
                  <button 
                    onClick={signIn}
                    className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {t.signIn}
                  </button>
                </div>
              )}
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="editorial-btn"
              >
                {t.reserve}
              </button>
            </div>
          </div>
        </header>
      </div>

    <BookingForm isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

    <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            <div className="grain-overlay opacity-10 pointer-events-none" />
            
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/30">
              <span className="text-xl font-bold tracking-tighter text-primary font-headline italic uppercase leading-none">
                MONRÒE
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center border border-outline-variant hover:border-primary transition-colors"
               >
                <X size={20} className="text-on-surface" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col justify-center gap-12 text-center">
              <nav className="flex flex-col gap-6">
                {[
                  { label: t.home, href: "/" },
                  { label: t.menu, href: "#menu" },
                  { label: t.journal, href: "#journal" },
                  { label: t.location, href: "#location" },
                  { label: t.res, href: "#reservations" }
                ].map((link, idx) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl sm:text-5xl font-headline italic hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="flex flex-col items-center gap-8 pt-12 border-t border-outline-variant/20">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setLanguage('sq')}
                    className={`text-sm font-bold tracking-[4px] uppercase ${language === 'sq' ? 'text-secondary' : 'opacity-40'}`}
                  >
                    Shqip
                  </button>
                  <div className="w-1 h-1 bg-outline-variant rounded-full" />
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`text-sm font-bold tracking-[4px] uppercase ${language === 'en' ? 'text-secondary' : 'opacity-40'}`}
                  >
                    English
                  </button>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  {user ? (
                   <div className="flex flex-col gap-4">
                     <Link 
                      to="/profile" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-bold tracking-[3px] uppercase opacity-60"
                     >
                        {user.displayName}
                     </Link>
                     <button 
                      onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                      className="text-sm font-bold tracking-[3px] uppercase text-red-500"
                    >
                      {t.logout}
                    </button>
                   </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <button 
                        onClick={() => { signInDemo(); setIsMobileMenuOpen(false); }}
                        className="text-sm font-bold tracking-[3px] uppercase text-secondary"
                      >
                        Demo Admin Login
                      </button>
                      <button 
                        onClick={() => { signIn(); setIsMobileMenuOpen(false); }}
                        className="text-sm font-bold tracking-[3px] uppercase opacity-60"
                      >
                        {t.signIn}
                      </button>
                    </div>
                  )}
                  {role === 'admin' && (
                    <Link 
                      to="/admin" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-bold tracking-[3px] uppercase text-secondary"
                    >
                       {t.dash}
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-outline-variant/30 text-center">
               <button 
                onClick={() => { setIsBookingOpen(true); setIsMobileMenuOpen(false); }}
                className="editorial-btn w-full py-6"
               >
                 {t.reserve}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
