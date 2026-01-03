import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Default to Hindi if no stored preference
    const [language, setLanguage] = useState(() => {
        const savedLang = localStorage.getItem('language');
        return savedLang || 'hi';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
    };

    // Unified t function to handle both (section, key) and ("section.key")
    const t = (sectionOrKey, key) => {
        // Handle t('section.key') case
        if (!key && typeof sectionOrKey === 'string' && sectionOrKey.includes('.')) {
            const keys = sectionOrKey.split('.');
            let value = translations[language];
            for (const k of keys) {
                value = value?.[k];
            }
            return value || sectionOrKey;
        }

        // Handle t('section', 'key') case
        if (key && translations[language][sectionOrKey] && translations[language][sectionOrKey][key]) {
            return translations[language][sectionOrKey][key];
        }

        // Fallback
        console.warn(`Missing translation for ${language}.${sectionOrKey}.${key}`);
        return key || sectionOrKey;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
