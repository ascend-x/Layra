import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const q = query(collection(db, 'newsletter'), where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setStatus('success');
                setEmail('');
                setTimeout(() => setStatus('idle'), 3000);
                return;
            }

            await addDoc(collection(db, 'newsletter'), {
                email: email,
                subscribedAt: new Date().toISOString(),
                source: 'footer'
            });

            // Live backup to Google Sheets
            const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;
            if (WEBHOOK_URL) {
                fetch(WEBHOOK_URL, {
                    method: 'POST', mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'newsletter', email: email, source: 'footer', date: new Date().toISOString() })
                }).catch(() => { });
            }

            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 4000);
        } catch (error) {
            console.error('Newsletter error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

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
                                <MapPin size={22} className="mr-4 text-[#a06d40] flex-shrink-0 mt-1" />
                                <span className="text-[#d4cbba] font-medium leading-relaxed">Jagirammapalayam Salem<br />Tamilnadu India 636302</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={22} className="mr-4 text-[#a06d40] flex-shrink-0" />
                                <span className="text-[#d4cbba] font-medium">6374079511</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={22} className="mr-4 text-[#a06d40] flex-shrink-0" />
                                <span className="text-[#d4cbba] font-medium">thelayrashop@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xl font-bold font-serif mb-6 text-[#a06d40] flex items-center">
                            <span className="w-6 h-0.5 bg-dashed border-t-2 border-dashed border-[#a06d40] mr-2"></span> Newsletter
                        </h3>
                        <p className="text-[#d4cbba] font-medium mb-6 leading-relaxed">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="space-y-4" onSubmit={handleSubscribe}>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    disabled={status === 'loading' || status === 'success'}
                                    required
                                    className={`w-full bg-[#4a6b3d] border-2 border-dashed rounded-xl py-4 px-5 text-[#fffaef] placeholder-[#d4cbba] focus:outline-none transition-colors disabled:opacity-60 ${status === 'error' ? 'border-[#e05a5a] focus:border-[#e05a5a]' : 'border-[#8d7c62] focus:border-[#a06d40]'
                                        }`}
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={`absolute right-2 top-2 bottom-2 px-4 rounded-lg transition-colors flex items-center justify-center text-[#fffaef] ${status === 'success' ? 'bg-[#5c854c]' : 'bg-[#a06d40] hover:bg-[#8d7c62]'
                                        } disabled:opacity-80`}
                                >
                                    {status === 'loading' ? (
                                        <Loader2 size={20} className="animate-spin" />
                                    ) : status === 'success' ? (
                                        <CheckCircle2 size={20} />
                                    ) : (
                                        <ArrowRight size={20} />
                                    )}
                                </button>
                            </div>
                            {status === 'error' && <p className="text-[#e05a5a] text-sm mt-1">Something went wrong.</p>}
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
