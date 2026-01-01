import React from 'react';
import EventsList from '../components/EventsList';
import { useLanguage } from '../context/LanguageContext';

const Events = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-cream">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[650px] bg-cover bg-center" style={{ backgroundImage: "url('/images/home/Carosle1.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">{t('eventsPage', 'title')}</h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                        {t('eventsPage', 'subtitle')}
                    </p>
                </div>
            </section>

            <section className="py-24 bg-cream relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4 drop-shadow-sm">{t('home', 'upcomingEvents')}</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6"></div>
                        <p className="text-[#787878] text-lg font-medium">{t('home', 'eventsDesc')}</p>
                    </div>

                    <EventsList />
                </div>
            </section>
        </div>
    );
};

export default Events;
