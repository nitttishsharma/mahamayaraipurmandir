import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import ImageUploader from '../../components/admin/ImageUploader';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

const GalleryManager = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title_en: '',
        title_hi: '',
        category_en: '',
        category_hi: '',
        image_url: ''
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
                .from('gallery')
                .insert([formData]);

            if (error) throw error;

            setFormData({
                title_en: '',
                title_hi: '',
                category_en: '',
                category_hi: '',
                image_url: ''
            });
            setIsEditing(false);
            fetchImages();
            alert('Image added successfully!');
        } catch (error) {
            console.error('Error adding image:', error);
            alert('Error adding image: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this image?')) return;

        try {
            const { error } = await supabase
                .from('gallery')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchImages();
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Error deleting image');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-primary">Manage Gallery</h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    {isEditing ? 'Cancel' : <><Plus size={20} /> Add Image</>}
                </button>
            </div>

            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Add New Photo</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title (English)</label>
                                <input type="text" name="title_en" value={formData.title_en} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category (English)</label>
                                <input type="text" name="category_en" value={formData.category_en} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 outline-none" required />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title (Hindi)</label>
                                <input type="text" name="title_hi" value={formData.title_hi} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category (Hindi)</label>
                                <input type="text" name="category_hi" value={formData.category_hi} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 outline-none" required />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                            <div className="max-w-md">
                                <ImageUploader onUpload={handleImageUpload} currentImage={formData.image_url} />
                            </div>
                        </div>

                        <div className="col-span-2 flex justify-end gap-3 mt-4">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg border border-gray-300 bg-white">Cancel</button>
                            <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">Save Image</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Gallery List */}
            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading gallery...</div>
            ) : images.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No images found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((img) => (
                        <div key={img.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
                            <div className="h-48 overflow-hidden bg-gray-100 relative">
                                <img src={img.image_url} alt={img.title_en} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <button
                                    onClick={() => handleDelete(img.id)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800 text-sm">{img.title_en}</h3>
                                <p className="text-xs text-gray-500">{img.category_en}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GalleryManager;
