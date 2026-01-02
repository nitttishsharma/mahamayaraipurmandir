import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Heart, Phone, User, Calendar, DollarSign, MessageSquare } from 'lucide-react';

const DonationLeadsManager = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('donation_leads')
                .select(`
                    *,
                    donations (
                        title_en,
                        title_hi
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLeads(data || []);
        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-primary">Donation Leads</h2>
                <div className="text-sm text-gray-500">
                    Total Leads: <span className="font-bold text-primary">{leads.length}</span>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading leads...</div>
            ) : leads.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No donation leads yet.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Campaign
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Message
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Screenshot
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <User className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-sm font-medium text-gray-900">{lead.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Phone className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-sm text-gray-700">{lead.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {lead.amount ? `₹${lead.amount}` : '-'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-700">
                                                {lead.donations?.title_en || 'General Donation'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {lead.message ? (
                                                <div className="flex items-start max-w-xs">
                                                    <MessageSquare className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm text-gray-600 line-clamp-2">{lead.message}</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {lead.payment_screenshot ? (
                                                <a
                                                    href={lead.payment_screenshot}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                                                >
                                                    View Screenshot
                                                </a>
                                            ) : (
                                                <span className="text-sm text-gray-400">Not uploaded</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-xs text-gray-500">{formatDate(lead.created_at)}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationLeadsManager;
