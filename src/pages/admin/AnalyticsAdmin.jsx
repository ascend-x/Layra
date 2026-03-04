import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Loader2, Users, Star, ShoppingBag, TrendingUp } from 'lucide-react';

const AnalyticsAdmin = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalCustomers: 0,
        totalReviews: 0,
        avgRating: 0,
        avgAge: 0,
        productBreakdown: [],
        ratingDistribution: [0, 0, 0, 0, 0], // index 0 = 1-star etc
    });

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                // Fetch all collections in parallel
                const [usersSnap, feedbackSnap, newsletterSnap] = await Promise.all([
                    getDocs(collection(db, 'users')),
                    getDocs(collection(db, 'feedback')),
                    getDocs(collection(db, 'newsletter')),
                ]);

                const totalCustomers = usersSnap.size;
                const totalSubscribers = newsletterSnap.size;
                const feedbacks = feedbackSnap.docs.map(d => d.data());
                const totalReviews = feedbacks.length;

                // Average rating
                const totalRating = feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0);
                const avgRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;

                // Average age
                const ages = feedbacks.filter(f => f.age && !isNaN(Number(f.age))).map(f => Number(f.age));
                const avgAge = ages.length > 0 ? Math.round(ages.reduce((s, a) => s + a, 0) / ages.length) : 0;

                // Rating distribution
                const ratingDist = [0, 0, 0, 0, 0];
                feedbacks.forEach(f => {
                    if (f.rating >= 1 && f.rating <= 5) ratingDist[f.rating - 1]++;
                });

                // Product breakdown
                const productMap = {};
                feedbacks.forEach(f => {
                    const p = f.product || 'Unknown';
                    if (!productMap[p]) productMap[p] = { name: p, count: 0, totalRating: 0 };
                    productMap[p].count++;
                    productMap[p].totalRating += (f.rating || 0);
                });
                const productBreakdown = Object.values(productMap)
                    .map(p => ({ ...p, avgRating: (p.totalRating / p.count).toFixed(1) }))
                    .sort((a, b) => b.count - a.count);

                setStats({
                    totalCustomers,
                    totalSubscribers,
                    totalReviews,
                    avgRating,
                    avgAge,
                    productBreakdown,
                    ratingDistribution: ratingDist,
                });
            } catch (error) {
                console.error("Error fetching analytics:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 text-[#a06d40]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    const maxRatingCount = Math.max(...stats.ratingDistribution, 1);

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900 font-serif">Analytics Overview</h1>
                <p className="text-sm text-gray-500 mt-1">Key metrics from your customer base and feedback.</p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-blue-50 p-2 rounded-lg"><Users size={20} className="text-blue-600" /></div>
                        <span className="text-sm font-medium text-gray-500">Verified Customers</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-yellow-50 p-2 rounded-lg"><Star size={20} className="text-yellow-600" /></div>
                        <span className="text-sm font-medium text-gray-500">Avg Rating</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.avgRating}<span className="text-lg text-gray-400">/5.0</span></p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-green-50 p-2 rounded-lg"><ShoppingBag size={20} className="text-green-600" /></div>
                        <span className="text-sm font-medium text-gray-500">Total Reviews</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalReviews}</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-purple-50 p-2 rounded-lg"><TrendingUp size={20} className="text-purple-600" /></div>
                        <span className="text-sm font-medium text-gray-500">Avg Customer Age</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.avgAge || '—'} <span className="text-lg text-gray-400">yrs</span></p>
                </div>
            </div>

            {/* Rating Distribution */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 font-serif mb-4">Rating Distribution</h2>
                <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = stats.ratingDistribution[star - 1];
                        const pct = (count / maxRatingCount) * 100;
                        return (
                            <div key={star} className="flex items-center gap-3">
                                <span className="text-sm font-bold text-gray-600 w-12 flex items-center gap-1">
                                    {star} <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                </span>
                                <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                                <span className="text-sm font-bold text-gray-600 w-8 text-right">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Product Breakdown */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 font-serif">Product Review Breakdown</h2>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#f8f9fa]">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Reviews</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Avg Rating</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {stats.productBreakdown.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="px-6 py-12 text-center text-gray-500 font-medium">No product data yet.</td>
                            </tr>
                        ) : stats.productBreakdown.map((p, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-bold text-gray-900">{p.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{p.count}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-bold text-gray-900">{p.avgRating}</span>
                                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
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

export default AnalyticsAdmin;
