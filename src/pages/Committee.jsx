import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { Loader, User } from 'lucide-react';

const Committee = () => {
    const { t, language } = useLanguage();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const { data, error } = await supabase
                .from('committee')
                .select('*')
                .order('member_order', { ascending: true });

            if (error) throw error;
            setMembers(data || []);
        } catch (error) {
            console.error('Error fetching committee:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="pt-40 pb-24 bg-cream relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-temple-pattern bg-repeat opacity-5"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4 drop-shadow-sm">{t('committee', 'title')}</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6"></div>
                    <p className="text-[#787878] text-lg font-medium max-w-2xl mx-auto">
                        {t('committee', 'subtitle')}
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader className="w-10 h-10 text-primary animate-spin" />
                    </div>
                ) : members.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        <p>No committee members listed.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {members.map((member) => (
                            <div key={member.id} className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center group">
                                <div className="w-56 h-56 mx-auto mb-6 rounded-full border-4 border-secondary/20 p-1 group-hover:border-secondary transition-colors duration-300 shadow-inner">
                                    <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                                        {member.image_url ? (
                                            <img src={member.image_url} alt={language === 'hi' ? member.name_hi : member.name_en} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-primary text-3xl font-serif">
                                                <User className="w-12 h-12" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-xl font-serif text-primary font-bold mb-1">
                                    {language === 'hi' ? member.name_hi : member.name_en}
                                </h3>
                                <p className="text-secondary font-medium text-sm uppercase tracking-wider">
                                    {language === 'hi' ? member.role_hi : member.role_en}
                                </p>

                                <div className="mt-4 w-12 h-0.5 bg-gray-200 mx-auto group-hover:bg-accent transition-colors"></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Committee;
