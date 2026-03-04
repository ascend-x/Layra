import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { Mail, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

const MessagesAdmin = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState(new Set());

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const q = query(collection(db, 'contact_messages'), orderBy('submittedAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const msgs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMessages(msgs);
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const toggleRow = (id) => {
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(id)) {
            newExpandedRows.delete(id);
        } else {
            newExpandedRows.add(id);
        }
        setExpandedRows(newExpandedRows);
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
                    <h1 className="text-2xl font-bold text-gray-900 font-serif">Contact Messages</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and reply to customer inquiries.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#f8f9fa]">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Sender</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {messages.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium">
                                    No contact messages yet.
                                </td>
                            </tr>
                        ) : messages.map((msg) => (
                            <React.Fragment key={msg.id}>
                                <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => toggleRow(msg.id)}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-900">{msg.name}</div>
                                        <div className="text-sm text-gray-500">{msg.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 font-medium line-clamp-1">{msg.subject}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {msg.submittedAt ? format(new Date(msg.submittedAt), 'MMM d, yyyy h:mm a') : 'Unknown Date'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <a
                                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm"
                                        >
                                            <Mail size={16} />
                                            <span>Reply</span>
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-400">
                                        {expandedRows.has(msg.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </td>
                                </tr>
                                {expandedRows.has(msg.id) && (
                                    <tr className="bg-[#fffaef]/30">
                                        <td colSpan="5" className="px-6 py-6 border-b border-gray-100">
                                            <div className="bg-white p-6 rounded-xl border border-dashed border-[#d4cbba] shadow-sm">
                                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Message Content</h4>
                                                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                                    {msg.message}
                                                </p>
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

export default MessagesAdmin;
