import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-white py-12 sm:py-20">
            {/* Background stitched container */}
            <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
                <div className="h-full w-full border-[3px] border-dashed border-[#e6decf] rounded-[40px] m-2 sm:m-4" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Text Content Container with Stitched Card Look */}
                    <div className="order-2 lg:order-1 relative p-8 sm:p-12 bg-[#fffaef] rounded-3xl border border-[#d4cbba] shadow-[8px_8px_0px_0px_#d4cbba] transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#d4cbba]">
                        {/* Decorative corner stitches */}
                        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-dashed border-[#8d7c62]"></div>
                        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-dashed border-[#8d7c62]"></div>
                        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-dashed border-[#8d7c62]"></div>
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-dashed border-[#8d7c62]"></div>

                        <div className="sm:text-center lg:text-left">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl tracking-tight font-extrabold text-[#2c3e24] sm:text-5xl md:text-6xl font-serif"
                            >
                                <span className="block xl:inline">100% Natural</span>{' '}
                                <span className="block text-[#a06d40] xl:inline relative inline-block">
                                    Herbal Products
                                    {/* Underline stitch */}
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#a06d40]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                                    </svg>
                                </span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mt-5 text-base text-[#5c5446] sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0 leading-relaxed font-medium"
                            >
                                Discover the healing power of nature with our premium range of organic supplements, teas, and skincare products.
                                Carefully crafted, stitched with love, and sustainably sourced.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mt-8 sm:flex sm:justify-center lg:justify-start gap-4"
                            >
                                <Link
                                    to="/shop"
                                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border-2 border-dashed border-[#4a6b3d] text-base font-bold rounded-xl text-[#fffaef] bg-[#5c854c] hover:bg-[#4a6b3d] md:py-4 md:text-lg md:px-10 transition-all shadow-md group relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center">
                                        Shop Now <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                    </span>
                                </Link>
                                <Link
                                    to="/about"
                                    className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-3 border-2 border-dashed border-[#a06d40] text-base font-bold rounded-xl text-[#a06d40] bg-transparent hover:bg-[#a06d40]/10 md:py-4 md:text-lg md:px-10 transition-all"
                                >
                                    Learn More
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* Image Container with Fabric/Patch Look */}
                    <div className="order-1 lg:order-2 relative mx-auto w-full max-w-md lg:max-w-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-t-[100px] rounded-b-[20px] overflow-hidden border-4 border-[#fffaef] shadow-2xl p-2 bg-[#d4cbba]"
                        >
                            {/* Outer dashed border to simulate a stitched patch */}
                            <div className="absolute inset-1 rounded-t-[96px] rounded-b-[16px] border-2 border-dashed border-[#fffaef]/60 pointer-events-none z-10"></div>

                            <img
                                className="w-full h-[400px] sm:h-[500px] object-cover rounded-t-[90px] rounded-b-[10px]"
                                src="/images/hero_image.png"
                                alt="Premium Layra herbal products"
                            />
                        </motion.div>

                        {/* Decorative floating element */}
                        <motion.div
                            initial={{ opacity: 0, rotate: -10 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-white p-3 sm:p-4 rounded-xl shadow-lg border-2 border-dashed border-[#8d7c62] transform -rotate-6"
                        >
                            <div className="text-center">
                                <span className="block text-xl sm:text-2xl font-bold text-[#5c854c]">100%</span>
                                <span className="block text-xs sm:text-sm font-semibold text-[#a06d40] tracking-wider uppercase">Organic</span>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
