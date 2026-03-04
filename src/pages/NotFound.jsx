import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#fffaef] px-4">
            <div className="max-w-md w-full text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex justify-center text-[#5c854c]"
                >
                    <Leaf size={80} className="animate-pulse" />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl md:text-8xl font-serif font-bold text-[#2c3e24] mb-4"
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl font-bold text-[#5c5446] mb-6"
                >
                    Lost in the Forest
                </motion.h2>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-[#8d7c62] mb-10"
                >
                    It seems you've wandered off the path. This page doesn't exist or has naturalized back into the wild.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-[#2c3e24] bg-[#5c854c] px-8 py-4 text-lg font-bold text-[#fffaef] shadow-[4px_4px_0px_0px_#2c3e24] hover:bg-[#4a6b3d] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_#2c3e24] transition-all"
                    >
                        <ArrowLeft size={20} />
                        Return Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
