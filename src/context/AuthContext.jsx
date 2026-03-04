/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Auth Modal State
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authCallback, setAuthCallback] = useState(null);

    useEffect(() => {
        // Listen for changes on auth state (log in, log out, etc.)
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuthenticated(!!currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Email/Password login (used for Admin)
    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (err) {
            let errorMessage = 'An unexpected error occurred.';
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password.';
            } else if (err.code === 'auth/too-many-requests') {
                errorMessage = 'Too many attempts. Please try again later.';
            }
            return { success: false, error: errorMessage };
        }
    };

    // Google Sign-In (used for public users - feedback/checkout)
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);

            // Save/Update user profile in Firestore
            if (result.user) {
                try {
                    await setDoc(doc(db, 'users', result.user.uid), {
                        uid: result.user.uid,
                        name: result.user.displayName || 'Anonymous',
                        email: result.user.email || '',
                        photoURL: result.user.photoURL || '',
                        lastLogin: new Date().toISOString()
                    }, { merge: true }); // merge: true updates existing docs without overwriting everything

                    // Live backup to Google Sheets
                    const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;
                    if (WEBHOOK_URL) {
                        fetch(WEBHOOK_URL, {
                            method: 'POST', mode: 'no-cors',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ type: 'user_login', name: result.user.displayName || 'Anonymous', email: result.user.email || '', date: new Date().toISOString() })
                        }).catch(() => { });
                    }
                } catch (dbError) {
                    console.error("Error saving user to Firestore:", dbError);
                    // We don't block the user from logging in if just the DB save fails
                }
            }

            setIsAuthModalOpen(false);
            if (authCallback) {
                authCallback();
                setAuthCallback(null);
            }
            return { success: true, user: result.user };
        } catch (error) {
            console.error("Error signing in with Google: ", error);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error("Error signing out:", err);
        }
    };

    // Auth Modal Controllers
    const openAuthModal = (onSuccessCallback = null) => {
        if (!user) {
            setAuthCallback(() => onSuccessCallback);
            setIsAuthModalOpen(true);
        } else if (onSuccessCallback) {
            onSuccessCallback();
        }
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
        setAuthCallback(null);
    };

    if (loading) {
        return <div className="min-h-screen bg-[#fffaef] flex items-center justify-center font-bold text-[#8d7c62]">Loading authentication...</div>;
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            login,
            signInWithGoogle,
            logout,
            loading,
            isAuthModalOpen,
            openAuthModal,
            closeAuthModal
        }}>
            {children}
            {/* Note: The AuthModal component itself should be placed high up in the component tree to render outside of nested elements. App.jsx or Layout.jsx is ideal. */}
        </AuthContext.Provider>
    );
};
