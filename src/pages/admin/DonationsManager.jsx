import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import ImageUploader from '../../components/admin/ImageUploader';
import { Plus, Trash2, Heart } from 'lucide-react';
import { deleteImageFromStorage } from '../../utils/storageHelpers';
import { useToast } from '../../context/ToastContext';

const DonationsManager = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
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
            const { data, error } = await supabase.from('donations').select('*').order('created_at', { ascending: false });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('donations').insert([formData]);
            if (error) throw error;
            setFormData({ title_en: '', title_hi: '', description_en: '', description_hi: '', goal: '', raised: '0', days_left: '', image_url: '' });
            setIsEditing(false);
            fetchCampaigns();
            toast.success('Campaign added successfully!');
        } catch (error) {
            toast.error('Error adding campaign: ' + error.message);
        }
    };

    const handleDelete = (id) => {
        toast.confirm('Are you sure?', async () => {
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
                <button onClick={() => setIsEditing(!isEditing)} className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    {isEditing ? 'Cancel' : <><Plus size={20} /> New Campaign</>}
                </button>
            </div>

            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Add Campaign</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Title (English)</label><input type="text" name="title_en" value={formData.title_en} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" required /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Description (English)</label><textarea name="description_en" value={formData.description_en} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" required /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Goal Amount (₹)</label><input type="number" name="goal" value={formData.goal} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" required /></div>
                        </div>
                        <div className="space-y-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Title (Hindi)</label><input type="text" name="title_hi" value={formData.title_hi} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" required /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Description (Hindi)</label><textarea name="description_hi" value={formData.description_hi} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" required /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Days Left</label><input type="number" name="days_left" value={formData.days_left} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" required /></div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Image</label>
                            <div className="max-w-md">
                                <ImageUploader onUpload={handleImageUpload} currentImage={formData.image_url} />
                            </div>
                        </div>

                        <div className="col-span-2 flex justify-end gap-3 mt-4">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg border border-gray-300 bg-white">Cancel</button>
                            <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">Save Campaign</button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading campaigns...</div>
            ) : campaigns.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No campaigns found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((camp) => (
                        <div key={camp.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="h-40 overflow-hidden bg-gray-100">
                                {camp.image_url && <img src={camp.image_url} alt={camp.title_en} className="w-full h-full object-cover" />}
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800">{camp.title_en}</h3>
                                <div className="mt-4 flex justify-between items-center text-sm">
                                    <span className="text-primary font-semibold">₹{camp.raised} / ₹{camp.goal}</span>
                                    <button onClick={() => handleDelete(camp.id)} className="text-red-400 hover:text-red-600">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DonationsManager;
