import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Calendar, Clock, User as UserIcon, LogOut } from 'lucide-react';

export default function UserProfile() {
  const { user, logout, language, isDemo } = useAuth();
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const t = {
    sq: {
      signIn: "Ju lutem hyni për të parë profilin tuaj.",
      account: "Llogaria // Regjistri",
      member: "Anëtar",
      card: "KARTELA",
      status: "Statusi i Regjistrimit",
      active: "Shoqërues Aktiv që nga viti 2026.",
      verification: "Verifikimi",
      verifText: "Identiteti juaj është verifikuar përmes Ndërfaqes së Sigurt të Google. Të gjitha rezervimet janë të lidhura me këtë token kriptografik.",
      history: "Historia",
      your: "JUAJ",
      entries: "Hyrje",
      scanning: "Duke skanuar arkivat...",
      guests: "Persona",
      confirmed: "i konfirmuar",
      pending: "në pritje",
      cancelled: "i anuluar",
      noRes: "Nuk ka rezervime në historinë tuaj.",
      initiate: "Filloni Rezervimin e Parë",
      note: "Shënim"
    },
    en: {
      signIn: "Please sign in to view your profile.",
      account: "Account // Registry",
      member: "Member",
      card: "CARD",
      status: "Journal Status",
      active: "Active Companion since 2026.",
      verification: "Verification",
      verifText: "Your identity has been verified through the Google Secure Interface. All reservations are bound to this cryptographic token.",
      history: "Your",
      your: "HISTORY",
      entries: "Entries",
      scanning: "Scanning archives...",
      guests: "Guests Reservation",
      confirmed: "confirmed",
      pending: "pending",
      cancelled: "cancelled",
      noRes: "No reservations recorded in your history.",
      initiate: "Initiate First Reserve",
      note: "Note"
    }
  }[language];

  useEffect(() => {
    if (!user) return;

    if (isDemo) {
      setReservations([
        { id: 'demo-res-1', date: '2024-06-15', time: '19:00', guests: 2, status: 'confirmed', note: 'Window seat (Signature Monroe View).' }
      ]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'reservations'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReservations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'reservations');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="pt-32 text-center">
        <h2 className="text-3xl font-headline italic">{t.signIn}</h2>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <div className="grain-overlay opacity-[0.03] pointer-events-none" />
      
      <header className="flex flex-col md:flex-row justify-between items-end border-b border-outline-variant pb-12 mb-16 gap-8">
        <div>
          <span className="editorial-tag mb-4">{t.account}</span>
          <h1 className="text-7xl font-headline tracking-tighter uppercase leading-none">
            {t.member} <span className="italic text-secondary">{t.card}</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="font-headline text-2xl tracking-tight">{user.displayName}</div>
            <div className="text-xs uppercase tracking-widest opacity-60 font-mono">{user.email}</div>
          </div>
          <button 
            onClick={() => logout()}
            className="p-4 border border-outline-variant hover:border-red-500 hover:text-red-500 transition-all rounded-full"
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <aside className="space-y-12">
          <div className="bg-surface-container p-8 relative">
            <div className="accent-block absolute top-0 left-0 w-full" />
            <h3 className="text-xs uppercase tracking-[3px] font-bold mb-4 opacity-70">{t.status}</h3>
            <p className="font-headline italic text-xl">{t.active}</p>
          </div>
          
          <div className="border border-outline-variant/30 p-8 space-y-4">
             <div className="flex items-center gap-2 text-secondary">
               <UserIcon size={14} />
               <span className="text-[10px] uppercase tracking-widest font-bold">{t.verification}</span>
             </div>
             <p className="text-xs leading-relaxed opacity-60">
               {t.verifText}
             </p>
          </div>
        </aside>

        <main className="lg:col-span-2 space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-headline tracking-tight">{t.history} <span className="italic">{t.your}</span></h2>
            <div className="h-px bg-outline-variant flex-1 mx-6 opacity-30" />
            <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{reservations.length} {t.entries}</span>
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="py-12 border border-dashed border-outline-variant text-center opacity-40 italic">
                {t.scanning}
              </div>
            ) : reservations.length > 0 ? (
              reservations.map((res) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={res.id} 
                  className="bg-surface-container/30 border border-outline-variant p-6 hover:bg-surface-container/50 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className={`text-[9px] uppercase tracking-[2px] font-bold ${
                        res.status === 'confirmed' ? 'text-green-400' : 
                        res.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {res.status === 'confirmed' ? t.confirmed : res.status === 'pending' ? t.pending : t.cancelled} // {res.id.slice(-4)}
                      </span>
                      <h4 className="text-2xl font-headline italic mt-1">{res.guests} {t.guests}</h4>
                    </div>
                    <div className="text-right">
                       <div className="flex items-center gap-2 text-xs font-mono opacity-60">
                         <Calendar size={12} /> {res.date}
                       </div>
                       <div className="flex items-center gap-2 text-xs font-mono opacity-60 mt-1">
                         <Clock size={12} /> {res.time}
                       </div>
                    </div>
                  </div>
                  {res.note && (
                    <p className="text-[11px] font-body opacity-50 italic border-t border-outline-variant/30 pt-4 mt-4 uppercase tracking-tighter">
                      {t.note}: {res.note}
                    </p>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="py-20 border border-outline-variant border-dashed text-center space-y-4">
                <p className="description">{t.noRes}</p>
                <button 
                   onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                   className="editorial-btn"
                >
                  {t.initiate}
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
