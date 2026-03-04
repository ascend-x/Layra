import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            // Check if email already exists
            const q = query(collection(db, 'newsletter'), where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Email already subscribed
                setStatus('success');
                setEmail('');
                setTimeout(() => setStatus('idle'), 3000);
                return;
            }

            await addDoc(collection(db, 'newsletter'), {
                email: email,
                subscribedAt: new Date().toISOString()
            });
            setStatus('success');
            setEmail('');

            // Reset success message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            setStatus('error');
            // Revert back to idle after a bit
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

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

                <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
                    <div className="relative flex-grow">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            required
                            disabled={status === 'loading' || status === 'success'}
                            className="w-full px-6 py-4 rounded-xl bg-[#fffaef]/10 border-2 border-dashed border-[#8d7c62] text-[#fffaef] placeholder-[#a06d40] focus:outline-none focus:border-[#a06d40] transition-colors disabled:opacity-50"
                        />
                    </div>

                    {status === 'success' ? (
                        <div className="bg-[#5c854c] text-[#fffaef] px-8 py-4 rounded-xl font-bold flex items-center justify-center border-2 border-dashed border-transparent shadow-md">
                            <span>Welcome!</span>
                            <CheckCircle2 size={18} className="ml-2" />
                        </div>
                    ) : (
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="bg-[#a06d40] text-[#fffaef] px-8 py-4 rounded-xl font-bold hover:bg-[#8d7c62] transition-colors flex items-center justify-center border-2 border-dashed border-transparent hover:border-[#fffaef]/30 shadow-md disabled:opacity-70"
                        >
                            {status === 'loading' ? (
                                <>
                                    <span>Joining...</span>
                                    <Loader2 size={18} className="ml-2 animate-spin" />
                                </>
                            ) : (
                                <>
                                    <span>Subscribe</span>
                                    <Send size={18} className="ml-2" />
                                </>
                            )}
                        </button>
                    )}
                </form>

                {status === 'error' && (
                    <p className="text-[#e05a5a] text-sm mt-4 font-bold">Something went wrong. Please try again.</p>
                )}

                <p className="text-[#8d7c62] text-sm mt-4 italic">
                    We respect your privacy. No spam, ever.
                </p>
            </div>
        </section>
    );
};

export default Newsletter;
