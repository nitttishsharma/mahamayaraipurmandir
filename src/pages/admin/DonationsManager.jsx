import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import ImageUploader from '../../components/admin/ImageUploader';
import { Plus, Trash2, Heart, Edit2, X } from 'lucide-react';
import { deleteImageFromStorage } from '../../utils/storageHelpers';
import { useToast } from '../../context/ToastContext';
import ReactDOM from 'react-dom';

const DonationsManager = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const toast = useToast();

    // Form State
    const [formData, setFormData] = useState({
        title_en: '',
        title_hi: '',
        description_en: '',
        description_hi: '',
        goal: '',
        raised: '0',
        days_left: '',
        image_url: ''
    });

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('donations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCampaigns(data || []);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
            toast.error('Error fetching campaigns');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (url) => {
        setFormData(prev => ({ ...prev, image_url: url }));
    };

    const resetForm = () => {
        setFormData({
            title_en: '',
            title_hi: '',
            description_en: '',
            description_hi: '',
            goal: '',
            raised: '0',
            days_left: '',
            image_url: ''
        });
        setEditingId(null);
        setIsEditing(false);
    };

    const handleEdit = (camp) => {
        setFormData({
            title_en: camp.title_en || '',
            title_hi: camp.title_hi || '',
            description_en: camp.description_en || '',
            description_hi: camp.description_hi || '',
            goal: camp.goal || '',
            raised: camp.raised || '0',
            days_left: camp.days_left || '',
            image_url: camp.image_url || ''
        });
        setEditingId(camp.id);
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Update
                const { error } = await supabase
                    .from('donations')
                    .update(formData)
                    .eq('id', editingId);
                if (error) throw error;
                toast.success('Campaign updated successfully!');
            } else {
                // Insert
                const { error } = await supabase
                    .from('donations')
                    .insert([formData]);
                if (error) throw error;
                toast.success('Campaign added successfully!');
            }

            resetForm();
            fetchCampaigns();
        } catch (error) {
            console.error('Error saving campaign:', error);
            toast.error('Error saving campaign: ' + error.message);
        }
    };

    const handleDelete = (id) => {
        toast.confirm('Are you sure you want to delete this donation campaign?', async () => {
            try {
                // 1. Get campaign image
                const { data: campaignToDelete, error: fetchError } = await supabase
                    .from('donations')
                    .select('image_url')
                    .eq('id', id)
                    .single();

                if (fetchError) throw fetchError;

                // 2. Delete Image
                if (campaignToDelete?.image_url) {
                    await deleteImageFromStorage(campaignToDelete.image_url);
                }

                // 3. Delete Record
                const { error } = await supabase.from('donations').delete().eq('id', id);
                if (error) throw error;
                fetchCampaigns();
                toast.success('Campaign deleted successfully');
            } catch (error) {
                console.error(error);
                toast.error('Error deleting campaign');
            }
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-primary">Manage Donations</h2>
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
                >
                    <Plus size={20} /> New Campaign
                </button>
            </div>

            {/* Modal for Add/Edit Form */}
            {isEditing && ReactDOM.createPortal(
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div
                        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeIn custom-scrollbar"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-serif text-primary">
                                {editingId ? 'Edit Donation Campaign' : 'Create New Campaign'}
                            </h3>
                            <button
                                onClick={resetForm}
                                className="text-gray-400 hover:text-gray-600 p-2 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Title (English)</label>
                                        <input type="text" name="title_en" value={formData.title_en} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Description (English)</label>
                                        <textarea name="description_en" value={formData.description_en} onChange={handleInputChange} rows="3" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Goal (₹)</label>
                                            <input type="number" name="goal" value={formData.goal} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Raised (₹)</label>
                                            <input type="number" name="raised" value={formData.raised} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Title (Hindi)</label>
                                        <input type="text" name="title_hi" value={formData.title_hi} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Description (Hindi)</label>
                                        <textarea name="description_hi" value={formData.description_hi} onChange={handleInputChange} rows="3" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Days Left</label>
                                        <input type="number" name="days_left" value={formData.days_left} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-3 font-sans">Campaign Image</label>
                                <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200 hover:border-primary/30 transition-colors">
                                    <ImageUploader onUpload={handleImageUpload} currentImage={formData.image_url} />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-4 border-t border-gray-100 pt-6">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-8 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-10 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all transform hover:-translate-y-0.5"
                                >
                                    {editingId ? 'Update Campaign' : 'Create Campaign'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white rounded-xl h-64 animate-pulse border border-gray-100"></div>
                    ))}
                </div>
            ) : campaigns.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                    <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">No campaigns found</h3>
                    <p className="text-sm text-gray-400 mt-1">Start a new donation drive</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((camp) => {
                        const progress = Math.min(100, Math.round((parseFloat(camp.raised) / parseFloat(camp.goal)) * 100));
                        return (
                            <div key={camp.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
                                <div className="h-44 overflow-hidden bg-gray-50 relative">
                                    {camp.image_url ? (
                                        <img src={camp.image_url} alt={camp.title_en} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-300">
                                            <Heart size={48} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => handleEdit(camp)}
                                            className="bg-white text-primary p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
                                            title="Edit Campaign"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(camp.id)}
                                            className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-all transform hover:-translate-y-1"
                                            title="Delete Campaign"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-serif font-bold text-primary group-hover:text-secondary transition-colors truncate">{camp.title_en}</h3>

                                    <div className="mt-4">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-primary font-bold text-lg">₹{camp.raised}</span>
                                            <span className="text-gray-400 text-xs font-medium">Goal: ₹{camp.goal}</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-secondary transition-all duration-1000 ease-out"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="mt-2 flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">{progress}% Funded</span>
                                            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{camp.days_left} Days Left</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DonationsManager;
