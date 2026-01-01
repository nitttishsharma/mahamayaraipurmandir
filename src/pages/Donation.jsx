import React from 'react';
import { CreditCard, Smartphone, Heart, Copy } from 'lucide-react';
import { donationCampaigns, bankDetails, upiDetails, donationStats } from '../data/donations';
import { useLanguage } from '../context/LanguageContext';

const Donation = () => {
    const { t, language } = useLanguage();
    const campaigns = donationCampaigns[language] || donationCampaigns.en;
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        // Could add a toast notification here
    };

    return (
        <section className="py-24 bg-cream relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-temple-pattern bg-repeat opacity-5"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif text-primary mb-4 drop-shadow-sm">{t('donationPage', 'title')}</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6"></div>
                    <p className="text-lg text-darkText/80 max-w-2xl mx-auto font-medium">
                        {t('donationPage', 'subtitle')}
                    </p>
                </div>

                {/* Campaigns Scroll/Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {campaigns.map((campaign) => (
                        <div key={campaign.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-100 group hover:-translate-y-1 transition-transform duration-300">
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={campaign.image}
                                    alt={campaign.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {campaign.daysLeft > 0 && (
                                    <div className="absolute top-4 left-4 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                                        {campaign.daysLeft} {t('donationPage', 'daysLeft')}
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-serif text-primary mb-2">{campaign.title}</h3>
                                <p className="text-sm text-darkText/70 mb-4 line-clamp-3">
                                    {campaign.desc}
                                </p>
                                <button className="w-full bg-secondary hover:bg-amber-600 text-white py-2 rounded-full font-bold transition-colors">
                                    {t('donationPage', 'donateBtn')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Other Donation Methods */}
                    <div>
                        <h3 className="text-3xl font-serif text-primary mb-8 border-l-4 border-secondary pl-4">{t('donationPage', 'otherMethods')}</h3>

                        <div className="space-y-6">
                            {/* Bank Transfer */}
                            <div className="bg-white p-6 rounded-xl shadow-md border border-amber-50">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-serif text-lg text-primary flex items-center">
                                        <CreditCard className="w-5 h-5 mr-2 text-secondary" />
                                        {t('donationPage', 'bankTransfer')}
                                    </h4>
                                    <Copy className="w-4 h-4 text-gray-400 cursor-pointer hover:text-secondary" onClick={() => handleCopy(bankDetails.accountNumber)} />
                                </div>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">{t('donationPage', 'accountNumber')}</span>
                                        <span className="font-mono text-darkText font-medium">{bankDetails.accountNumber}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">{t('donationPage', 'beneficiaryName')}</span>
                                        <span className="text-darkText font-medium">{bankDetails.accountName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">{t('donationPage', 'ifsc')}</span>
                                        <span className="font-mono text-darkText font-medium">{bankDetails.ifsc}</span>
                                    </div>
                                </div>
                            </div>

                            {/* UPI */}
                            <div className="bg-white p-6 rounded-xl shadow-md border border-amber-50">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-serif text-lg text-primary flex items-center">
                                        <Smartphone className="w-5 h-5 mr-2 text-secondary" />
                                        {t('donationPage', 'upi')}
                                    </h4>
                                    <Copy className="w-4 h-4 text-gray-400 cursor-pointer hover:text-secondary" onClick={() => handleCopy(upiDetails.mobile)} />
                                </div>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-1 space-y-3 text-sm">
                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span className="text-gray-500">{t('donationPage', 'mobileNumber')}</span>
                                            <span className="font-mono text-darkText font-medium">{upiDetails.mobile}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">{t('donationPage', 'upiId')}</span>
                                            <span className="font-mono text-darkText font-medium">{upiDetails.upiId}</span>
                                        </div>
                                    </div>
                                    <div className="border border-gray-200 rounded-lg p-2 bg-white mx-auto md:mx-0">
                                        {/* QR Code Placeholder */}
                                        <div className="w-24 h-24 bg-gray-100 flex items-center justify-center">
                                            <img
                                                src={upiDetails.qrCode}
                                                alt="QR Code"
                                                className="w-full h-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress / Total Donation */}
                    <div className="bg-white p-8 rounded-xl shadow-xl border-t-8 border-secondary relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Heart size={120} className="text-secondary" />
                        </div>

                        <h3 className="text-5xl font-serif text-darkText mb-2">₹{donationStats.totalRaised.toLocaleString()}</h3>
                        <p className="text-gray-500 mb-6 font-medium">{t('donationPage', 'totalRaised')}</p>

                        <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                            <div className="bg-secondary h-3 rounded-full" style={{ width: `${(donationStats.totalRaised / donationStats.goal) * 100}%` }}></div>
                        </div>

                        <div className="flex justify-between text-sm mb-8">
                            <div>
                                <p className="text-gray-500">{t('donationPage', 'goal')}</p>
                                <p className="font-bold text-darkText">₹{donationStats.goal.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500">{t('donationPage', 'remaining')}</p>
                                <p className="font-bold text-darkText">₹{(donationStats.goal - donationStats.totalRaised).toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center text-darkText/80">
                                <span className="w-8 text-center mr-3 font-bold">{donationStats.daysLeft}</span>
                                <span>{t('donationPage', 'daysLeft')}</span>
                            </div>
                            <div className="flex items-center text-darkText/80">
                                <Heart className="w-5 h-5 mr-3 text-red-500 fill-current" />
                                <span>{donationStats.contributors} {t('donationPage', 'contributors')}</span>
                            </div>
                        </div>

                        <button className="w-full bg-secondary hover:bg-amber-600 text-white py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
                            {t('donationPage', 'donate')} <Heart className="ml-2 w-5 h-5 fill-white" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Donation;
