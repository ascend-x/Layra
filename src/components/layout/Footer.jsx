import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative bg-[#2c3e24] text-[#fffaef] pt-20 pb-10 overflow-hidden">
            {/* Background dashed border to simulate interior patch stitch */}
            <div className="absolute inset-4 sm:inset-6 border-[3px] border-dashed border-[#5c854c] rounded-3xl pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto px-8 sm:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link to="/" className="text-3xl font-bold text-[#fffaef] font-serif tracking-tight flex items-center">
                            Layra<span className="text-[#a06d40] text-4xl leading-none">.</span>
                        </Link>
                        <p className="text-[#d4cbba] text-base leading-relaxed font-medium">
                            Discover the power of nature with our premium herbal products. Crafted with care and stitched with love for your well-being.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="bg-[#4a6b3d] p-3 rounded-xl border border-dashed border-[#8d7c62] hover:bg-[#a06d40] hover:border-[#fffaef] transition-all">
                                <Facebook size={20} className="text-[#fffaef]" />
                            </a>
                            <a href="#" className="bg-[#4a6b3d] p-3 rounded-xl border border-dashed border-[#8d7c62] hover:bg-[#a06d40] hover:border-[#fffaef] transition-all">
                                <Twitter size={20} className="text-[#fffaef]" />
                            </a>
                            <a href="#" className="bg-[#4a6b3d] p-3 rounded-xl border border-dashed border-[#8d7c62] hover:bg-[#a06d40] hover:border-[#fffaef] transition-all">
                                <Instagram size={20} className="text-[#fffaef]" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold font-serif mb-6 text-[#a06d40] flex items-center">
                            <span className="w-6 h-0.5 bg-dashed border-t-2 border-dashed border-[#a06d40] mr-2"></span> Quick Links
                        </h3>
                        <ul className="space-y-4 font-medium">
                            <li><Link to="/shop" className="text-[#d4cbba] hover:text-[#a06d40] hover:pl-2 transition-all inline-block">Shop Now</Link></li>
                            <li><Link to="/about" className="text-[#d4cbba] hover:text-[#a06d40] hover:pl-2 transition-all inline-block">About Us</Link></li>
                            <li><Link to="/contact" className="text-[#d4cbba] hover:text-[#a06d40] hover:pl-2 transition-all inline-block">Contact Us</Link></li>
                            <li><Link to="/faq" className="text-[#d4cbba] hover:text-[#a06d40] hover:pl-2 transition-all inline-block">FAQ</Link></li>
                            <li><Link to="/privacy" className="text-[#d4cbba] hover:text-[#a06d40] hover:pl-2 transition-all inline-block">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold font-serif mb-6 text-[#a06d40] flex items-center">
                            <span className="w-6 h-0.5 bg-dashed border-t-2 border-dashed border-[#a06d40] mr-2"></span> Contact Us
                        </h3>
                        <ul className="space-y-5">
                            <li className="flex items-start">
                                <MapPin size={22} className="mr-4 text-[#a06d40] flex-shrink-0" />
                                <span className="text-[#d4cbba] font-medium leading-relaxed">123 Herbal Lane, Green City, Earth 40404</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={22} className="mr-4 text-[#a06d40] flex-shrink-0" />
                                <span className="text-[#d4cbba] font-medium">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={22} className="mr-4 text-[#a06d40] flex-shrink-0" />
                                <span className="text-[#d4cbba] font-medium">hello@layraherbal.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xl font-bold font-serif mb-6 text-[#a06d40] flex items-center">
                            <span className="w-6 h-0.5 bg-dashed border-t-2 border-dashed border-[#a06d40] mr-2"></span> Newsletter
                        </h3>
                        <p className="text-[#d4cbba] font-medium mb-6 leading-relaxed">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full bg-[#4a6b3d] border-2 border-dashed border-[#8d7c62] rounded-xl py-4 px-5 text-[#fffaef] placeholder-[#d4cbba] focus:outline-none focus:border-[#a06d40] font-medium transition-colors"
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-2 bottom-2 bg-[#a06d40] px-4 rounded-lg hover:bg-[#8d7c62] transition-colors flex items-center justify-center text-[#fffaef]"
                                >
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="border-t-2 border-dashed border-[#4a6b3d] mt-16 pt-8 text-center text-[#d4cbba] font-semibold flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p>&copy; {new Date().getFullYear()} Layra Herbal Products. All rights reserved.</p>
                    <div className="flex items-center space-x-2">
                        <span>Made with</span>
                        <span className="text-[#a06d40]">❤</span>
                        <span>and Nature</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
