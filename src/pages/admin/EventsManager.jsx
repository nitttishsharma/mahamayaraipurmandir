import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import ImageUploader from '../../components/admin/ImageUploader';
import { Plus, Trash2, Calendar, Image as ImageIcon } from 'lucide-react';
import { deleteImageFromStorage } from '../../utils/storageHelpers';
import { useToast } from '../../context/ToastContext';

const EventsManager = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('events')
                .insert([formData]);

            if (error) throw error;

            // Reset form and refresh list
            setFormData({
                title_en: '',
                title_hi: '',
                date: '',
                description_en: '',
                description_hi: '',
                image_url: ''
            });
            setIsEditing(false);
            fetchEvents();
            toast.success('Event added successfully!');
        } catch (error) {
            console.error('Error adding event:', error);
            toast.error('Error adding event: ' + error.message);
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
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    {isEditing ? 'Cancel' : <><Plus size={20} /> Add Event</>}
                </button>
            </div>

            {/* Add Event Form */}
            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Add New Event</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2 md:col-span-1 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title (English)</label>
                                <input
                                    type="text"
                                    name="title_en"
                                    value={formData.title_en}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title (Hindi)</label>
                                <input
                                    type="text"
                                    name="title_hi"
                                    value={formData.title_hi}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-span-2 md:col-span-1 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description (English)</label>
                                <textarea
                                    name="description_en"
                                    value={formData.description_en}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Hindi)</label>
                                <textarea
                                    name="description_hi"
                                    value={formData.description_hi}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
                            <div className="max-w-md">
                                <ImageUploader onUpload={handleImageUpload} currentImage={formData.image_url} />
                            </div>
                        </div>

                        <div className="col-span-2 flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 bg-white"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 shadow-md"
                            >
                                Save Event
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Events List */}
            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading events...</div>
            ) : events.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No events found. Add your first event!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-48 overflow-hidden bg-gray-100 relative">
                                {event.image_url ? (
                                    <img src={event.image_url} alt={event.title_en} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <ImageIcon size={32} />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                                    {event.date}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-lg text-gray-800 mb-1">{event.title_en}</h3>
                                <p className="text-sm text-gray-500 mb-3">{event.title_hi}</p>
                                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{event.description_en}</p>

                                <div className="flex justify-end pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                                    >
                                        <Trash2 size={16} /> Delete
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

export default EventsManager;
