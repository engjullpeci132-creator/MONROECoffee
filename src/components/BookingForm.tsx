import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingForm({ isOpen, onClose }: BookingFormProps) {
  const { user, language } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    date: '',
    time: '18:00',
    guests: 2,
    note: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const t = {
    sq: {
      successTitle: "Rezervimi u",
      successItalic: "Pranua",
      successDesc: "Ne kemi marrë kërkesën tuaj dhe do ta konfirmojmë së shpejti. Shihemi në Prishtinë.",
      tag: "Rezervimi // Faza 1",
      title: "Rezervoni një",
      titleItalic: "Tavolinë",
      name: "Emri i Plotë",
      email: "Email",
      date: "Data",
      time: "Ora",
      guests: "Persona",
      btn: "Konfirmo Kërkesën për Rezervim"
    },
    en: {
      successTitle: "Reservation",
      successItalic: "Received",
      successDesc: "We've received your request and will confirm shortly. See you in Pristina.",
      tag: "Reservation // Phase 1",
      title: "Book a",
      titleItalic: "Table",
      name: "Full Name",
      email: "Email",
      date: "Date",
      time: "Time",
      guests: "Guests",
      btn: "Confirm Reservation Request"
    }
  }[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'reservations'), {
        ...formData,
        status: 'pending',
        userId: user?.uid || null,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'reservations');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto py-12 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-md"
          />
          <div className="flex min-h-full items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-background border border-outline-variant p-6 md:p-10 shadow-2xl overflow-hidden my-auto"
            >
            {/* Grain texture for consistent look */}
            <div className="grain-overlay opacity-5 pointer-events-none" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-on-surface hover:text-primary"
            >
              <X size={24} />
            </button>

            {submitted ? (
              <div className="py-20 text-center space-y-4">
                <h3 className="text-5xl font-headline tracking-tighter">{t.successTitle} <span className="text-secondary italic">{t.successItalic}</span></h3>
                <p className="description">{t.successDesc}</p>
              </div>
            ) : (
              <>
                <div className="mb-10 text-center">
                   <span className="editorial-tag mb-4">{t.tag}</span>
                   <h3 className="text-6xl font-headline tracking-tighter">{t.title} <span className="italic text-secondary">{t.titleItalic}</span></h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-60">{t.name}</label>
                         <input 
                          required 
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-surface-container border border-outline-variant p-4 font-body" 
                        />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-60">{t.email}</label>
                         <input 
                          required 
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-surface-container border border-outline-variant p-4 font-body" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-60 flex items-center gap-1"><Calendar size={10} /> {t.date}</label>
                       <input 
                        required 
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-surface-container border border-outline-variant p-4 font-mono text-sm" 
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-60 flex items-center gap-1"><Clock size={10} /> {t.time}</label>
                       <input 
                        required 
                        type="time"
                        value={formData.time}
                        onChange={e => setFormData({...formData, time: e.target.value})}
                        className="w-full bg-surface-container border border-outline-variant p-4 font-mono text-sm" 
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-60 flex items-center gap-1"><Users size={10} /> {t.guests}</label>
                       <input 
                        required 
                        type="number"
                        min="1"
                        max="10"
                        value={formData.guests}
                        onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
                        className="w-full bg-surface-container border border-outline-variant p-4 font-body" 
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full editorial-btn bg-primary text-background py-6 text-sm">
                    {t.btn}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    )}
  </AnimatePresence>
  );
}
