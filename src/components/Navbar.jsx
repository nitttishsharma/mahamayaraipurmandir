import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { language, toggleLanguage, t } = useLanguage();

    const navLinks = [
        { name: t('navbar', 'home'), href: '/' },
        { name: t('navbar', 'about'), href: '/about' },
        { name: t('navbar', 'events'), href: '/events' },
        { name: t('navbar', 'gallery'), href: '/gallery' },
        { name: t('navbar', 'committee'), href: '/committee' },
        { name: t('navbar', 'contact'), href: '/contact' },
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-gradient-to-r from-primary to-[#9F3B2F] text-white shadow-lg fixed w-full z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-24 items-center">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center space-x-4">
                            {/* Temple Logo */}
                            <img
                                src="/images/common/logo.jpg"
                                alt="Shree Mahamaya Devi Temple"
                                className="w-16 h-16 rounded-full object-cover border-2 border-accent shadow-[0_0_15px_rgba(252,224,67,0.3)]"
                            />
                            <div className="flex flex-col">
                                <span className="font-serif text-xl tracking-wider uppercase text-white drop-shadow-md leading-none">
                                    Shree Mahamaya
                                </span>
                                <span className="font-serif text-lg tracking-widest uppercase text-accent drop-shadow-sm leading-none mt-1">
                                    Devi Mandir
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden lg:flex space-x-8 items-center bg-white/10 px-8 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`font-sans font-medium hover:text-accent transition-colors duration-300 uppercase text-sm tracking-wide relative group ${isActive(link.href) ? 'text-accent' : ''}`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                            </Link>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center space-x-4">
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all text-white border border-white/10"
                        >
                            <Globe size={18} />
                            <span className="uppercase text-sm font-medium tracking-wide">
                                {language === 'en' ? 'हिन्दी' : 'English'}
                            </span>
                        </button>
                        <Link to="/donation" className="inline-block bg-secondary hover:bg-amber-600 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-[0_4px_14px_0_rgba(217,119,6,0.39)] hover:shadow-[0_6px_20px_rgba(217,119,6,0.23)] hover:-translate-y-1 transform border border-orange-400/30">
                            {t('navbar', 'donate')}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-accent focus:outline-none">
                            {isOpen ? <X size={32} /> : <Menu size={32} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-primary/95 backdrop-blur-md absolute w-full border-t border-white/10 shadow-xl">
                    <div className="px-4 pt-4 pb-8 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`block px-4 py-3 rounded-lg text-lg font-medium hover:bg-white/10 hover:text-accent transition-colors ${isActive(link.href) ? 'text-accent bg-white/10' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button className="w-full mt-4 bg-secondary text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-lg">
                            {t('navbar', 'donate')}
                        </button>
                        <button
                            onClick={() => {
                                toggleLanguage();
                                setIsOpen(false);
                            }}
                            className="w-full mt-3 bg-white/10 text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center space-x-2"
                        >
                            <Globe size={20} />
                            <span>{language === 'en' ? 'हिंदी में स्विच करें' : 'Switch to English'}</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
