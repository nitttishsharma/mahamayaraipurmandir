import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../supabaseClient';
import { Loader } from 'lucide-react';

const GalleryPreview = () => {
    const { t, language } = useLanguage();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPreviewImages();
    }, []);

    const fetchPreviewImages = async () => {
        try {
            const { data, error } = await supabase
                .from('gallery')
                .select('*')
                .eq('is_featured', true)
                .order('created_at', { ascending: false })
                .limit(4);

            if (error) throw error;
            setImages(data || []);
        } catch (error) {
            console.error('Error fetching gallery preview:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="gallery" className="py-24 bg-cream relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">{t('galleryPreview', 'title')}</h2>
                    <p className="text-[#787878] text-lg max-w-2xl mx-auto">
                        {t('galleryPreview', 'description')}
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="w-10 h-10 text-primary animate-spin" />
                    </div>
                ) : images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <div key={image.id} className="relative group overflow-hidden rounded-xl h-64 shadow-md bg-gray-100">
                                <img
                                    src={image.image_url}
                                    alt={language === 'hi' ? image.title_hi : image.title_en}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
                                    <p className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transform">
                                        {language === 'hi' ? image.title_hi : image.title_en}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <p>{language === 'hi' ? 'गैलरी में कोई चित्र नहीं हैं' : 'No images available in gallery'}</p>
                    </div>
                )}

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
