import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Loader } from 'lucide-react';

const DonationForm = ({ campaignId, onSuccess }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        amount: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data, error: insertError } = await supabase
                .from('donation_leads')
                .insert([{
                    name: formData.name,
                    phone: formData.phone,
                    amount: formData.amount ? parseFloat(formData.amount) : null,
                    message: formData.message,
                    campaign_id: campaignId
                }])
                .select()
                .single();

            if (insertError) throw insertError;

            // Call success callback with lead ID to reveal bank details
            onSuccess(data.id);
        } catch (err) {
            console.error('Error submitting donation form:', err);
            setError('Failed to submit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-100">
            <div className="flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-secondary mr-2" />
                <h3 className="text-2xl font-serif text-primary">Donation Details</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6 text-center">
                Please provide your details to proceed with the donation
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
                        placeholder="10-digit mobile number"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount (₹) <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
                        placeholder="Enter amount"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none resize-none"
                        placeholder="Your message..."
                    />
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-secondary hover:bg-amber-600 text-white py-3 rounded-full font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            Continue to Bank Details
                            <Heart className="ml-2 w-5 h-5" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default DonationForm;
