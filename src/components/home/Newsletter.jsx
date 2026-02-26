import React from 'react';
import { Send } from 'lucide-react';

const Newsletter = () => {
    return (
        <section className="py-20 bg-[#2c3e24] relative overflow-hidden">
            {/* Decorative stitches */}
            <div className="absolute inset-4 sm:inset-6 border-[3px] border-dashed border-[#4a6b3d]/40 rounded-[40px] pointer-events-none z-0"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="text-4xl font-extrabold text-[#fffaef] font-serif sm:text-5xl mb-6 drop-shadow-md">
                    Join Our Inner Circle
                </h2>
                <p className="text-[#e6decf] text-lg mb-10 max-w-2xl mx-auto font-medium">
                    Subscribe to receive holistic wellness tips, access to exclusive product launches, and 10% off your first order.
                </p>

                <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative flex-grow">
                        <input
                            type="email"
                            placeholder="Your email address"
                            required
                            className="w-full px-6 py-4 rounded-xl bg-[#fffaef]/10 border-2 border-dashed border-[#8d7c62] text-[#fffaef] placeholder-[#a06d40] focus:outline-none focus:border-[#a06d40] transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#a06d40] text-[#fffaef] px-8 py-4 rounded-xl font-bold hover:bg-[#8d7c62] transition-colors flex items-center justify-center border-2 border-dashed border-transparent hover:border-[#fffaef]/30 shadow-md"
                    >
                        <span>Subscribe</span>
                        <Send size={18} className="ml-2" />
                    </button>
                </form>
                <p className="text-[#8d7c62] text-sm mt-4 italic">
                    We respect your privacy. No spam, ever.
                </p>
            </div>
        </section>
    );
};

export default Newsletter;
