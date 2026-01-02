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
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full transform transition-all scale-100">
                <button
                    onClick={closePopup}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1.5 transition-colors z-10"
                    aria-label="Close Popup"
                >
                    <X size={24} />
                </button>

                {popupData.link ? (
                    <a href={popupData.link} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                        <img
                            src={popupData.image}
                            alt="Welcome"
                            className="w-full h-auto max-h-[80vh] object-contain"
                        />
                    </a>
                ) : (
                    <img
                        src={popupData.image}
                        alt="Welcome"
                        className="w-full h-auto max-h-[80vh] object-contain"
                    />
                )}
            </div>
        </div>
    );
};

export default WelcomePopup;
