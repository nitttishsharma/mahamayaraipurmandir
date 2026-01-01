import React from 'react';
import { galleryImages } from '../data/gallery';
import { useLanguage } from '../context/LanguageContext';

const Gallery = () => {
    const { t, language } = useLanguage();
    const images = galleryImages[language] || galleryImages.en;
    return (
        <div className="bg-cream min-h-screen">
            {/* Hero / Header Section */}
            <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1547906733-87a177a52f99?q=80&w=2070"
                        alt="Temple Gallery Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/30"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pt-20">
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg">{t('galleryPage', 'title')}</h1>
                    <div className="h-1 w-32 bg-accent mb-8"></div>
                    <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl drop-shadow-md">
                        {t('galleryPage', 'subtitle')}
                    </p>
                </div>
            </section>

            {/* Gallery Grid Section */}
            <section className="py-20 px-4 bg-cream relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-temple-pattern bg-repeat opacity-5 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((image, index) => (
                            <div key={image.id} className={`relative group overflow-hidden rounded-xl shadow-lg border border-amber-100 ${index % 3 === 0 ? 'md:row-span-2 h-96' : 'h-64'}`}>
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-white font-serif text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {image.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-3 rounded-full font-semibold transition-all duration-300 uppercase tracking-widest text-sm">
                            {t('galleryPage', 'loadMore')}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Gallery;
