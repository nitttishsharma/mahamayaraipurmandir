import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t, language } = useLanguage();

    return (
        <footer className="bg-[#8B3232] text-white py-12 border-t-4 border-[#C8A15C]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4">

                    {/* Left Column: Logo, Title, Mantra, Socials */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 max-w-lg">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <img
                                src="/images/common/Logo-1-1.png"
                                alt="Shree Mahamaya Devi Temple"
                                className="w-24 h-24 rounded-full border-2 border-[#C8A15C] shadow-lg"
                            />
                            <div>
                                <h2 className="font-serif text-3xl font-bold tracking-wide">
                                    {language === 'hi' ? 'श्री महामाया देवी मंदिर' : 'Shree Mahamaya Devi Mandir'}
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-[#FCEE21] text-lg font-medium tracking-wide">
                                सर्व मंगल मांगल्ये शिवे सर्वार्थ साधिके।
                            </p>
                            <p className="text-[#FCEE21] text-lg font-medium tracking-wide">
                                शरण्ये त्र्यम्बके गौरी नारायणि नमोऽस्तुते ||
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="flex space-x-3 pt-2">
                            <a href="https://www.facebook.com/shrimahamayadevimndirraipur" target="_blank" rel="noopener noreferrer" className="bg-[#3b5998] p-2.5 rounded text-white hover:brightness-110 transition-all">
                                <Facebook size={24} fill="white" />
                            </a>
                            <a href="https://www.instagram.com/shrimahamayadevimndirraipur" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-2.5 rounded text-white hover:brightness-110 transition-all">
                                <Instagram size={24} />
                            </a>
                            <a href="https://x.com/mahamaya_rpr" target="_blank" rel="noopener noreferrer" className="bg-black p-2.5 rounded text-white hover:brightness-110 transition-all">
                                <Twitter size={24} fill="white" />
                            </a>
                            <a href="https://www.youtube.com/@mahamayamaaraipur" target="_blank" rel="noopener noreferrer" className="bg-[#FF0000] p-2.5 rounded text-white hover:brightness-110 transition-all">
                                <Youtube size={24} fill="white" />
                            </a>
                            <a href={"https://wa.me/917389664779"} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] p-2.5 rounded text-white hover:brightness-110 transition-all">
                                <MessageCircle size={24} fill="white" />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Contact Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 pt-4 md:pt-0">
                        <div className="flex items-start gap-4">
                            <MapPin className="text-white/80 shrink-0 mt-1" size={28} />
                            <p className="text-lg leading-snug max-w-xs">{CONTACT_INFO.address[language]}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Phone className="text-white/80 shrink-0" size={24} />
                            <p className="text-lg tracking-wide">{CONTACT_INFO.phone}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Mail className="text-white/80 shrink-0" size={24} />
                            <p className="text-lg tracking-wide">{CONTACT_INFO.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
