import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Video, Facebook, Youtube } from 'lucide-react';
import { supabase } from '../supabaseClient';

const OnlineSevas = () => {
    const { language, t } = useLanguage();
    const [links, setLinks] = useState({
        youtube_live_url: '',
        facebook_live_url: ''
    });

    useEffect(() => {
        const fetchSettings = async () => {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*');

            if (data) {
                const newLinks = { ...links };
                data.forEach(item => {
                    if (item.key === 'youtube_live_url') newLinks.youtube_live_url = item.value;
                    if (item.key === 'facebook_live_url') newLinks.facebook_live_url = item.value;
                });
                setLinks(newLinks);
            }
        };

        fetchSettings();
    }, []);

    return (
        <div className="min-h-screen bg-cream pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">
                        {t('onlineSevasPage', 'title')}
                    </h1>
                    <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t('onlineSevasPage', 'subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* YouTube Live Section */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
                        <div className="bg-[#FF0000] p-4 flex items-center justify-center space-x-3 text-white">
                            <Youtube size={32} />
                            <h2 className="text-2xl font-bold">{t('onlineSevasPage', 'youtubeTitle')}</h2>
                        </div>
                        <div className="aspect-video bg-black flex items-center justify-center relative group cursor-pointer">
                            {links.youtube_live_url ? (
                                <iframe
                                    className="w-full h-full"
                                    src={links.youtube_live_url}
                                    title="YouTube Live Stream"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                >
                                </iframe>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/50">
                                    <p className="text-white font-medium">{t('onlineSevasPage', 'streamPlaceholder')}</p>
                                </div>
                            )}
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-serif text-primary mb-2 font-bold">{t('onlineSevasPage', 'youtubeDesc')}</h3>
                            <p className="text-gray-600 mb-4">
                                {t('onlineSevasPage', 'youtubeSub')}
                            </p>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center bg-[#FF0000] text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors">
                                {t('onlineSevasPage', 'watchYoutube')}
                            </a>
                        </div>
                    </div>

                    {/* Facebook Live Section */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
                        <div className="bg-[#1877F2] p-4 flex items-center justify-center space-x-3 text-white">
                            <Facebook size={32} />
                            <h2 className="text-2xl font-bold">{t('onlineSevasPage', 'facebookTitle')}</h2>
                        </div>
                        <div className="aspect-video bg-black flex items-center justify-center relative">
                            {links.facebook_live_url ? (
                                <iframe
                                    className="w-full h-full"
                                    src={links.facebook_live_url}
                                    title="Facebook Live Stream"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                >
                                </iframe>
                            ) : (
                                <div className="text-center p-10 flex flex-col items-center justify-center h-full">
                                    <p className="text-white/70 mb-2">{t('onlineSevasPage', 'streamPlaceholder')}</p>
                                </div>
                            )}
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-serif text-primary mb-2 font-bold">{t('onlineSevasPage', 'facebookDesc')}</h3>
                            <p className="text-gray-600 mb-4">
                                {t('onlineSevasPage', 'facebookSub')}
                            </p>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center bg-[#1877F2] text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                                {t('onlineSevasPage', 'watchFacebook')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineSevas;
