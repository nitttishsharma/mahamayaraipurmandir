import React from 'react';
import { committeeMembers } from '../data/committee';
import { useLanguage } from '../context/LanguageContext';

const Committee = () => {
    const { t, language } = useLanguage();
    const members = committeeMembers[language] || committeeMembers.en;
    return (
        <section className="py-24 bg-cream relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-temple-pattern bg-repeat opacity-5"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4 drop-shadow-sm">{t('committee', 'title')}</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6"></div>
                    <p className="text-[#787878] text-lg font-medium max-w-2xl mx-auto">
                        {t('committee', 'subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {members.map((member) => (
                        <div key={member.id} className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center group">
                            <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-secondary/20 p-1 group-hover:border-secondary transition-colors duration-300">
                                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                    {/* Placeholder for member image, or use initial if no image */}
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-primary text-white text-3xl font-serif">
                                            {member.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <h3 className="text-xl font-serif text-primary font-bold mb-1">{member.name}</h3>
                            <p className="text-secondary font-medium text-sm uppercase tracking-wider">{member.role}</p>

                            <div className="mt-4 w-12 h-0.5 bg-gray-200 mx-auto group-hover:bg-accent transition-colors"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Committee;
