import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { Loader, X, Calendar } from 'lucide-react';

const EventsList = ({ disableModal = false }) => {
    const { language } = useLanguage();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setEvents(data || []);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEventClick = (event) => {
        if (!disableModal) {
            setSelectedEvent(event);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    // Check if there are no events
    if (events.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>No upcoming events at the moment.</p>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {events.map((event) => (
                    <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-secondary/10 flex flex-col">
                        <div
                            className={`h-56 relative overflow-hidden group ${!disableModal ? 'cursor-pointer' : ''}`}
                            onClick={() => handleEventClick(event)}
                        >
                            <img
                                src={event.image_url || '/images/common/placeholder.jpg'}
                                alt={language === 'hi' ? event.title_hi : event.title_en}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Logic for "Upcoming" tag can be improved based on date comparison if needed */}
                            <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                                Upcoming
                            </div>
                            {/* Hover Overlay - Only if modal is enabled */}
                            {!disableModal && (
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">Click to View</span>
                                </div>
                            )}
                        </div>
                        <div className={`p-8 flex-1 flex flex-col ${!disableModal ? 'cursor-pointer' : ''}`} onClick={() => handleEventClick(event)}>
                            <h3 className={`text-2xl font-serif text-primary mb-2 ${!disableModal ? 'hover:text-secondary transition-colors' : ''}`}>
                                {language === 'hi' ? event.title_hi : event.title_en}
                            </h3>
                            <p className="text-secondary font-semibold text-sm mb-4 uppercase tracking-wide">
                                {event.date}
                            </p>
                            <p className="text-darkText/70 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                {language === 'hi' ? event.description_hi : event.description_en}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Event Details Modal - Using Portal */}
            {selectedEvent && ReactDOM.createPortal(
                <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
                    <div
                        className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative shadow-2xl animate-fadeIn flex flex-col md:flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedEvent(null)}
                            className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-white text-gray-800 transition-colors shadow-sm"
                        >
                            <X size={24} />
                        </button>

                        {/* Image Section - Scrollable on mobile if needed, but usually cover */}
                        <div className="w-full md:w-1/2 bg-gray-100 relative h-64 md:h-auto">
                            <img
                                src={selectedEvent.image_url || '/images/common/placeholder.jpg'}
                                alt={language === 'hi' ? selectedEvent.title_hi : selectedEvent.title_en}
                                className="w-full h-full object-contain md:object-cover"
                            />
                        </div>

                        {/* Content Section - Scrollable */}
                        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col h-[calc(90vh-16rem)] md:h-auto overflow-y-auto custom-scrollbar">
                            <div className="flex-shrink-0 mb-6">
                                <div className="flex items-center text-secondary font-semibold text-sm uppercase tracking-wide mb-2">
                                    <Calendar size={16} className="mr-2" />
                                    {selectedEvent.date}
                                </div>
                                <h2 className="text-3xl font-serif text-primary mb-4 leading-tight">
                                    {language === 'hi' ? selectedEvent.title_hi : selectedEvent.title_en}
                                </h2>
                                <div className="w-20 h-1 bg-secondary mb-6"></div>
                            </div>

                            <div className="prose prose-stone max-w-none text-gray-600 leading-relaxed flex-grow overflow-y-auto pr-2">
                                <p className="whitespace-pre-line text-lg">
                                    {language === 'hi' ? selectedEvent.description_hi : selectedEvent.description_en}
                                </p>
                            </div>

                            <div className="flex-shrink-0 mt-8 pt-6 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default EventsList;
