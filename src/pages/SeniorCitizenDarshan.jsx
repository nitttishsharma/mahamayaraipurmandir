import { useLanguage } from '../context/LanguageContext';
import { UserCheck, Accessibility, Clock, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';

const SeniorCitizenDarshan = () => {
    const { language, t } = useLanguage();

    return (
        <div className="min-h-screen bg-cream pt-40 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-serif text-primary mb-4 leading-tight">
                        {t('seniorCitizenPage', 'title')}
                    </h1>
                    <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600">
                        {t('seniorCitizenPage', 'subtitle')}
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-secondary/10 p-8 md:p-12 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="flex items-start space-x-4">
                            <div className="bg-orange-100 p-3 rounded-full text-secondary">
                                <Accessibility size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{t('seniorCitizenPage', 'wheelchairTitle')}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {t('seniorCitizenPage', 'wheelchairDesc')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-orange-100 p-3 rounded-full text-secondary">
                                <UserCheck size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{t('seniorCitizenPage', 'priorityTitle')}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {t('seniorCitizenPage', 'priorityDesc')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8 border-l-4 border-secondary">
                        <h3 className="text-xl font-serif text-primary mb-4 font-bold flex items-center">
                            <Clock className="mr-2" size={24} />
                            {t('seniorCitizenPage', 'timingsTitle')}
                        </h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 shrink-0"></span>
                                <span>{t('seniorCitizenPage', 'timeInfo')}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 shrink-0"></span>
                                <span>{t('seniorCitizenPage', 'idProof')}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 shrink-0"></span>
                                <span>{t('seniorCitizenPage', 'attendant')}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-600 mb-4">{t('seniorCitizenPage', 'assistance')}</p>
                        <a href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`} className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-red-900 transition-colors shadow-lg">
                            <Phone size={20} />
                            <span>{t('seniorCitizenPage', 'callHelpline')}: {CONTACT_INFO.phone}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeniorCitizenDarshan;
