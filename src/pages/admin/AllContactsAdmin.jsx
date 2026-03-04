import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Loader2, Download, Search, CloudUpload, CheckCircle2 } from 'lucide-react';

const AllContactsAdmin = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, synced, error

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const map = new Map(); // key = email, value = contact object

                // 1. Users (Google Sign-In)
                const usersSnap = await getDocs(collection(db, 'users'));
                usersSnap.docs.forEach(doc => {
                    const d = doc.data();
                    if (d.email) {
                        const existing = map.get(d.email) || {};
                        map.set(d.email, {
                            ...existing,
                            email: d.email,
                            name: d.name || existing.name || '',
                            phone: existing.phone || '',
                            sources: [...(existing.sources || []), 'Google Auth'],
                        });
                    }
                });

                // 2. Contact Messages
                const contactSnap = await getDocs(collection(db, 'contact_messages'));
                contactSnap.docs.forEach(doc => {
                    const d = doc.data();
                    if (d.email) {
                        const existing = map.get(d.email) || {};
                        map.set(d.email, {
                            ...existing,
                            email: d.email,
                            name: d.name || existing.name || '',
                            phone: existing.phone || '',
                            sources: [...new Set([...(existing.sources || []), 'Contact Form'])],
                        });
                    }
                });

                // 3. Newsletter
                const newsSnap = await getDocs(collection(db, 'newsletter'));
                newsSnap.docs.forEach(doc => {
                    const d = doc.data();
                    if (d.email) {
                        const existing = map.get(d.email) || {};
                        map.set(d.email, {
                            ...existing,
                            email: d.email,
                            name: existing.name || '',
                            phone: existing.phone || '',
                            sources: [...new Set([...(existing.sources || []), 'Newsletter'])],
                        });
                    }
                });

                // 4. Feedback (this is where phone numbers come from)
                const feedSnap = await getDocs(collection(db, 'feedback'));
                feedSnap.docs.forEach(doc => {
                    const d = doc.data();
                    if (d.email) {
                        const existing = map.get(d.email) || {};
                        map.set(d.email, {
                            ...existing,
                            email: d.email,
                            name: d.name || existing.name || '',
                            phone: d.phone || existing.phone || '',
                            sources: [...new Set([...(existing.sources || []), 'Feedback'])],
                        });
                    }
                });

                const all = Array.from(map.values());
                all.sort((a, b) => a.name.localeCompare(b.name));
                setContacts(all);

                // Auto-sync merged contact list to Google Sheets
                // SAFETY: Only sync if there are contacts. If Firebase is accidentally
                // cleared, this prevents overwriting the Sheets backup with empty data.
                const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;
                if (WEBHOOK_URL && all.length > 0) {
                    setSyncStatus('syncing');
                    try {
                        await fetch(WEBHOOK_URL, {
                            method: 'POST', mode: 'no-cors',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                type: 'all_contacts_sync',
                                contactCount: all.length, // used by Apps Script for safety check
                                contacts: all.map(c => ({
                                    name: c.name,
                                    email: c.email,
                                    phone: c.phone,
                                    sources: c.sources.join(', ')
                                })),
                                date: new Date().toISOString()
                            })
                        });
                        setSyncStatus('synced');
                    } catch {
                        setSyncStatus('error');
                    }
                } else if (all.length === 0) {
                    // Database appears empty — do NOT sync to avoid wiping the Sheets backup
                    setSyncStatus('idle');
                }
            } catch (error) {
                console.error("Error fetching contacts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exportCSV = () => {
        const header = 'Name,Email,Phone,Sources\n';
        const rows = contacts.map(c =>
            `"${c.name}","${c.email}","${c.phone}","${c.sources.join(', ')}"`
        ).join('\n');
        const blob = new Blob([header + rows], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `layra_contacts_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-serif">All Contacts</h1>
                    <p className="text-sm text-gray-500 mt-1">Unified directory from all sources, deduplicated by email.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-[#fffaef] text-[#a06d40] px-4 py-2 rounded-lg border border-[#d4cbba] font-bold">
                        {contacts.length} Contacts
                    </div>
                    {syncStatus === 'syncing' && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500">
                            <CloudUpload size={14} className="animate-pulse" /> Syncing to Sheets...
                        </span>
                    )}
                    {syncStatus === 'synced' && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                            <CheckCircle2 size={14} /> Synced to Sheets
                        </span>
                    )}
                    {syncStatus === 'error' && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-red-500">
                            Sync failed
                        </span>
                    )}
                    <button
                        onClick={exportCSV}
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                    >
                        <Download size={16} />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, email, or phone..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 focus:border-[#a06d40] focus:outline-none transition-colors"
                />
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#f8f9fa]">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Sources</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-500 font-medium">
                                    No contacts found.
                                </td>
                            </tr>
                        ) : filtered.map((c, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{c.name || '—'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{c.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{c.phone || '—'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex gap-1 flex-wrap">
                                        {c.sources.map((s, j) => (
                                            <span key={j} className={`px-2 py-0.5 text-xs font-bold rounded-full ${s === 'Google Auth' ? 'bg-blue-100 text-blue-700' :
                                                s === 'Newsletter' ? 'bg-purple-100 text-purple-700' :
                                                    s === 'Contact Form' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-green-100 text-green-700'
                                                }`}>
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllContactsAdmin;
