import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useSite } from '../../context/SiteContext';

const Categories = () => {
    const { categories } = useSite();
    return (
        <section className="py-20 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 relative">
                    <h2 className="text-4xl font-extrabold text-[#2c3e24] font-serif sm:text-5xl inline-block relative">
                        Shop by Category
                        <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#a06d40]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" fill="none" />
                        </svg>
                    </h2>
                    <p className="mt-6 max-w-2xl text-lg text-[#5c5446] mx-auto font-medium">
                        Find exactly what you need for your natural lifestyle.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-[#fffaef] rounded-3xl border border-[#d4cbba] shadow-[6px_6px_0px_0px_#d4cbba] hover:shadow-[10px_10px_0px_0px_#d4cbba] hover:-translate-y-1 transition-all duration-300 p-2 overflow-hidden cursor-pointer flex flex-col h-full"
                        >
                            {/* Inner dashed border for patch look */}
                            <div className="absolute inset-2 border-2 border-dashed border-[#d4cbba]/60 rounded-2xl pointer-events-none z-10 transition-colors group-hover:border-[#a06d40]/40"></div>

                            <div className="relative h-56 w-full overflow-hidden rounded-t-[20px] rounded-b-[12px] bg-[#e6decf]">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                />
                                <div className="absolute inset-0 bg-[#2c3e24]/20 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>

                            <div className="flex flex-col items-center justify-center text-center p-6 flex-grow relative z-20">
                                <h3 className="text-2xl font-bold text-[#2c3e24] font-serif mb-2 group-hover:text-[#a06d40] transition-colors">{category.name}</h3>
                                <p className="text-[#5c5446] text-sm font-medium">
                                    {category.description}
                                </p>

                                <div className="mt-4 w-8 h-8 rounded-full bg-[#f4ebd8] flex items-center justify-center text-[#a06d40] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 border border-dashed border-[#a06d40]">
                                    →
                                </div>
                                <Link
                                    to={category.link}
                                    className="absolute inset-0"
                                    aria-label={`Shop ${category.name}`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
