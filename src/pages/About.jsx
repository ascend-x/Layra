import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';

const About = () => {
    const { aboutData } = useSite();

    return (
        <div className="bg-white relative">
            {/* Hero Header */}
            <div className="bg-[#2c3e24] py-24 text-center relative overflow-hidden">
                {/* Decorative background stitches */}
                <div className="absolute inset-4 border-[3px] border-dashed border-[#4a6b3d]/30 rounded-[40px] pointer-events-none"></div>

                <div className="relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold font-serif mb-6 text-[#fffaef]"
                    >
                        Our Story
                    </motion.h1>
                    <p className="text-xl max-w-2xl mx-auto px-4 text-[#e6decf] font-medium tracking-wide">
                        Crafting nature's finest remedies for a healthier you, <span className="text-[#a06d40] border-b border-dashed border-[#a06d40]">stitched</span> together with care.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
                <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <h2 className="text-4xl font-extrabold text-[#2c3e24] font-serif mb-8 inline-block relative">
                            {aboutData.title}
                            <svg className="absolute w-[120%] h-3 -bottom-2 -left-[10%] text-[#a06d40]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" fill="none" />
                            </svg>
                        </h2>
                        <div className="space-y-6 text-[#5c5446] text-lg font-medium">
                            <p className="leading-relaxed">
                                {aboutData.para1}
                            </p>
                            <p className="leading-relaxed">
                                {aboutData.para2}
                            </p>
                            <p className="leading-relaxed">
                                {aboutData.para3}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-12 md:mt-0 relative"
                    >
                        <div className="relative aspect-[4/3] w-full bg-[#fffaef] rounded-3xl border border-[#d4cbba] shadow-[10px_10px_0px_0px_#d4cbba] p-3 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                            {/* Inner dashed patch border */}
                            <div className="absolute inset-3 border-2 border-dashed border-[#d4cbba]/60 rounded-2xl pointer-events-none z-10"></div>

                            <img
                                src={aboutData.image}
                                alt="Herbs processing"
                                className="object-cover w-full h-full rounded-[20px]"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Stats */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-[#fffaef] border-[3px] border-dashed border-[#d4cbba] rounded-[40px] shadow-[8px_8px_0px_0px_#d4cbba] p-12 relative overflow-hidden group">
                    <div className="absolute top-0 left-1/2 -ml-px w-0.5 h-full bg-dashed border-l-2 border-dashed border-[#d4cbba]/50 hidden md:block"></div>
                    <div className="absolute top-1/2 left-0 -mt-px w-full h-0.5 bg-dashed border-t-2 border-dashed border-[#d4cbba]/50 block md:hidden"></div>

                    <div className="relative z-10">
                        <div className="text-5xl font-extrabold text-[#5c854c] font-serif mb-3 drop-shadow-sm">100%</div>
                        <div className="text-[#a06d40] font-bold uppercase tracking-wider text-sm">Organic</div>
                    </div>
                    <div className="relative z-10">
                        <div className="text-5xl font-extrabold text-[#5c854c] font-serif mb-3 drop-shadow-sm">5k+</div>
                        <div className="text-[#a06d40] font-bold uppercase tracking-wider text-sm">Happy Customers</div>
                    </div>
                    <div className="relative z-10">
                        <div className="text-5xl font-extrabold text-[#5c854c] font-serif mb-3 drop-shadow-sm">50+</div>
                        <div className="text-[#a06d40] font-bold uppercase tracking-wider text-sm">Products</div>
                    </div>
                    <div className="relative z-10">
                        <div className="text-5xl font-extrabold text-[#5c854c] font-serif mb-3 drop-shadow-sm">24/7</div>
                        <div className="text-[#a06d40] font-bold uppercase tracking-wider text-sm">Support</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
