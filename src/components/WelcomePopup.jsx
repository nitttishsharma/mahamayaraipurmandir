import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../supabaseClient';

const WelcomePopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [popupData, setPopupData] = useState({
        enabled: 'false',
        image: '',
        link: ''
    });

    useEffect(() => {
        checkPopupStatus();
    }, []);

    const checkPopupStatus = async () => {


        // 2. Fetch settings from Supabase
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .in('key', ['popup_enabled', 'popup_image', 'popup_link']);

            if (error) throw error;

            if (data) {
                const settings = {};
                data.forEach(item => {
                    settings[item.key] = item.value;
                });

                if (settings.popup_enabled === 'true' && settings.popup_image) {
                    setPopupData({
                        enabled: settings.popup_enabled,
                        image: settings.popup_image,
                        link: settings.popup_link
                    });
                    setIsOpen(true);


                }
            }
        } catch (err) {
            console.error('Error loading popup:', err);
        }
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={closePopup}>
            <div
                className="relative inline-block max-w-[95vw] sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[60vw] xl:max-w-[50vw] max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={closePopup}
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 hover:bg-white text-gray-800 rounded-full p-1 sm:p-1.5 transition-colors z-10 shadow-lg"
                    aria-label="Close Popup"
                >
                    <X size={20} className="sm:w-6 sm:h-6" />
                </button>

                {popupData.link ? (
                    <a href={popupData.link} target="_blank" rel="noopener noreferrer" className="block">
                        <img
                            src={popupData.image}
                            alt="Welcome"
                            className="block w-auto h-auto max-w-full max-h-[85vh] rounded-2xl"
                        />
                    </a>
                ) : (
                    <img
                        src={popupData.image}
                        alt="Welcome"
                        className="block w-auto h-auto max-w-full max-h-[85vh] rounded-2xl"
                    />
                )}
            </div>
        </div>
    );
};

export default WelcomePopup;
