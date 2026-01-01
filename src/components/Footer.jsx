import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../data/contactInfo';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t, language } = useLanguage();
    return (
        <footer className="bg-gradient-to-r from-primary to-[#9F3B2F] text-white pt-20 pb-8 relative overflow-hidden">
            {/* Decorative patterns could go here */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent/20 via-accent to-accent/20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-accent/50 box-border p-2">
                                {/* Placeholder for Logo */}
                                <img src="/images/common/logo.jpg" alt="Logo" className="w-full h-full rounded-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-serif text-xl tracking-wider leading-tight">Shree Mahamaya<br />Devi Temple</h3>
                            </div>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed italic border-l-2 border-accent pl-4">
                            "{t('footer', 'mantra')}"
                            <br />
                            <span className="not-italic text-xs mt-1 block opacity-70">{t('footer', 'mantraTrans')}</span>
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="font-serif text-xl text-accent border-b border-white/10 pb-2 inline-block">{t('footer', 'contactUs')}</h4>
                        <div className="space-y-4 text-sm text-white/90">
                            <div className="flex items-start space-x-3 group">
                                <div className="mt-1 bg-white/10 p-1.5 rounded-full group-hover:bg-accent group-hover:text-primary transition-colors">
                                    <MapPin size={16} />
                                </div>
                                <span className="leading-relaxed">{CONTACT_INFO.address[language]}</span>
                            </div>
                            <div className="flex items-center space-x-3 group">
                                <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-accent group-hover:text-primary transition-colors">
                                    <Mail size={16} />
                                </div>
                                <span>{CONTACT_INFO.email}</span>
                            </div>
                            <div className="flex items-center space-x-3 group">
                                <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-accent group-hover:text-primary transition-colors">
                                    <Phone size={16} />
                                </div>
                                <span>{CONTACT_INFO.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="font-serif text-xl text-accent border-b border-white/10 pb-2 inline-block">{t('footer', 'quickLinks')}</h4>
                        <ul className="space-y-3 text-sm text-white/90">
                            <li><Link to="/" className="flex items-center hover:text-accent transition-colors"><span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>{t('footer', 'home')}</Link></li>
                            <li><Link to="/about" className="flex items-center hover:text-accent transition-colors"><span className="w-1.5 h-1.5 bg-accent/50 rounded-full mr-2 hover:bg-accent"></span>{t('footer', 'aboutUs')}</Link></li>
                            <li><Link to="/events" className="flex items-center hover:text-accent transition-colors"><span className="w-1.5 h-1.5 bg-accent/50 rounded-full mr-2 hover:bg-accent"></span>{t('footer', 'upcomingEvents')}</Link></li>
                            <li><Link to="/gallery" className="flex items-center hover:text-accent transition-colors"><span className="w-1.5 h-1.5 bg-accent/50 rounded-full mr-2 hover:bg-accent"></span>{t('footer', 'photoGallery')}</Link></li>
                            <li><Link to="/donation" className="flex items-center hover:text-accent transition-colors"><span className="w-1.5 h-1.5 bg-accent/50 rounded-full mr-2 hover:bg-accent"></span>{t('footer', 'makeDonation')}</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="space-y-6">
                        <h4 className="font-serif text-xl text-accent border-b border-white/10 pb-2 inline-block">{t('footer', 'connectWithUs')}</h4>
                        <p className="text-sm text-white/70">{t('footer', 'socialDesc')}</p>
                        <div className="flex space-x-3">
                            <a href="#" className="bg-white/5 border border-white/10 p-3 rounded-full hover:bg-accent hover:text-primary hover:border-accent transition-all transform hover:-translate-y-1">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="bg-white/5 border border-white/10 p-3 rounded-full hover:bg-accent hover:text-primary hover:border-accent transition-all transform hover:-translate-y-1">
                                <Youtube size={20} />
                            </a>
                            <a href="#" className="bg-white/5 border border-white/10 p-3 rounded-full hover:bg-accent hover:text-primary hover:border-accent transition-all transform hover:-translate-y-1">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="bg-white/5 border border-white/10 p-3 rounded-full hover:bg-accent hover:text-primary hover:border-accent transition-all transform hover:-translate-y-1">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
                    <p>&copy; {new Date().getFullYear()} Shree Mahamaya Devi Temple. {t('footer', 'rightsReserved')}</p>
                    <div className="mt-4 md:mt-0 space-x-6">
                        <a href="#" className="hover:text-white transition-colors">{t('footer', 'privacyPolicy')}</a>
                        <a href="#" className="hover:text-white transition-colors">{t('footer', 'termsOfService')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
