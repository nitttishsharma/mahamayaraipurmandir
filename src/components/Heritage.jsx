import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Heritage = () => {
    const { t } = useLanguage();
    return (
        <section id="about" className="py-24 bg-cream relative overflow-hidden">
            {/* ... (keep existing background code) ... */}
            {/* Background Decorative Circles */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-serif text-primary mb-6 drop-shadow-sm">{t('heritage', 'title')}</h2>
                    <p className="text-[#787878] max-w-3xl mx-auto text-lg md:text-xl font-medium tracking-wide">
                        {t('heritage', 'description')}
                    </p>
                    {/* Divider */}
                    <div className="flex items-center justify-center gap-2 mt-8 opacity-60">
                        <div className="w-16 h-[1px] bg-secondary"></div>
                        <div className="w-2 h-2 rotate-45 border border-secondary"></div>
                        <div className="w-16 h-[1px] bg-secondary"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-secondary/10 shadow-sm leading-relaxed text-lg md:text-xl text-darkText/80 font-medium">
                            <p className="mb-6">
                                {t('heritage', 'text1')}
                            </p>
                            <p>
                                {t('heritage', 'text2')}
                            </p>
                        </div>
                        <Link to="/about" className="inline-flex bg-secondary hover:bg-amber-600 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 items-center gap-2 group">
                            {t('heritage', 'readHistory')}
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                    {/* Image Content */}
                    <div className="relative group order-1 lg:order-2">
                        {/* Pattern behind image */}
                        <div className="absolute -inset-4 border-2 border-secondary/20 rounded-[2rem] -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
                        <div className="absolute -inset-4 border-2 border-primary/20 rounded-[2rem] rotate-3 group-hover:rotate-0 transition-transform duration-500 delay-75"></div>

                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src="/images/home/Abouthome.jpeg"
                                alt="Temple Deity"
                                className="w-full h-[600px] object-cover object-top transform transition duration-700 group-hover:scale-105"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-secondary/20 animate-bounce-slow">
                            <div className="text-center">
                                <span className="block text-3xl font-serif font-bold text-primary">1200+</span>
                                <span className="text-sm font-medium text-secondary uppercase tracking-wider">{t('heritage', 'yearsOld')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Heritage;
