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
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                            <a href={"https://wa.me/917389664779"} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] p-2.5 rounded text-white hover:brightness-110 transition-all">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
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
