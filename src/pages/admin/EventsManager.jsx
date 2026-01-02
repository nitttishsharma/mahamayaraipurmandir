import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import ImageUploader from '../../components/admin/ImageUploader';
import { Plus, Trash2, Calendar, Image as ImageIcon, Edit2, X } from 'lucide-react';
import { deleteImageFromStorage } from '../../utils/storageHelpers';
import { useToast } from '../../context/ToastContext';
import ReactDOM from 'react-dom';

const EventsManager = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const toast = useToast();

    // Form State
    const [formData, setFormData] = useState({
        title_en: '',
        title_hi: '',
        date: '',
        description_en: '',
        description_hi: '',
        image_url: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setEvents(data || []);
        } catch (error) {
            console.error('Error fetching events:', error);
            toast.error('Failed to fetch events');
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
            date: '',
            description_en: '',
            description_hi: '',
            image_url: ''
        });
        setEditingId(null);
        setIsEditing(false);
    };

    const handleEdit = (event) => {
        setFormData({
            title_en: event.title_en || '',
            title_hi: event.title_hi || '',
            date: event.date || '',
            description_en: event.description_en || '',
            description_hi: event.description_hi || '',
            image_url: event.image_url || ''
        });
        setEditingId(event.id);
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Update
                const { error } = await supabase
                    .from('events')
                    .update(formData)
                    .eq('id', editingId);
                if (error) throw error;
                toast.success('Event updated successfully!');
            } else {
                // Insert
                const { error } = await supabase
                    .from('events')
                    .insert([formData]);
                if (error) throw error;
                toast.success('Event added successfully!');
            }

            resetForm();
            fetchEvents();
        } catch (error) {
            console.error('Error saving event:', error);
            toast.error('Error saving event: ' + error.message);
        }
    };

    const handleDelete = (id) => {
        toast.confirm('Are you sure you want to delete this event?', async () => {
            try {
                // 1. Get the event data to find the image URL
                const { data: eventToDelete, error: fetchError } = await supabase
                    .from('events')
                    .select('image_url')
                    .eq('id', id)
                    .single();

                if (fetchError) throw fetchError;

                // 2. Delete the image from storage if it exists
                if (eventToDelete?.image_url) {
                    await deleteImageFromStorage(eventToDelete.image_url);
                }

                // 3. Delete the record
                const { error } = await supabase
                    .from('events')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                fetchEvents();
                toast.success('Event deleted successfully');
            } catch (error) {
                console.error('Error deleting event:', error);
                toast.error('Error deleting event');
            }
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-primary">Manage Events</h2>
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
                >
                    <Plus size={20} /> Add Event
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
                                {editingId ? 'Edit Event' : 'Add New Event'}
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Event Title (English)</label>
                                        <input type="text" name="title_en" value={formData.title_en} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Event Title (Hindi)</label>
                                        <input type="text" name="title_hi" value={formData.title_hi} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Date</label>
                                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Description (English)</label>
                                        <textarea name="description_en" value={formData.description_en} onChange={handleInputChange} rows="3" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">Description (Hindi)</label>
                                        <textarea name="description_hi" value={formData.description_hi} onChange={handleInputChange} rows="3" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" required></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-3 font-sans">Event Image</label>
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
                                    {editingId ? 'Update Event' : 'Save Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {/* Events List */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white rounded-xl h-64 animate-pulse border border-gray-100"></div>
                    ))}
                </div>
            ) : events.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                    <Calendar className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">No events found</h3>
                    <p className="text-sm text-gray-400 mt-1">Start adding upcoming events</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
                            <div className="h-48 overflow-hidden bg-gray-50 relative">
                                {event.image_url ? (
                                    <img src={event.image_url} alt={event.title_en} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-300">
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary shadow-sm">
                                    {event.date}
                                </div>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => handleEdit(event)}
                                        className="bg-white text-primary p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
                                        title="Edit Event"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-all transform hover:-translate-y-1"
                                        title="Delete Event"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-serif font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">{event.title_en}</h3>
                                <p className="text-xs text-gray-400 font-medium mt-1 mb-3">{event.title_hi}</p>
                                <p className="text-sm text-gray-600 line-clamp-2">{event.description_en}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventsManager;
