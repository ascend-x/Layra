import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { Mail, Loader2, User } from 'lucide-react';

const UsersAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const q = query(collection(db, 'users'), orderBy('lastLogin', 'desc'));
                const querySnapshot = await getDocs(q);
                const userList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(userList);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

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
                    <h1 className="text-2xl font-bold text-gray-900 font-serif">Customer Directory</h1>
                    <p className="text-sm text-gray-500 mt-1">View users who have logged in via Google.</p>
                </div>
                <div className="bg-[#fffaef] text-[#a06d40] px-4 py-2 rounded-lg border border-[#d4cbba] font-bold">
                    {users.length} Total Users
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#f8f9fa]">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">UID</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Last Login</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-500 font-medium">
                                    No users have signed in yet.
                                </td>
                            </tr>
                        ) : users.map((u) => (
                            <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            {u.photoURL ? (
                                                <img className="h-10 w-10 rounded-full border border-gray-200 object-cover" src={u.photoURL} alt={u.name} />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                    <User size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-bold text-gray-900">{u.name}</div>
                                            <div className="text-sm text-gray-500">{u.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-mono bg-gray-100 text-gray-600 rounded-lg">
                                        {u.uid?.substring(0, 8)}...
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 font-medium">
                                        {u.lastLogin ? format(new Date(u.lastLogin), 'MMM d, yyyy') : 'Unknown'}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {u.lastLogin ? format(new Date(u.lastLogin), 'h:mm a') : ''}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <a
                                        href={`mailto:${u.email}`}
                                        className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
                                    >
                                        <Mail size={16} />
                                        <span>Email</span>
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

export default UsersAdmin;
