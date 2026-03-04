import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Star, Heart } from 'lucide-react';

const FeedbackCTA = () => {
    return (
        <section className="py-24 bg-[#fffaef] text-[#5c5446] relative overflow-hidden">
            {/* Decorative subtle background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#5c854c]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#a06d40]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#d4cbba] shadow-sm mb-6">
                            <Star size={16} className="fill-[#5c854c] text-[#5c854c]" />
                            <span className="text-sm font-bold tracking-wider uppercase text-[#2c3e24]">Your Voice Matters</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-[#2c3e24] leading-tight">
                            Share Your Natural <span className="text-[#a06d40] italic">Glow.</span>
                        </h2>

                        <p className="text-lg md:text-xl text-[#8d7c62] mb-10 max-w-xl leading-relaxed font-medium">
                            Have you experienced the purity of Layra Herbal? We invite you to share your journey. Upload a photo or short video showing your results to help others discover the power of nature.
                        </p>

                        <Link
                            to="/feedback"
                            className="inline-flex items-center gap-3 bg-[#5c854c] text-[#fffaef] px-8 py-4 border-2 border-[#2c3e24] rounded-2xl font-bold text-lg shadow-[4px_4px_0px_0px_#2c3e24] hover:bg-[#4a6b3d] hover:translate-y-[2px] hover:translate-x-[2px] transition-all hover:shadow-[2px_2px_0px_0px_#2c3e24]"
                        >
                            <Camera size={24} />
                            Share Your Journey
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden border-2 border-[#d4cbba] bg-white shadow-[8px_8px_0px_0px_#d4cbba] relative p-2">
                            <img
                                src="/images/herbal_face_pack.png"
                                alt="Layra Herbal Face and Body Pack"
                                className="w-full h-full object-contain p-8 bg-[#fffaef] rounded-2xl"
                            />
                            <div className="absolute inset-2 rounded-2xl bg-gradient-to-t from-[#2c3e24]/90 via-[#2c3e24]/20 to-transparent flex items-end p-6 md:p-8">
                                <div className="bg-[#fffaef]/90 backdrop-blur-md border border-[#d4cbba] p-5 md:p-6 rounded-2xl w-full">
                                    <div className="flex gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} size={20} className="fill-[#a06d40] text-[#a06d40]" />
                                        ))}
                                    </div>
                                    <p className="font-serif italic text-lg text-[#2c3e24] leading-snug">"The Layra Herbal Face and Body Pack changed my skin entirely. I've never felt more confident and connected to nature."</p>
                                    <div className="mt-4 flex items-center gap-2">
                                        <Heart size={16} className="text-[#e05a5a] fill-[#e05a5a]" />
                                        <span className="text-sm font-bold text-[#5c5446]">- Layra Customer</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating decorative element */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -top-8 -right-8 w-32 h-32 bg-[#5c854c] rounded-full opacity-10 blur-2xl pointer-events-none"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default FeedbackCTA;
