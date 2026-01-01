import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { Loader } from 'lucide-react';

const EventsList = () => {
    const { language } = useLanguage();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
                <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-secondary/10 flex flex-col">
                    <div className="h-56 relative overflow-hidden">
                        <img
                            src={event.image_url || '/images/common/placeholder.jpg'}
                            alt={language === 'hi' ? event.title_hi : event.title_en}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        {/* Logic for "Upcoming" tag can be improved based on date comparison if needed */}
                        <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                            Upcoming
                        </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                        <h3 className="text-2xl font-serif text-primary mb-2">
                            {language === 'hi' ? event.title_hi : event.title_en}
                        </h3>
                        <p className="text-secondary font-semibold text-sm mb-4 uppercase tracking-wide">
                            {event.date}
                        </p>
                        <p className="text-darkText/70 text-sm leading-relaxed mb-6 flex-1">
                            {language === 'hi' ? event.description_hi : event.description_en}
                        </p>
                        {/* 
                           "Learn More" functionality would require a detailed view page or modal.
                           For now, we can keep the button or remove it if not needed.
                        */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventsList;
