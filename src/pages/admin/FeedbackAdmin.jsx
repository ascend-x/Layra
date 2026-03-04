import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { Star, Loader2, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';

const FeedbackAdmin = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedRow, setExpandedRow] = useState(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const q = query(collection(db, 'feedback'), orderBy('date', 'desc'));
                const querySnapshot = await getDocs(q);
                const list = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFeedbacks(list);
            } catch (error) {
                console.error("Error fetching feedback:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, []);

    const toggleRow = (id) => {
        if (expandedRow === id) {
            setExpandedRow(null);
        } else {
            setExpandedRow(id);
        }
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
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-serif">Customer Feedback</h1>
                    <p className="text-sm text-gray-500 mt-1">View product reviews and testimonials.</p>
                </div>
                <div className="bg-[#fffaef] text-[#a06d40] px-4 py-2 rounded-lg border border-[#d4cbba] font-bold">
                    {feedbacks.length} Reviews
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#f8f9fa]">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/4">Customer</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {feedbacks.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium">
                                    No feedback has been submitted yet.
                                </td>
                            </tr>
                        ) : feedbacks.map((item) => (
                            <React.Fragment key={item.id}>
                                <tr
                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => toggleRow(item.id)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-900">{item.name}</div>
                                        <div className="text-sm text-gray-500">{item.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 max-w-[200px] truncate">{item.product}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} className={i < item.rating ? "fill-current" : "text-gray-300"} />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.date ? format(new Date(item.date), 'MMM d, yyyy') : 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                            {expandedRow === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                    </td>
                                </tr>

                                {expandedRow === item.id && (
                                    <tr className="bg-[#fffaef]/30 border-b border-gray-100">
                                        <td colSpan="5" className="px-6 py-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="md:col-span-2 space-y-4">
                                                    <div>
                                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Review</h4>
                                                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{item.feedback}</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Customer Info</h4>
                                                        <ul className="text-sm text-gray-600 space-y-1">
                                                            <li><span className="font-medium">Age:</span> {item.age || 'N/A'}</li>
                                                            <li><span className="font-medium">Phone:</span> {item.phone || 'N/A'}</li>
                                                            <li><span className="font-medium">IG Consent:</span> {item.instagramConsent}</li>
                                                            <li className="pt-2">
                                                                {item.hasMediaAttached ? (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                                                                        <ImageIcon size={14} />
                                                                        Media in Drive
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded">
                                                                        No Media
                                                                    </span>
                                                                )}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeedbackAdmin;
