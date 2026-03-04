import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { Mail, Loader2, Send } from 'lucide-react';

const NewsletterAdmin = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const q = query(collection(db, 'newsletter'), orderBy('subscribedAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const subList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSubscribers(subList);
            } catch (error) {
                console.error("Error fetching newsletter subscribers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscribers();
    }, []);

    const handleMassEmail = () => {
        if (subscribers.length === 0) return;

        // Extract plain emails, filter out missing ones, separate by commas for BCC
        const bccList = subscribers
            .map(sub => sub.email)
            .filter(email => !!email)
            .join(',');

        // Fire up native email client
        window.location.href = `mailto:?bcc=${bccList}&subject=Updates from Layra`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 text-[#a06d40]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-serif">Newsletter Marketing</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and email your subscribers.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-[#fffaef] text-[#a06d40] px-4 py-3 rounded-lg border border-[#d4cbba] font-bold">
                        {subscribers.length} Subscribers
                    </div>
                    <button
                        onClick={handleMassEmail}
                        disabled={subscribers.length === 0}
                        className="flex items-center space-x-2 bg-[#a06d40] text-white px-6 py-3 rounded-lg hover:bg-[#8d7c62] transition-colors font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={18} />
                        <span>Email Everyone (BCC)</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#f8f9fa]">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Subscriber Email</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Source Form</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Subscribed Date</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Quick Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {subscribers.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-500 font-medium">
                                    No newsletter subscribers yet.
                                </td>
                            </tr>
                        ) : subscribers.map((sub) => (
                            <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-gray-100 p-2 rounded-lg text-gray-400">
                                            <Mail size={16} />
                                        </div>
                                        <div className="text-sm font-bold text-gray-900">{sub.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-lg ${sub.source === 'footer' ? 'bg-purple-100 text-purple-700' : 'bg-[#5c854c]/20 text-[#2c3e24]'
                                        }`}>
                                        {sub.source === 'footer' ? 'Footer Menu' : 'Homepage Form'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 font-medium">
                                        {sub.subscribedAt ? format(new Date(sub.subscribedAt), 'MMM d, yyyy') : 'Unknown'}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {sub.subscribedAt ? format(new Date(sub.subscribedAt), 'h:mm a') : ''}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <a
                                        href={`mailto:${sub.email}`}
                                        className="text-gray-400 hover:text-[#a06d40] transition-colors p-2"
                                        title="Send direct email"
                                    >
                                        <Mail size={18} className="inline-block" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NewsletterAdmin;
