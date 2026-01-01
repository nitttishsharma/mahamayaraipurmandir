import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const GalleryPreview = () => {
    const { t } = useLanguage();
    // Subset of images for preview
    const previewImages = [
        "https://images.unsplash.com/photo-1547906733-87a177a52f99?q=80&w=2070",
        "https://images.unsplash.com/photo-1582632909120-2f8e3f0f8b8d?q=80&w=2070",
        "https://images.unsplash.com/photo-1623945417431-155502a95325?q=80&w=2070",
        "https://images.unsplash.com/photo-1604085600618-9366dca0b13d?q=80&w=2070",
    ];

    return (
        <section id="gallery" className="py-24 bg-cream relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">

                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">{t('galleryPreview', 'title')}</h2>
                    <p className="text-[#787878] text-lg max-w-2xl mx-auto">
                        {t('galleryPreview', 'description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {previewImages.map((src, index) => (
                        <div key={index} className="relative group overflow-hidden rounded-xl h-64 shadow-md">
                            <img
                                src={src}
                                alt={`Gallery Preview ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/gallery" className="inline-block px-8 py-3 border-2 border-secondary text-secondary font-semibold rounded-full hover:bg-secondary hover:text-white transition-all duration-300">
                        {t('galleryPreview', 'viewAll')}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GalleryPreview;
