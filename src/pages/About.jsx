import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-cream">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[650px] bg-cover bg-center" style={{ backgroundImage: "url('/images/home/Carole2.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">{t('about', 'title')}</h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                        {t('about', 'subtitle')}
                    </p>
                </div>
            </section>

            {/* Our Legacy Section */}
            <section className="py-20 px-4 bg-cream relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-temple-pattern bg-repeat opacity-5"></div>

                <div className="relative z-10 max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif text-primary text-center mb-12 border-b-4 border-primary inline-block pb-2 w-full">
                        {t('about', 'legacyTitle')}
                    </h2>
                    <div className="space-y-6 text-darkText text-base md:text-lg leading-relaxed">
                        <p>
                            {t('about', 'legacyText1')}
                        </p>
                        <p>
                            {t('about', 'legacyText2')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Spiritual & Cultural Significance */}
            <section className="py-20 px-4 bg-cream relative overflow-hidden">
                <div className="absolute inset-0 bg-temple-pattern bg-repeat opacity-5"></div>

                <div className="relative z-10 max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif text-primary text-center mb-12 border-b-4 border-primary inline-block pb-2 w-full">
                        {t('about', 'significanceTitle')}
                    </h2>
                    <p className="text-darkText text-base md:text-lg leading-relaxed text-center max-w-5xl mx-auto">
                        {t('about', 'significanceText')}
                    </p>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-20 px-4 bg-cream relative overflow-hidden">
                <div className="absolute inset-0 bg-temple-pattern bg-repeat opacity-5"></div>

                <div className="relative z-10 max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif text-primary text-center mb-16 border-b-4 border-primary inline-block pb-2 w-full">
                        {t('about', 'journeyTitle')}
                    </h2>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-secondary hidden md:block"></div>

                        {/* Timeline Items */}
                        <div className="space-y-16">
                            {/* 1723 - Foundation */}
                            <div className="relative flex flex-col md:flex-row items-center">
                                <div className="md:w-1/2 md:pr-12 text-right mb-4 md:mb-0">
                                    <div className="bg-white p-6 rounded-lg shadow-lg">
                                        <h3 className="text-2xl font-serif text-primary mb-2">{t('about', 'timeline1Title')}</h3>
                                        <p className="text-darkText">{t('about', 'timeline1Text')}</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-secondary rounded-full border-4 border-cream hidden md:block"></div>
                                <div className="md:w-1/2 md:pl-12"></div>
                            </div>

                            {/* 1890s - Expansion */}
                            <div className="relative flex flex-col md:flex-row items-center">
                                <div className="md:w-1/2 md:pr-12"></div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-secondary rounded-full border-4 border-cream hidden md:block"></div>
                                <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0">
                                    <div className="bg-white p-6 rounded-lg shadow-lg">
                                        <h3 className="text-2xl font-serif text-primary mb-2">{t('about', 'timeline2Title')}</h3>
                                        <p className="text-darkText">{t('about', 'timeline2Text')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* 1947 - Community Center */}
                            <div className="relative flex flex-col md:flex-row items-center">
                                <div className="md:w-1/2 md:pr-12 text-right mb-4 md:mb-0">
                                    <div className="bg-white p-6 rounded-lg shadow-lg">
                                        <h3 className="text-2xl font-serif text-primary mb-2">{t('about', 'timeline3Title')}</h3>
                                        <p className="text-darkText">{t('about', 'timeline3Text')}</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-secondary rounded-full border-4 border-cream hidden md:block"></div>
                                <div className="md:w-1/2 md:pl-12"></div>
                            </div>

                            {/* 2023 - Modern Era */}
                            <div className="relative flex flex-col md:flex-row items-center">
                                <div className="md:w-1/2 md:pr-12"></div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-secondary rounded-full border-4 border-cream hidden md:block"></div>
                                <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0">
                                    <div className="bg-white p-6 rounded-lg shadow-lg">
                                        <h3 className="text-2xl font-serif text-primary mb-2">{t('about', 'timeline4Title')}</h3>
                                        <p className="text-darkText">{t('about', 'timeline4Text')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* View Gallery Button */}
                    <div className="text-center mt-16">
                        <button className="bg-secondary hover:bg-amber-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                            {t('about', 'viewGallery')}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
