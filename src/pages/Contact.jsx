import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-white py-20 relative">
            {/* Top decorative stitch pattern */}
            <div className="absolute top-0 left-0 w-full h-2 border-b-2 border-dashed border-[#e6decf]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20 relative">
                    <h1 className="text-4xl font-extrabold text-[#2c3e24] font-serif sm:text-5xl inline-block relative">
                        Get in Touch
                        <svg className="absolute w-[120%] h-3 -bottom-2 -left-[10%] text-[#a06d40]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" fill="none" />
                        </svg>
                    </h1>
                    <p className="mt-6 text-xl text-[#5c5446] font-medium">We'd love to hear from you. Send us a message!</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 bg-[#fffaef] rounded-3xl border border-[#d4cbba] shadow-[6px_6px_0px_0px_#d4cbba] hover:shadow-[10px_10px_0px_0px_#d4cbba] transition-shadow p-8 h-full relative group">
                        {/* Decorative patch stitches */}
                        <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-dashed border-[#8d7c62]"></div>
                        <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-dashed border-[#8d7c62]"></div>

                        <h3 className="text-2xl font-bold font-serif text-[#2c3e24] mb-8 border-b-2 border-dashed border-[#d4cbba] pb-4">Contact Information</h3>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="bg-[#5c854c]/10 border border-dashed border-[#5c854c]/30 p-3.5 rounded-xl text-[#5c854c] shadow-sm transform group-hover:rotate-6 transition-transform">
                                    <Mail size={24} />
                                </div>
                                <div className="ml-5">
                                    <p className="font-bold text-[#2c3e24] text-lg mb-1">Email Us</p>
                                    <p className="text-[#8d7c62] font-medium">hello@layraherbal.com</p>
                                    <p className="text-[#8d7c62] font-medium">support@layraherbal.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-[#a06d40]/10 border border-dashed border-[#a06d40]/30 p-3.5 rounded-xl text-[#a06d40] shadow-sm transform group-hover:-rotate-6 transition-transform">
                                    <Phone size={24} />
                                </div>
                                <div className="ml-5">
                                    <p className="font-bold text-[#2c3e24] text-lg mb-1">Call Us</p>
                                    <p className="text-[#8d7c62] font-medium">+1 (555) 123-4567</p>
                                    <p className="text-[#8d7c62] font-medium">Mon - Fri, 9am - 6pm</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-[#5c854c]/10 border border-dashed border-[#5c854c]/30 p-3.5 rounded-xl text-[#5c854c] shadow-sm transform group-hover:rotate-6 transition-transform">
                                    <MapPin size={24} />
                                </div>
                                <div className="ml-5">
                                    <p className="font-bold text-[#2c3e24] text-lg mb-1">Visit Us</p>
                                    <p className="text-[#8d7c62] font-medium">123 Herbal Lane</p>
                                    <p className="text-[#8d7c62] font-medium">Green City, Earth 40404</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-[#fffaef] rounded-3xl border-[3px] border-dashed border-[#d4cbba] shadow-[6px_6px_0px_0px_#d4cbba] hover:shadow-[10px_10px_0px_0px_#d4cbba] transition-shadow p-10 relative">
                        <form className="space-y-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-[#5c5446] mb-2 tracking-wide uppercase">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="block w-full rounded-xl border-2 border-dashed border-[#d4cbba] bg-white p-4 text-[#2c3e24] font-medium outline-none focus:border-[#a06d40] focus:ring-4 focus:ring-[#a06d40]/10 transition-all shadow-inner"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-[#5c5446] mb-2 tracking-wide uppercase">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="block w-full rounded-xl border-2 border-dashed border-[#d4cbba] bg-white p-4 text-[#2c3e24] font-medium outline-none focus:border-[#a06d40] focus:ring-4 focus:ring-[#a06d40]/10 transition-all shadow-inner"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-bold text-[#5c5446] mb-2 tracking-wide uppercase">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="block w-full rounded-xl border-2 border-dashed border-[#d4cbba] bg-white p-4 text-[#2c3e24] font-medium outline-none focus:border-[#a06d40] focus:ring-4 focus:ring-[#a06d40]/10 transition-all shadow-inner"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-[#5c5446] mb-2 tracking-wide uppercase">Message</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="block w-full rounded-xl border-2 border-dashed border-[#d4cbba] bg-white p-4 text-[#2c3e24] font-medium outline-none focus:border-[#a06d40] focus:ring-4 focus:ring-[#a06d40]/10 transition-all shadow-inner resize-none"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-[#5c854c] border-2 border-dashed border-[#4a6b3d] rounded-xl shadow-md font-bold text-lg text-[#fffaef] hover:bg-[#4a6b3d] transition-all active:scale-[0.98]"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Send Message <Send className="ml-3" size={20} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
