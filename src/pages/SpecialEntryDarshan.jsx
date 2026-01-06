import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CalendarCheck, Star, Clock, AlertCircle } from 'lucide-react';

const SpecialEntryDarshan = () => {
    const { language } = useLanguage();

    return (
        <div className="min-h-screen bg-cream pt-40 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">
                        {language === 'hi' ? 'शीघ्र दर्शन / विशेष प्रवेश' : 'Special Entry Darshan'}
                    </h1>
                    <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600">
                        {language === 'hi'
                            ? 'भीड़ से बचें और माँ के विशेष दर्शन का लाभ उठाएं।'
                            : 'Beat the rush and experience a divine and peaceful Darshan.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-secondary/10 hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">Sheeghra Darshan</h3>
                                <p className="text-secondary font-medium uppercase tracking-wide text-sm mt-1">Express Entry</p>
                            </div>
                            <div className="bg-yellow-100 p-2 rounded-full text-secondary">
                                <Clock size={28} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-primary mb-6">₹ 100 <span className="text-sm text-gray-400 font-normal">/ person</span></div>
                        <ul className="space-y-3 text-gray-600 mb-8">
                            <li className="flex items-center"><Star size={16} className="text-secondary mr-2" /> Dedicated Queue Line</li>
                            <li className="flex items-center"><Star size={16} className="text-secondary mr-2" /> Closer View of Deity</li>
                            <li className="flex items-center"><Star size={16} className="text-secondary mr-2" /> Laddu Prasadam included</li>
                        </ul>
                        <button className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-red-900 transition-colors opacity-50 cursor-not-allowed">
                            Booking Coming Soon
                        </button>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-secondary/20 hover:shadow-xl transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Most Popular</div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">Vishesh Pooja</h3>
                                <p className="text-secondary font-medium uppercase tracking-wide text-sm mt-1">Special Rituals</p>
                            </div>
                            <div className="bg-orange-100 p-2 rounded-full text-secondary">
                                <Star size={28} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-primary mb-6">₹ 501 <span className="text-sm text-gray-400 font-normal">/ family</span></div>
                        <ul className="space-y-3 text-gray-600 mb-8">
                            <li className="flex items-center"><Star size={16} className="text-secondary mr-2" /> Sankalp Pooja in your Name</li>
                            <li className="flex items-center"><Star size={16} className="text-secondary mr-2" /> Priority Darshan for 4 members</li>
                            <li className="flex items-center"><Star size={16} className="text-secondary mr-2" /> Special Prasadam Pack</li>
                        </ul>
                        <button className="w-full bg-secondary text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors opacity-50 cursor-not-allowed">
                            Booking Coming Soon
                        </button>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start gap-4">
                    <AlertCircle className="text-blue-600 shrink-0 mt-1" size={24} />
                    <div>
                        <h4 className="font-bold text-blue-800 mb-1">Online Booking Feature</h4>
                        <p className="text-blue-700/80 text-sm leading-relaxed">
                            The online ticket booking facility is currently under development. Tickets for Special Darshan can be purchased directly from the temple counter near the East Gate.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialEntryDarshan;
