import React, { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { Loader, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
    const { t, language } = useLanguage();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const modalRef = useRef(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const { data, error } = await supabase
                .from('gallery')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setImages(data || []);
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') setCurrentImageIndex((prev) => (prev + 1) % images.length);
            if (e.key === 'ArrowLeft') setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, images.length]);

    // Handle clicking outside the image to close
    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeLightbox();
        }
    };

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
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader className="w-10 h-10 text-primary animate-spin" />
                        </div>
                    ) : images.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            <p>No images in the gallery yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {images.map((image, index) => (
                                <div
                                    key={image.id}
                                    className={`relative group overflow-hidden rounded-xl shadow-lg border border-amber-100 cursor-pointer ${index % 3 === 0 ? 'md:row-span-2 h-96' : 'h-64'}`}
                                    onClick={() => openLightbox(index)}
                                >
                                    <img
                                        src={image.image_url}
                                        alt={language === 'hi' ? image.title_hi : image.title_en}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <div>
                                            <p className="text-white font-serif text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                {language === 'hi' ? image.title_hi : image.title_en}
                                            </p>
                                            <p className="text-accent text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                                {language === 'hi' ? image.category_hi : image.category_en}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            {lightboxOpen && images.length > 0 && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={handleBackdropClick}
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
                        aria-label="Close"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={40} />
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full"
                        aria-label="Next"
                    >
                        <ChevronRight size={40} />
                    </button>

                    <div
                        ref={modalRef}
                        className="max-h-[85vh] max-w-5xl w-full flex flex-col items-center"
                    >
                        <img
                            src={images[currentImageIndex].image_url}
                            alt={language === 'hi' ? images[currentImageIndex].title_hi : images[currentImageIndex].title_en}
                            className="max-h-[75vh] w-auto max-w-full object-contain rounded-md shadow-2xl"
                        />
                        <div className="mt-4 text-center">
                            <h3 className="text-white text-xl font-serif">
                                {language === 'hi' ? images[currentImageIndex].title_hi : images[currentImageIndex].title_en}
                            </h3>
                            <p className="text-accent/80 text-sm mt-1">
                                {language === 'hi' ? images[currentImageIndex].category_hi : images[currentImageIndex].category_en}
                            </p>
                        </div>
                        <div className="absolute bottom-6 text-white/40 text-xs tracking-widest">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
