import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import ImageUploader from '../../components/admin/ImageUploader';
import { Plus, Trash2, Image as ImageIcon, Edit2, X } from 'lucide-react';
import { deleteImageFromStorage } from '../../utils/storageHelpers';
import { useToast } from '../../context/ToastContext';
import ReactDOM from 'react-dom';

const GalleryManager = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const toast = useToast();

    // Form State
    const [formData, setFormData] = useState({
        title_en: '',
        title_hi: '',
        category_en: '',
        category_hi: '',
        image_url: '',
        is_featured: false
    });

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('gallery')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setImages(data || []);
        } catch (error) {
            console.error('Error fetching gallery:', error);
            toast.error('Failed to fetch gallery images');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = (url) => {
        setFormData(prev => ({ ...prev, image_url: url }));
    };

    const resetForm = () => {
        setFormData({
            title_en: '',
            title_hi: '',
            category_en: '',
            category_hi: '',
            image_url: '',
            is_featured: false
        });
        setEditingId(null);
        setIsEditing(false);
    };

    const handleEdit = (img) => {
        setFormData({
            title_en: img.title_en || '',
            title_hi: img.title_hi || '',
            category_en: img.category_en || '',
            category_hi: img.category_hi || '',
            image_url: img.image_url || '',
            is_featured: img.is_featured || false
        });
        setEditingId(img.id);
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Update
                const { error } = await supabase
                    .from('gallery')
                    .update(formData)
                    .eq('id', editingId);
                if (error) throw error;
                toast.success('Image updated successfully!');
            } else {
                // Insert
                const { error } = await supabase
                    .from('gallery')
                    .insert([formData]);
                if (error) throw error;
                toast.success('Image added successfully!');
            }

            resetForm();
            fetchImages();
        } catch (error) {
            console.error('Error saving image:', error);
            toast.error('Error saving image: ' + error.message);
        }
    };

    const handleDelete = (id) => {
        toast.confirm('Are you sure you want to delete this image?', async () => {
            try {
                // 1. Get the image URL first
                const { data: imageToDelete, error: fetchError } = await supabase
                    .from('gallery')
                    .select('image_url')
                    .eq('id', id)
                    .single();

                if (fetchError) throw fetchError;

                // 2. Delete from Storage
                if (imageToDelete?.image_url) {
                    await deleteImageFromStorage(imageToDelete.image_url);
                }

                // 3. Delete Record
                const { error } = await supabase
                    .from('gallery')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                fetchImages();
                toast.success('Image deleted successfully');
            } catch (error) {
                console.error('Error deleting image:', error);
                toast.error('Error deleting image');
            }
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-primary">Manage Gallery</h2>
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} /> Add Image
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
                                {editingId ? 'Edit Gallery Image' : 'Add New Photo'}
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Category (English)</label>
                                        <input type="text" name="category_en" value={formData.category_en} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Title (Hindi)</label>
                                        <input type="text" name="title_hi" value={formData.title_hi} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Category (Hindi)</label>
                                        <input type="text" name="category_hi" value={formData.category_hi} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer border border-gray-100 hover:bg-gray-100 transition-colors">
                                    <input
                                        type="checkbox"
                                        name="is_featured"
                                        checked={formData.is_featured}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded-lg"
                                    />
                                    <div>
                                        <span className="block text-sm font-bold text-primary font-sans">Show on Home Page (Favorite)</span>
                                        <span className="text-xs text-gray-500">Enable this to feature this photo in the "Sacred Moments" section on the homepage.</span>
                                    </div>
                                </label>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-3 font-sans">Photo Source</label>
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
                                    {editingId ? 'Update Image' : 'Save Image'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {/* Gallery List */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white rounded-xl h-64 animate-pulse border border-gray-100"></div>
                    ))}
                </div>
            ) : images.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                    <ImageIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">No images found</h3>
                    <p className="text-sm text-gray-400 mt-1">Start adding photos to your gallery</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-6 text-primary font-bold hover:underline"
                    >
                        Add your first image
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((img) => (
                        <div key={img.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
                            <div className="h-52 overflow-hidden bg-gray-50 relative">
                                <img src={img.image_url} alt={img.title_en} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => handleEdit(img)}
                                        className="bg-white text-primary p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
                                        title="Edit Image"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(img.id)}
                                        className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-all transform hover:-translate-y-1"
                                        title="Delete Image"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                {img.is_featured && (
                                    <div className="absolute top-3 left-3 bg-yellow-400 text-primary-dark text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 border border-white/20">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                        FAVORITE
                                    </div>
                                )}
                            </div>
                            <div className="p-5 flex justify-between items-start">
                                <div>
                                    <h3 className="font-serif font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">{img.title_en}</h3>
                                    <p className="text-xs text-gray-400 font-medium tracking-wider uppercase mt-1">{img.category_en}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GalleryManager;
