import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Megaphone, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { language } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, 'announcements'), 
      where('isActive', '==', true),
      limit(1)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setAnnouncement({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
        setIsVisible(true);
      } else {
        setAnnouncement(null);
      }
    });

    return () => unsub();
  }, []);

  if (!announcement || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-secondary text-background relative z-[60] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-2 sm:py-3 flex justify-between items-center gap-4">
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
            <Megaphone size={14} className="animate-bounce shrink-0" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4 overflow-hidden">
              <span className="text-[9px] font-bold uppercase tracking-[2px] leading-none shrink-0 border-r border-background/20 pr-4 hidden sm:block">
                {language === 'sq' ? 'Lajmërim' : 'Announcement'}
              </span>
              <div className="flex items-baseline gap-2 overflow-hidden">
                <span className="text-xs font-headline italic leading-none whitespace-nowrap">{announcement.title}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest leading-none opacity-80 truncate">{announcement.message}</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsVisible(false)} className="hover:rotate-90 transition-transform shrink-0 p-2">
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
