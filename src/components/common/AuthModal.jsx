import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AuthModal = () => {
    const { isAuthModalOpen, closeAuthModal, signInWithGoogle } = useAuth();

    return (
        <AnimatePresence>
            {isAuthModalOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeAuthModal}
                        className="fixed inset-0 bg-black/60 z-[999] backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-[1000] p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#fffaef] w-full max-w-sm rounded-3xl shadow-xl overflow-hidden border-2 border-dashed border-[#d4cbba] pointer-events-auto relative"
                        >
                            {/* Header decoration */}
                            <div className="bg-[#5c854c] h-3 w-full absolute top-0 left-0" />

                            <button
                                onClick={closeAuthModal}
                                className="absolute top-6 right-6 p-2 text-[#8d7c62] hover:text-[#2c3e24] hover:bg-[#d4cbba]/30 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8 pb-10 text-center flex flex-col items-center">
                                <div className="w-16 h-16 bg-[#5c854c]/10 rounded-full flex items-center justify-center mb-6 text-[#5c854c]">
                                    <UserCheck size={32} />
                                </div>

                                <h2 className="text-2xl font-bold font-serif text-[#2c3e24] mb-2">Welcome Back</h2>
                                <p className="text-[#5c5446] mb-8 font-medium">Please sign in to proceed with your action.</p>

                                <button
                                    onClick={signInWithGoogle}
                                    className="w-full flex items-center justify-center gap-3 rounded-2xl border-2 border-[#d4cbba] bg-white px-6 py-4 text-base font-bold text-[#5c5446] shadow-[4px_4px_0px_0px_#d4cbba] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_#d4cbba] transition-all active:shadow-none active:translate-y-[4px] active:translate-x-[4px]"
                                >
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
                                    Sign in with Google
                                </button>

                                <p className="text-xs text-[#8d7c62] mt-6 px-4">
                                    By continuing, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
