import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../supabaseClient';

const Hero = () => {
    const { t, language } = useLanguage();
    const heroImages = [
        "/images/home/Carosle1.jpg",
        "/images/home/Carole2.jpg"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [heroButton, setHeroButton] = useState({
        enabled: 'true',
        text_en: 'Wish Oil Light Fee for Sharadiya Navratri 2026',
        text_hi: 'मनोकामना तेल ज्योति शुल्क शारदीय नवरात्रि 2026',
        link: 'https://rzp.io/rzp/N3NPsQI'
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchHeroButton = async () => {
            try {
                const { data, error } = await supabase
                    .from('site_settings')
                    .select('*')
                    .in('key', ['hero_button_enabled', 'hero_button_text_en', 'hero_button_text_hi', 'hero_button_link']);

                if (error) throw error;

                if (data && data.length > 0) {
                    const btnSettings = {};
                    data.forEach(item => {
                        btnSettings[item.key] = item.value;
                    });
                    setHeroButton(prev => ({
                        enabled: btnSettings.hero_button_enabled !== undefined ? btnSettings.hero_button_enabled : prev.enabled,
                        text_en: btnSettings.hero_button_text_en !== undefined ? btnSettings.hero_button_text_en : prev.text_en,
                        text_hi: btnSettings.hero_button_text_hi !== undefined ? btnSettings.hero_button_text_hi : prev.text_hi,
                        link: btnSettings.hero_button_link !== undefined ? btnSettings.hero_button_link : prev.link
                    }));
                }
            } catch (err) {
                console.error('Error loading hero button settings:', err);
            }
        };

        fetchHeroButton();
    }, []);

    // Determine button text based on current language
    const heroButtonText = language === 'hi' ? heroButton.text_hi : heroButton.text_en;
    // Show button only if enabled and both text and link are available
    const showHeroButton = heroButton.enabled === 'true' && heroButtonText && heroButton.link;

    return (
        <section className="relative h-screen bg-primary overflow-hidden">
            {/* Background Carousel */}
            {heroImages.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={img}
                        alt={`Hero Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}

            {/* Overlays */}
            {/* Overlays */}
            <div className="absolute inset-0 bg-temple-pattern bg-repeat opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/10 to-primary/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#5D2A2A]/40 to-transparent"></div>

            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pt-20">
                <div className="animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#F6E0C6] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] mb-8 leading-tight max-w-5xl mx-auto">
                        {t('hero', 'title')}
                    </h1>
                    <p className="text-xl md:text-3xl text-white font-medium tracking-wide mb-12 max-w-4xl mx-auto opacity-90 font-sans drop-shadow-md">
                        {t('hero', 'subtitle')}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8 animate-fade-in-up delay-200">
                    {/* <button className="bg-secondary hover:bg-amber-600 text-white px-12 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(217,119,6,0.6)] hover:shadow-[0_0_30px_rgba(217,119,6,0.8)] hover:-translate-y-1">
                        {t('hero', 'makeDonation')}
                    </button> */}
                    <a
                        href="https://rzp.io/rzp/mahamayadonation"
                        // target="_blank"
                        rel="noopener noreferrer"
                        className="bg-secondary hover:bg-amber-600 text-white px-12 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(217,119,6,0.6)] hover:shadow-[0_0_30px_rgba(217,119,6,0.8)] hover:-translate-y-1 text-center"
                    >
                        {t('hero', 'makeDonation')}
                    </a>
                    {showHeroButton && (
                        <a
                            href={heroButton.link}
                            className="bg-white hover:bg-gray-100 text-secondary border-2 border-secondary px-12 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:-translate-y-1 text-center"
                        >
                            {heroButtonText}
                        </a>
                    )}
                </div>
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                            ? 'bg-secondary w-8'
                            : 'bg-white/50 hover:bg-white'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Event Banner (Commented Out as requested)
            <div className="absolute bottom-0 w-full bg-gradient-to-r from-[#5D2A2A] to-[#9F3B2F] border-t border-accent/20 shadow-2xl backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-white">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
                            <span className="text-accent font-serif text-xl tracking-wider font-bold drop-shadow-sm">Upcoming Event</span>
                            <span className="hidden md:inline w-1.5 h-1.5 bg-white rounded-full opacity-50"></span>
                            <span className="text-white/80 text-sm md:text-base font-light tracking-wide">Discover the divine history and spiritual significance</span>
                        </div>
                        <p className="font-serif text-2xl mt-2 text-white drop-shadow-md">2 Nov 2025 • 7:00 PM</p>
                    </div>
                    <button className="bg-secondary hover:bg-amber-600 text-white px-8 py-3 rounded-full font-semibold text-sm shadow-lg transition-transform hover:scale-105 border border-white/10">
                        Datails
                    </button>
                </div>
            </div> */}
        </section>
    );
};

export default Hero;
