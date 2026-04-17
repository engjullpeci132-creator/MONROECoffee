import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, setDoc, deleteDoc, updateDoc, addDoc, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit2, Check, X, Coffee, Calendar } from 'lucide-react';

export default function AdminDashboard() {
  const { role, language, isDemo } = useAuth();
  const [activeTab, setActiveTab] = useState<'menu' | 'reservations' | 'announcements'>('menu');
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newItem, setNewItem] = useState({ title: '', price: '', description: '', image: '', category: 'Signature' });
  const [isEditingRes, setIsEditingRes] = useState<any>(null);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', message: '', isActive: true });

  const t = {
    sq: {
      accessDenied: "Qasja u Refuzua",
      dashboard: "Paneli i",
      dashboardItalic: "Administratorit",
      menu: "Menyja",
      reserves: "Rezervimet",
      announcements: "Lajmërimet",
      menuMgmt: "Menaxhimi i Menysë",
      addItem: "Shto Artikull",
      editItem: "Ndrysho Artikull",
      newCreation: "Krijim i Ri",
      title: "Titulli",
      price: "Çmimi",
      image: "URL e Imazhit",
      desc: "Përshkrimi",
      category: "Kategoria",
      save: "Ruaj",
      cancel: "Anulo",
      edit: "Ndrysho",
      delete: "Fshij",
      confirmDelete: "A jeni i sigurt?",
      confirmDeleteRes: "Të fshihet ky rezervim?",
      editReserve: "Ndrysho",
      editReserveItalic: "Rezervimin",
      customer: "Klienti",
      dateTime: "Data / Ora",
      guests: "Persona",
      status: "Statusi",
      actions: "Veprimet",
      update: "Përditëso",
      announcementMgmt: "Menaxhimi i Lajmërimeve",
      addAnnouncement: "Shto Lajmërim",
      eventTitle: "Titulli i Ngjarjes",
      eventMessage: "Mesazhi",
      active: "Aktiv",
      categories: {
        Signature: "Signaturë",
        ColdBrew: "Cold Brew",
        Pastry: "Brumëra",
        Reserve: "Rezervë"
      }
    },
    en: {
      accessDenied: "Access Denied",
      dashboard: "Admin",
      dashboardItalic: "Dashboard",
      menu: "Menu",
      reserves: "Reserves",
      announcements: "Announcements",
      menuMgmt: "Menu Management",
      addItem: "Add Item",
      editItem: "Edit Item",
      newCreation: "New Creation",
      title: "Title",
      price: "Price",
      image: "Image URL",
      desc: "Description",
      category: "Category",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      confirmDelete: "Are you sure?",
      confirmDeleteRes: "Delete this reservation?",
      editReserve: "Edit",
      editReserveItalic: "Reserve",
      customer: "Customer",
      dateTime: "Date / Time",
      guests: "Guests",
      status: "Status",
      actions: "Actions",
      update: "Update",
      announcementMgmt: "Announcement Management",
      addAnnouncement: "Add Announcement",
      eventTitle: "Event Title",
      eventMessage: "Message",
      active: "Active",
      categories: {
        Signature: "Signature",
        ColdBrew: "Cold Brew",
        Pastry: "Pastry",
        Reserve: "Reserve"
      }
    }
  }[language];

  useEffect(() => {
    if (role !== 'admin') return;

    if (isDemo) {
      // Provide high-end mock data for the Demo Admin experience
      setMenuItems([
        { id: 'm1', title: 'Signature Monroe Macchiato', price: '€4.50', description: 'Triple-layered espresso, honey-infused.', category: 'Signature', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772' },
        { id: 'm2', title: 'Artisan Croissant', price: '€3.50', description: 'Hand-laminated, 72-hour fermented dough.', category: 'Pastry', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a' }
      ]);
      setReservations([
        { id: 'r1', name: 'Adriana Hoxha', email: 'adriana@example.com', date: '2024-05-20', time: '19:30', guests: 4, status: 'confirmed', createdAt: '2024-05-01' },
        { id: 'r2', name: 'Leonit Berisha', email: 'leonit@example.com', date: '2024-05-21', time: '20:00', guests: 2, status: 'pending', createdAt: '2024-05-02' }
      ]);
      setAnnouncements([
        { id: 'a1', title: 'Jazz Night', message: 'Live jazz every Thursday from 20:00.', isActive: true }
      ]);
      return;
    }

    const qMenu = query(collection(db, 'menu_items'), orderBy('order', 'asc'));
    const unsubMenu = onSnapshot(qMenu, (snapshot) => {
      setMenuItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'menu_items'));

    const qReservations = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
    const unsubReservations = onSnapshot(qReservations, (snapshot) => {
      setReservations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'reservations'));

    const qAnnouncements = query(collection(db, 'announcements'), orderBy('isActive', 'desc'));
    const unsubAnnouncements = onSnapshot(qAnnouncements, (snapshot) => {
      setAnnouncements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'announcements'));

    return () => { unsubMenu(); unsubReservations(); unsubAnnouncements(); };
  }, [role]);

  if (role !== 'admin') {
    return <div className="pt-32 px-6 text-center text-primary font-headline text-3xl">{t.accessDenied}</div>;
  }

  const handleSaveMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDoc(doc(db, 'menu_items', editingItem.id), newItem);
        setEditingItem(null);
      } else {
        await addDoc(collection(db, 'menu_items'), { ...newItem, order: menuItems.length });
      }
      setNewItem({ title: '', price: '', description: '', image: '', category: 'Signature' });
      setIsAddingItem(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'menu_items');
    }
  };

  const startEdit = (item: any) => {
    setNewItem({ 
      title: item.title, 
      price: item.price, 
      description: item.description, 
      image: item.image, 
      category: item.category 
    });
    setEditingItem(item);
    setIsAddingItem(true);
  };

  const handleSaveRes = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'reservations', isEditingRes.id), isEditingRes);
      setIsEditingRes(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'reservations');
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    try {
      await deleteDoc(doc(db, 'menu_items', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `menu_items/${id}`);
    }
  };

  const handleDeleteRes = async (id: string) => {
    if (!confirm(t.confirmDeleteRes)) return;
    try {
      await deleteDoc(doc(db, 'reservations', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `reservations/${id}`);
    }
  };

  const updateReservationStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'reservations', id), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `reservations/${id}`);
    }
  };

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'announcements'), { 
        ...newAnnouncement, 
        createdAt: new Date().toISOString() 
      });
      setNewAnnouncement({ title: '', message: '', isActive: true });
      setIsAddingItem(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'announcements');
    }
  };

  const toggleAnnouncement = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'announcements', id), { isActive: !currentStatus });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `announcements/${id}`);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    try {
      await deleteDoc(doc(db, 'announcements', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `announcements/${id}`);
    }
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {isDemo && (
        <div className="bg-secondary/10 border border-secondary text-secondary p-4 mb-8 text-center text-xs font-bold uppercase tracking-widest animate-pulse">
          Llogaria Demo: Ju jeni në modalitetin demo. Ndryshimet nuk do të ruhen në databazë.
          <br />
          <span className="text-[10px] opacity-60">(Demo Account: You are in demo mode. Changes will not be saved to the database.)</span>
        </div>
      )}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-baseline border-b border-outline-variant pb-8 mb-12 gap-8">
        <h1 className="text-4xl sm:text-6xl font-headline tracking-tighter">{t.dashboard} <span className="text-secondary italic">{t.dashboardItalic}</span></h1>
        <div className="flex flex-wrap gap-2 sm:gap-4 w-full lg:w-auto">
          <button 
            onClick={() => { setActiveTab('menu'); setEditingItem(null); setIsAddingItem(false); }}
            className={`editorial-btn flex-1 lg:flex-none text-[10px] ${activeTab === 'menu' ? 'bg-primary text-background' : ''}`}
          >
            {t.menu}
          </button>
          <button 
            onClick={() => setActiveTab('reservations')}
            className={`editorial-btn flex-1 lg:flex-none text-[10px] ${activeTab === 'reservations' ? 'bg-primary text-background' : ''}`}
          >
            {t.reserves}
          </button>
          <button 
            onClick={() => { setActiveTab('announcements'); setIsAddingItem(false); }}
            className={`editorial-btn flex-1 lg:flex-none text-[10px] ${activeTab === 'announcements' ? 'bg-primary text-background' : ''}`}
          >
            {t.announcements}
          </button>
        </div>
      </header>

      {activeTab === 'menu' ? (
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-headline flex items-center gap-3"><Coffee /> {t.menuMgmt}</h2>
            {!isAddingItem && (
              <button 
                onClick={() => { 
                  setIsAddingItem(true); 
                  setEditingItem(null); 
                  setNewItem({ title: '', price: '', description: '', image: '', category: 'Signature' });
                }} 
                className="editorial-btn flex items-center gap-2"
              >
                <Plus size={16} /> {t.addItem}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/30 border border-outline-variant/30">
            {isAddingItem && (
              <form onSubmit={handleSaveMenuItem} className="bg-surface-container p-8 space-y-4">
                <h3 className="font-headline italic text-lg">{editingItem ? t.editItem : t.newCreation}</h3>
                <input required placeholder={t.title} value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} className="w-full bg-background p-3 border border-outline-variant" />
                <input required placeholder={t.price} value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} className="w-full bg-background p-3 border border-outline-variant" />
                <input required placeholder={t.image} value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} className="w-full bg-background p-3 border border-outline-variant" />
                <textarea placeholder={t.desc} value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} className="w-full bg-background p-3 border border-outline-variant h-24" />
                <select value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className="w-full bg-background p-3 border border-outline-variant uppercase text-xs tracking-widest">
                  <option value="Signature">{t.categories.Signature}</option>
                  <option value="Cold Brew">{t.categories.ColdBrew}</option>
                  <option value="Pastry">{t.categories.Pastry}</option>
                  <option value="Reserve">{t.categories.Reserve}</option>
                </select>
                <div className="flex gap-2">
                  <button type="submit" className="editorial-btn bg-primary text-background flex-1">{t.save}</button>
                  <button type="button" onClick={() => { setIsAddingItem(false); setEditingItem(null); }} className="editorial-btn flex-1">{t.cancel}</button>
                </div>
              </form>
            )}

            {menuItems.map(item => (
              <div key={item.id} className="bg-background p-8 group">
                <div className="aspect-square mb-4 overflow-hidden border border-outline-variant/30">
                   <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-headline text-xl italic">{item.title}</h3>
                  <span className="font-bold text-secondary">{item.price}</span>
                </div>
                <p className="text-xs text-on-surface-variant mb-6 line-clamp-2 uppercase tracking-tighter">{item.category} // {item.description}</p>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEdit(item)} className="text-primary hover:text-secondary flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest transition-colors"><Edit2 size={12} /> {t.edit}</button>
                  <button onClick={() => handleDeleteMenuItem(item.id)} className="text-error/60 hover:text-error flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest transition-colors"><Trash2 size={12} /> {t.delete}</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : activeTab === 'reservations' ? (
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-headline flex items-center gap-3"><Calendar /> {t.reserves}</h2>
          </div>
          
          {isEditingRes && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
              <form onSubmit={handleSaveRes} className="bg-background border border-outline-variant p-10 max-w-md w-full space-y-6">
                <h3 className="text-4xl font-headline tracking-tighter mb-4">{t.editReserve} <span className="italic text-secondary">{t.editReserveItalic}</span></h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">{t.date}</label>
                    <input type="date" value={isEditingRes.date} onChange={e => setIsEditingRes({...isEditingRes, date: e.target.value})} className="w-full bg-surface-container border border-outline-variant p-3" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">{t.time}</label>
                    <input type="time" value={isEditingRes.time} onChange={e => setIsEditingRes({...isEditingRes, time: e.target.value})} className="w-full bg-surface-container border border-outline-variant p-3" />
                  </div>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">{t.guests}</label>
                    <input type="number" value={isEditingRes.guests} onChange={e => setIsEditingRes({...isEditingRes, guests: parseInt(e.target.value)})} className="w-full bg-surface-container border border-outline-variant p-3" />
                </div>
                <div className="flex gap-4 pt-4">
                   <button type="submit" className="editorial-btn bg-primary text-background flex-1">{t.update}</button>
                   <button type="button" onClick={() => setIsEditingRes(null)} className="editorial-btn flex-1">{t.cancel}</button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-outline-variant">
              <thead>
                <tr className="bg-surface-container text-[11px] uppercase tracking-[2px] font-bold">
                  <th className="p-4 text-left border border-outline-variant">{t.customer}</th>
                  <th className="p-4 text-left border border-outline-variant">{t.dateTime}</th>
                  <th className="p-4 text-left border border-outline-variant">{t.guests}</th>
                  <th className="p-4 text-left border border-outline-variant">{t.status}</th>
                  <th className="p-4 text-left border border-outline-variant">{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map(res => (
                  <tr key={res.id} className="border-b border-outline-variant hover:bg-surface-container/50">
                    <td className="p-4">
                      <div className="font-bold">{res.name}</div>
                      <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">{res.email}</div>
                    </td>
                    <td className="p-4 font-mono text-sm">{res.date} @ {res.time}</td>
                    <td className="p-4">{res.guests} pax</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-[2px] ${
                        res.status === 'confirmed' ? 'bg-green-100/10 text-green-400' : 
                        res.status === 'pending' ? 'bg-yellow-100/10 text-yellow-400' : 'bg-red-100/10 text-red-400'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-4">
                        <button onClick={() => setIsEditingRes(res)} className="text-primary hover:text-secondary transition-colors" title={t.edit}><Edit2 size={16} /></button>
                        {res.status !== 'confirmed' && (
                          <button onClick={() => updateReservationStatus(res.id, 'confirmed')} className="text-green-500 hover:text-green-400 transition-colors"><Check size={18} /></button>
                        )}
                        {res.status !== 'cancelled' && (
                          <button onClick={() => updateReservationStatus(res.id, 'cancelled')} className="text-red-500 hover:text-red-400 transition-colors"><X size={18} /></button>
                        )}
                        <button onClick={() => handleDeleteRes(res.id)} className="text-error/40 hover:text-error transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-headline flex items-center gap-3"><Calendar /> {t.announcementMgmt}</h2>
            {!isAddingItem && (
              <button 
                onClick={() => setIsAddingItem(true)} 
                className="editorial-btn flex items-center gap-2"
              >
                <Plus size={16} /> {t.addAnnouncement}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/30 border border-outline-variant/30">
            {isAddingItem && (
              <form onSubmit={handleSaveAnnouncement} className="bg-surface-container p-8 space-y-4">
                <h3 className="font-headline italic text-lg">{t.addAnnouncement}</h3>
                <input required placeholder={t.eventTitle} value={newAnnouncement.title} onChange={e => setNewAnnouncement({...newAnnouncement, title: e.target.value})} className="w-full bg-background p-3 border border-outline-variant" />
                <textarea required placeholder={t.eventMessage} value={newAnnouncement.message} onChange={e => setNewAnnouncement({...newAnnouncement, message: e.target.value})} className="w-full bg-background p-3 border border-outline-variant h-24" />
                <div className="flex gap-2">
                  <button type="submit" className="editorial-btn bg-primary text-background flex-1">{t.save}</button>
                  <button type="button" onClick={() => setIsAddingItem(false)} className="editorial-btn flex-1">{t.cancel}</button>
                </div>
              </form>
            )}

            {announcements.map(ann => (
              <div key={ann.id} className="bg-background p-8 group">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${ann.isActive ? 'text-green-500' : 'opacity-40'}`}>
                    {ann.isActive ? t.active : 'Inactive'}
                  </span>
                  <button onClick={() => handleDeleteAnnouncement(ann.id)} className="text-error/40 hover:text-error transition-colors"><Trash2 size={16} /></button>
                </div>
                <h3 className="font-headline text-2xl mb-2">{ann.title}</h3>
                <p className="description text-sm italic mb-6">{ann.message}</p>
                <button onClick={() => toggleAnnouncement(ann.id, ann.isActive)} className="editorial-btn w-full">
                  {ann.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
