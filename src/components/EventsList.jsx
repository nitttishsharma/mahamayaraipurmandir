import React from 'react';
import { eventsData } from '../data/events';
import { useLanguage } from '../context/LanguageContext';

const EventsList = () => {
    const { language } = useLanguage();
    const events = eventsData[language] || eventsData.en;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
                <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-secondary/10 flex flex-col">
                    <div className="h-56 relative overflow-hidden">
                        <img
                            src={event.img}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        {event.isUpcoming && (
                            <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                                Upcoming
                            </div>
                        )}
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                        <h3 className="text-2xl font-serif text-primary mb-2">{event.title}</h3>
                        <p className="text-secondary font-semibold text-sm mb-4 uppercase tracking-wide">{event.date}</p>
                        <p className="text-darkText/70 text-sm leading-relaxed mb-6 flex-1">
                            {event.desc}
                        </p>
                        <button className="w-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-white py-3 rounded-full font-semibold transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventsList;
