import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Search, Download, Filter, RefreshCcw, ExternalLink, Mail, Phone, Clock, CreditCard } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const DonationsReceivedManager = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [stats, setStats] = useState({ count: 0, total_amount: 0 });
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);
    const pageSize = 20;
    const toast = useToast();

    // Filter State
    const [filters, setFilters] = useState({
        fromDate: '',
        toDate: ''
    });

    const fetchPayments = useCallback(async (isLoadMore = false) => {
        try {
            if (isLoadMore) setLoadingMore(true);
            else {
                setLoading(true);
                // We don't reset skip here, we do it in the logic below
            }

            // If it's a fresh fetch, we start from 0. If it's load more, we use current skip.
            const currentSkip = isLoadMore ? skip + pageSize : 0;

            let queryParams = new URLSearchParams();
            queryParams.append('count', pageSize);
            queryParams.append('skip', currentSkip);

            if (filters.fromDate) {
                const fromTs = Math.floor(new Date(filters.fromDate).getTime() / 1000);
                queryParams.append('from', fromTs);
            }

            if (filters.toDate) {
                const toDateObj = new Date(filters.toDate);
                toDateObj.setHours(23, 59, 59, 999);
                const toTs = Math.floor(toDateObj.getTime() / 1000);
                queryParams.append('to', toTs);
            }

            const response = await fetch(`/api/get-payments?${queryParams.toString()}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `Server Error: ${response.status}`);
            }

            const newItems = data.items || [];

            if (isLoadMore) {
                setPayments(prev => [...prev, ...newItems]);
                setSkip(currentSkip);
            } else {
                setPayments(newItems);
                setSkip(0);
            }

            setHasMore(newItems.length === pageSize);

            // Update stats based on what was just loaded + previous items
            if (!isLoadMore) {
                const total = newItems.reduce((acc, curr) => acc + curr.amount, 0);
                setStats({ count: newItems.length, total_amount: total / 100 });
            } else {
                setStats(prev => {
                    const additionalAmount = newItems.reduce((acc, curr) => acc + curr.amount, 0);
                    return {
                        count: prev.count + newItems.length,
                        total_amount: prev.total_amount + (additionalAmount / 100)
                    };
                });
            }

        } catch (error) {
            console.error('Error fetching payments:', error);
            const errorMsg = error.message.includes('Unexpected token')
                ? 'Server configuration error. Please check vercel.json.'
                : error.message;
            toast.error(errorMsg || 'Error connecting to Razorpay API');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [filters, skip, toast]); // Identity changes only if filters/skip/toast changes

    // Only run on mount and when filters change
    useEffect(() => {
        fetchPayments(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({ fromDate: '', toDate: '' });
        // Trigger fetch after clearing is handled via useEffect or manual call
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'captured': return 'bg-green-100 text-green-700 border-green-200';
            case 'failed': return 'bg-red-100 text-red-700 border-red-200';
            case 'refunded': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-serif text-primary">Donations Received</h2>
                    <p className="text-gray-500 text-sm mt-1">Real-time payment data from Razorpay</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
                        <span className="text-xs text-gray-500 block uppercase tracking-wider font-bold">Loaded Total (INR)</span>
                        <span className="text-xl font-bold text-primary">₹{stats.total_amount.toLocaleString('en-IN')}</span>
                    </div>
                    <button
                        onClick={() => fetchPayments(false)}
                        disabled={loading}
                        className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-all shadow-sm"
                        title="Refresh Data"
                    >
                        <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-wrap items-end gap-5">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">From Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="date"
                                name="fromDate"
                                value={filters.fromDate}
                                onChange={handleFilterChange}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-700"
                            />
                        </div>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">To Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="date"
                                name="toDate"
                                value={filters.toDate}
                                onChange={handleFilterChange}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-700"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => fetchPayments(false)}
                            className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md flex items-center gap-2"
                        >
                            <Filter size={18} /> Apply Filters
                        </button>
                        <button
                            onClick={() => {
                                clearFilters();
                                // We wait for a small delay or use a ref/effect to clear and fetch
                                setTimeout(() => fetchPayments(false), 50);
                            }}
                            className="bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-all"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Donor / Contact</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Method</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Cause / Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading && payments.length === 0 ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i}>
                                        <td colSpan="6" className="px-6 py-8">
                                            <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : payments.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-20 text-center text-gray-500 font-medium">
                                        <CreditCard className="mx-auto w-12 h-12 text-gray-200 mb-4" />
                                        No payments found for the selected criteria
                                    </td>
                                </tr>
                            ) : (
                                payments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="font-bold text-gray-800">{payment.notes?.name || 'Anonymous Donor'}</div>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <div className="flex items-center gap-1 text-[11px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                                    <Mail size={10} /> {payment.email}
                                                </div>
                                                <div className="flex items-center gap-1 text-[11px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                                    <Phone size={10} /> {payment.contact}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-lg font-bold text-primary">₹{(payment.amount / 100).toLocaleString('en-IN')}</div>
                                            <div className="text-[10px] text-gray-400 font-mono mt-0.5 uppercase tracking-tighter">{payment.id}</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider shadow-sm ${getStatusColor(payment.status)}`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-sm font-medium text-gray-700 capitalize flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                                                {payment.method}
                                            </div>
                                            {payment.vpa && <div className="text-[10px] text-gray-400 mt-0.5 font-mono">{payment.vpa}</div>}
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Clock size={14} className="text-gray-400" />
                                                {formatDate(payment.created_at)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-sm font-medium text-gray-800 bg-secondary/10 px-2 py-1 rounded inline-block">
                                                {payment.notes?.cause || 'General Donation'}
                                            </div>
                                            {payment.description && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{payment.description}</p>}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {!loading && payments.length > 0 && (
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-col items-center gap-4">
                        <div className="flex justify-between w-full items-center text-xs text-gray-500">
                            <span>Showing {payments.length} transactions</span>
                            <div className="flex gap-2">
                                <span className="italic">Powered by Razorpay Secure API</span>
                            </div>
                        </div>

                        {hasMore && (
                            <button
                                onClick={() => fetchPayments(true)}
                                disabled={loadingMore}
                                className="flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 rounded-xl text-primary font-bold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                            >
                                {loadingMore ? (
                                    <>
                                        <RefreshCcw size={18} className="animate-spin" /> Loading...
                                    </>
                                ) : (
                                    <>
                                        Load Older Transactions
                                    </>
                                )}
                            </button>
                        )}

                        {!hasMore && payments.length > 0 && (
                            <div className="text-sm font-medium text-gray-400 py-2">
                                — End of transaction history —
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonationsReceivedManager;
