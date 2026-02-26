import React from 'react';
import { motion } from 'framer-motion';

const GlobalLoader = () => {
    return (
        <div className="fixed inset-0 z-50 bg-[#fffaef] flex flex-col items-center justify-center min-h-screen">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
            >
                <div className="relative w-24 h-24 mb-6">
                    {/* Outer spinning ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-4 border-[#2c3e24]/20 border-t-[#2c3e24]"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Inner spinning ring */}
                    <motion.div
                        className="absolute inset-2 rounded-full border-4 border-[#a06d40]/20 border-b-[#a06d40]"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Center Icon/Logo placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-serif text-[#2c3e24]">L</span>
                    </div>
                </div>

                <motion.h2
                    className="text-2xl font-serif font-bold text-[#2c3e24] mb-2 tracking-wider"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    LAYRA
                </motion.h2>

                <p className="text-[#a06d40] text-sm font-medium tracking-widest uppercase relative overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Awakening Nature
                    </motion.span>
                    <motion.span
                        className="absolute inset-0 bg-[#fffaef]"
                        initial={{ x: "0%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                    />
                </p>
            </motion.div>
        </div>
    );
};

export default GlobalLoader;
