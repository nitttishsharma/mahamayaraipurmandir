import Hero from '../components/Hero';
import Heritage from '../components/Heritage';
import GalleryPreview from '../components/GalleryPreview';
import EventsList from '../components/EventsList';
import WelcomePopup from '../components/WelcomePopup';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Home = () => {
    const { t } = useLanguage();
    return (
        <>
            <WelcomePopup />
            <Hero />
            <Heritage />
            <GalleryPreview />
            <section className="py-24 bg-cream relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4 drop-shadow-sm">{t('home', 'upcomingEvents')}</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6"></div>
                        <p className="text-[#787878] text-lg font-medium">{t('home', 'eventsDesc')}</p>
                    </div>
                    <EventsList disableModal={true} />
                    <div className="text-center mt-12">
                        <Link to="/events" className="inline-block px-8 py-3 border-2 border-secondary text-secondary font-semibold rounded-full hover:bg-secondary hover:text-white transition-all duration-300">
                            {t('eventsPreview', 'viewAll')}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
