import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, CheckCircle } from 'lucide-react';

const DonateNow = () => {
    const { t } = useLanguage();

    const usages = [
        t('donateNowPage', 'point1'),
        t('donateNowPage', 'point2'),
        t('donateNowPage', 'point3'),
        t('donateNowPage', 'point4'),
        t('donateNowPage', 'point5'),
        t('donateNowPage', 'point6'),
    ];

    return (
        <div className="min-h-screen bg-cream pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-orange-100">
                    <div className="bg-gradient-to-r from-primary to-[#9F3B2F] px-8 py-12 text-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-temple-pattern opacity-10"></div>
                        <div className="relative z-10">
                            <Heart className="mx-auto mb-6 text-accent animate-pulse" size={48} />
                            <h1 className="text-4xl md:text-5xl font-serif mb-4">
                                {t('donateNowPage', 'title')}
                            </h1>
                            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                            <p className="text-xl opacity-90 font-light max-w-2xl mx-auto leading-relaxed">
                                {t('donateNowPage', 'subtitle')}
                            </p>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-secondary pl-4">
                            {t('donateNowPage', 'usageTitle')}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {usages.map((item, index) => (
                                <div key={index} className="flex items-start bg-orange-50/50 p-4 rounded-2xl border border-orange-100 hover:border-secondary/30 transition-colors">
                                    <CheckCircle className="text-secondary shrink-0 mt-1 mr-3" size={20} />
                                    <p className="text-gray-700 font-medium">{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-50 rounded-3xl p-8 text-center mb-10 border border-gray-100">
                            <p className="text-gray-600 italic leading-relaxed mb-8">
                                "{t('donateNowPage', 'closing')}"
                            </p>
                            <a
                                href="https://rzp.io/rzp/mahamayadonation"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-secondary hover:bg-amber-600 text-white px-12 py-4 rounded-full font-bold text-xl transition-all shadow-[0_10px_20px_rgba(217,119,6,0.3)] hover:shadow-[0_15px_30px_rgba(217,119,6,0.4)] hover:-translate-y-1 transform"
                            >
                                <Heart className="mr-2" size={24} />
                                {t('donateNowPage', 'donateBtn')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonateNow;
