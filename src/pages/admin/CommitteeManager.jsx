import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import ImageUploader from '../../components/admin/ImageUploader';
import { Plus, Trash2, User, Edit2, X } from 'lucide-react';
import { deleteImageFromStorage } from '../../utils/storageHelpers';
import { useToast } from '../../context/ToastContext';
import ReactDOM from 'react-dom';

const CommitteeManager = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const toast = useToast();

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
            toast.error('Error fetching members');
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
            name_en: '',
            name_hi: '',
            role_en: '',
            role_hi: '',
            image_url: '',
            member_order: 0
        });
        setEditingId(null);
        setIsEditing(false);
    };

    const handleEdit = (member) => {
        setFormData({
            name_en: member.name_en || '',
            name_hi: member.name_hi || '',
            role_en: member.role_en || '',
            role_hi: member.role_hi || '',
            image_url: member.image_url || '',
            member_order: member.member_order || 0
        });
        setEditingId(member.id);
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Update
                const { error } = await supabase
                    .from('committee')
                    .update(formData)
                    .eq('id', editingId);
                if (error) throw error;
                toast.success('Member updated successfully!');
            } else {
                // Insert
                const { error } = await supabase
                    .from('committee')
                    .insert([formData]);
                if (error) throw error;
                toast.success('Member added successfully!');
            }

            resetForm();
            fetchMembers();
        } catch (error) {
            console.error('Error saving member:', error);
            toast.error('Error saving member: ' + error.message);
        }
    };

    const handleDelete = (id) => {
        toast.confirm('Are you sure you want to delete this committee member?', async () => {
            try {
                // 1. Get member data (for image)
                const { data: memberToDelete, error: fetchError } = await supabase
                    .from('committee')
                    .select('image_url')
                    .eq('id', id)
                    .single();

                if (fetchError) throw fetchError;

                // 2. Delete Image
                if (memberToDelete?.image_url) {
                    await deleteImageFromStorage(memberToDelete.image_url);
                }

                // 3. Delete Record
                const { error } = await supabase.from('committee').delete().eq('id', id);
                if (error) throw error;
                fetchMembers();
                toast.success('Member deleted successfully');
            } catch (error) {
                console.error(error);
                toast.error('Error deleting member');
            }
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-primary">Manage Committee</h2>
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
                >
                    <Plus size={20} /> Add Member
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
                                {editingId ? 'Edit Committee Member' : 'Add New Member'}
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Name (English)</label>
                                        <input type="text" name="name_en" value={formData.name_en} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Role (English)</label>
                                        <input type="text" name="role_en" value={formData.role_en} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Display Order</label>
                                        <input type="number" name="member_order" value={formData.member_order} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="e.g. 1" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Name (Hindi)</label>
                                        <input type="text" name="name_hi" value={formData.name_hi} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Role (Hindi)</label>
                                        <input type="text" name="role_hi" value={formData.role_hi} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-3 font-sans">Profile Photo</label>
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
                                    {editingId ? 'Update Member' : 'Save Member'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {/* Members List */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white rounded-2xl h-64 animate-pulse border border-gray-100"></div>
                    ))}
                </div>
            ) : members.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                    <User className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">No members found</h3>
                    <p className="text-sm text-gray-400 mt-1">Start adding members to the committee</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {members.map((member) => (
                        <div key={member.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 text-center p-6 relative">
                            <div className="relative mb-4 mx-auto w-32 h-32">
                                <div className="w-full h-full rounded-full overflow-hidden bg-gray-50 border-4 border-gray-50 group-hover:border-primary/20 transition-all duration-300">
                                    {member.image_url ? (
                                        <img src={member.image_url} alt={member.name_en} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-200">
                                            <User size={64} />
                                        </div>
                                    )}
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => handleEdit(member)}
                                        className="bg-white text-primary p-2.5 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
                                        title="Edit Member"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member.id)}
                                        className="bg-red-500 text-white p-2.5 rounded-full shadow-lg hover:bg-red-600 transition-all transform hover:-translate-y-1"
                                        title="Delete Member"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-serif font-bold text-primary truncate group-hover:text-secondary transition-colors">{member.name_en}</h3>
                                <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">{member.role_en}</p>
                                <div className="pt-2 flex justify-center gap-2">
                                    <span className="text-[10px] bg-gray-50 text-gray-400 px-2 py-0.5 rounded-full font-bold">Order: {member.member_order}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommitteeManager;
