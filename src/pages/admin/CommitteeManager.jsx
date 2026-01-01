import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import ImageUploader from '../../components/admin/ImageUploader';
import { Plus, Trash2, User } from 'lucide-react';

const CommitteeManager = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name_en: '',
        name_hi: '',
        role_en: '',
        role_hi: '',
        image_url: '',
        member_order: 0
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('committee')
                .select('*')
                .order('member_order', { ascending: true });

            if (error) throw error;
            setMembers(data || []);
        } catch (error) {
            console.error('Error fetching members:', error);
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
            const { error } = await supabase
                .from('committee')
                .insert([formData]);

            if (error) throw error;

            setFormData({ name_en: '', name_hi: '', role_en: '', role_hi: '', image_url: '', member_order: 0 });
            setIsEditing(false);
            fetchMembers();
            alert('Member added successfully!');
        } catch (error) {
            alert('Error adding member: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const { error } = await supabase.from('committee').delete().eq('id', id);
            if (error) throw error;
            fetchMembers();
        } catch (error) {
            alert('Error deleting member');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-primary">Manage Committee</h2>
                <button onClick={() => setIsEditing(!isEditing)} className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    {isEditing ? 'Cancel' : <><Plus size={20} /> Add Member</>}
                </button>
            </div>

            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Add Committee Member</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name (English)</label>
                                <input type="text" name="name_en" value={formData.name_en} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role (English)</label>
                                <input type="text" name="role_en" value={formData.role_en} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                                <input type="number" name="member_order" value={formData.member_order} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name (Hindi)</label>
                                <input type="text" name="name_hi" value={formData.name_hi} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role (Hindi)</label>
                                <input type="text" name="role_hi" value={formData.role_hi} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" required />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                            <div className="max-w-md">
                                <ImageUploader onUpload={handleImageUpload} currentImage={formData.image_url} />
                            </div>
                        </div>

                        <div className="col-span-2 flex justify-end gap-3 mt-4">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg border border-gray-300 bg-white">Cancel</button>
                            <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">Save Member</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Members List */}
            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading members...</div>
            ) : members.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No members found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((member) => (
                        <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                {member.image_url ? (
                                    <img src={member.image_url} alt={member.name_en} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-full h-full p-3 text-gray-400" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-800 truncate">{member.name_en}</h3>
                                <p className="text-sm text-gray-500 truncate">{member.role_en}</p>
                            </div>
                            <button onClick={() => handleDelete(member.id)} className="text-red-400 hover:text-red-600">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommitteeManager;
