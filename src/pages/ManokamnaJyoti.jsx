import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Flame, Star, Quote } from 'lucide-react';

const ManokamnaJyoti = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-cream pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-orange-100">
                    <div className="bg-gradient-to-r from-secondary to-orange-600 px-8 py-12 text-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-temple-pattern opacity-10"></div>
                        <div className="relative z-10">
                            <Flame className="mx-auto mb-6 text-yellow-300 animate-bounce" size={48} />
                            <h1 className="text-4xl md:text-5xl font-serif mb-4">
                                {t('manokamnaJyotiPage', 'title')}
                            </h1>
                            <div className="w-24 h-1 bg-yellow-300 mx-auto"></div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="flex flex-col items-center mb-12">
                            <Quote className="text-secondary opacity-20 mb-4" size={48} />
                            <p className="text-2xl md:text-3xl font-serif text-gray-800 text-center leading-relaxed italic">
                                {t('manokamnaJyotiPage', 'subtitle')}
                            </p>
                            <Quote className="text-secondary opacity-20 mt-4 rotate-180" size={48} />
                        </div>

                        <div className="bg-orange-50 rounded-3xl p-8 mb-12 border-l-8 border-secondary shadow-inner">
                            <div className="flex items-start gap-4">
                                <Star className="text-secondary shrink-0 mt-1" size={28} />
                                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                                    {t('manokamnaJyotiPage', 'description')}
                                </p>
                            </div>
                        </div>

                        <div className="text-center">
                            <a
                                href="https://rzp.io/rzp/N3NPsQI"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-primary hover:bg-red-900 text-white px-12 py-5 rounded-full font-bold text-xl transition-all shadow-[0_10px_20px_rgba(123,43,34,0.3)] hover:shadow-[0_15px_30px_rgba(123,43,34,0.4)] hover:-translate-y-1 transform"
                            >
                                <Flame className="mr-2" size={24} />
                                {t('manokamnaJyotiPage', 'donateBtn')}
                            </a>
                            <p className="mt-6 text-gray-500 text-sm italic">
                                * Secure payment powered by Razorpay
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManokamnaJyoti;
