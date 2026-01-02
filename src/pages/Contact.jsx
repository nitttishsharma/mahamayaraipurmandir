import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';
import { useLanguage } from '../context/LanguageContext';



const Contact = () => {
    const { t, language } = useLanguage();
    const [status, setStatus] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here

        const form = e.target;

        const res = await fetch("https://formspree.io/f/mdakzoow", {
            method: "POST",
            body: new FormData(form),
            headers: {
                Accept: "application/json",
            },
        });

        if (res.ok) {
            setStatus("success");
            form.reset();
            setFormData({ name: "", email: "", message: "" });

            setTimeout(() => setStatus(null), 4000);
        } else {
            setStatus("error");
        }
    };

    return (
        <section className="py-24 bg-cream relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-temple-pattern bg-repeat opacity-5"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">{t('contactPage', 'title')}</h2>
                    <p className="text-lg text-darkText/80">
                        {t('contactPage', 'subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Info & Map */}
                    <div className="space-y-8">
                        {/* Info Card */}
                        <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-accent">
                            <h3 className="text-2xl font-serif text-primary mb-6 text-center">{t('contactPage', 'templeInfo')}</h3>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <MapPin className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-primary">Shree Mahamaya Devi Temple</p>
                                        <p className="text-sm text-darkText/70 whitespace-pre-line">{CONTACT_INFO.address[language]}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <Phone className="w-6 h-6 text-secondary flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-primary">Phone</p>
                                        <p className="text-sm text-darkText/70">{CONTACT_INFO.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <Mail className="w-6 h-6 text-secondary flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-primary">E-MAIL</p>
                                        <p className="text-sm text-darkText/70">{CONTACT_INFO.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 bg-accent/20 p-4 rounded-md border-l-4 border-accent">
                                <p className="text-sm text-darkText/80">
                                    <span className="font-bold text-primary">{t('contactPage', 'specialNoteTitle')}</span> {t('contactPage', 'specialNote')}
                                </p>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-gray-200 h-64 rounded-lg overflow-hidden shadow-md relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.0030062952546!2d81.62621691003986!3d21.231729380387367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28ddb9d6719d4b%3A0x360d89032d7ab9bb!2sShree%20Rajarajeshwari%20Maa%20Mahamaya%20Devi%20Mandir%20Raipur!5e0!3m2!1sen!2sin!4v1767361688195!5m2!1sen!2sin"
                                className="w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>


                        </div>

                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-accent h-fit">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder={t('contactPage', 'formName')}
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder={t('contactPage', 'formEmail')}
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors"
                                    required
                                />
                            </div>
                            <input type="hidden" name="_subject" value="New Feedback from Mahamaya Temple Website" />
                            <div>
                                <label htmlFor="message" className="sr-only">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    placeholder={t('contactPage', 'formMessage')}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-colors resize-none"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-secondary hover:bg-amber-600 text-white py-4 rounded-full font-bold text-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                            >
                                <span>{t('contactPage', 'formSubmit')}</span>
                                <Send className="w-5 h-5" />
                            </button>
                            {status === "success" && (
                                <p className="text-green-500 mt-4 text-center">
                                    {t('contactPage', 'Thank you 🙏 Your feedback has been sent')}
                                </p>
                            )}
                            {status === "error" && (
                                <p className="text-red-500 mt-4 text-center">
                                    {t('contactPage', 'Something went wrong. Please try again.')}
                                </p>
                            )}
                        </form>

                        <div className="mt-8 bg-accent/20 p-4 rounded-md border-l-4 border-accent">
                            <p className="text-sm text-darkText/80">
                                <span className="font-bold text-primary">{t('contactPage', 'specialNoteTitle')}</span> {t('contactPage', 'specialNote')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
