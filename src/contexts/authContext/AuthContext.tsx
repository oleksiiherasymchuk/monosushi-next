"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    onAuthStateChanged, signOut,
} from 'firebase/auth';
import { auth } from '@/firebase/config';
import Preloader from '@/components/preloader/Preloader';

interface AuthContextValue {
  user: null | any;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({user: null, logout: () => {} });

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = async () => {
        try {
          await signOut(auth);
          setUser(null);
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: any) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {loading ? <Preloader/> : children}
        </AuthContext.Provider>
    );
};