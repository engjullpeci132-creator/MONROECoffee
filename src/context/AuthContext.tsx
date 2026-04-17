import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  role: 'admin' | 'customer' | null;
  loading: boolean;
  language: 'sq' | 'en';
  setLanguage: (lang: 'sq' | 'en') => void;
  signIn: () => Promise<void>;
  signInDemo: () => void;
  logout: () => Promise<void>;
  isDemo: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'admin' | 'customer' | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [language, setLanguageState] = useState<'sq' | 'en'>(() => {
    const saved = localStorage.getItem('monroe_lang');
    return (saved === 'en' || saved === 'sq') ? saved : 'sq';
  });

  const setLanguage = (lang: 'sq' | 'en') => {
    setLanguageState(lang);
    localStorage.setItem('monroe_lang', lang);
  };

  useEffect(() => {
    return onAuthStateChanged(auth, async (currentUser) => {
      if (isDemo) return; // Don't override demo mode
      setUser(currentUser);
      if (currentUser) {
        // Fetch or create user document
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        } else {
          // Default role, except for the initial hardcoded admin
          const isHardcodedAdmin = currentUser.email === "engjullpeci132@gmail.com" || currentUser.email === "engjullpeci@gmail.com";
          const newRole = isHardcodedAdmin ? 'admin' : 'customer';
          await setDoc(userDocRef, {
            uid: currentUser.uid,
            email: currentUser.email,
            role: newRole
          });
          setRole(newRole);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
  }, []);

  const signIn = async () => {
    try {
      setIsDemo(false);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Sign in failed", error);
    }
  };

  const signInDemo = () => {
    setIsDemo(true);
    setUser({
      uid: 'demo-admin-uid',
      email: 'demo@monroe.coffee',
      displayName: 'Demo Admin',
      emailVerified: true,
    } as any);
    setRole('admin');
  };

  const logout = async () => {
    try {
      setIsDemo(false);
      await signOut(auth);
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, language, setLanguage, signIn, signInDemo, logout, isDemo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
