import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Save, Link as LinkIcon, AlertCircle, CheckCircle } from 'lucide-react';

const SettingsManager = () => {
    const [settings, setSettings] = useState({
        youtube_live_url: '',
        facebook_live_url: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('site_settings')
                .select('*');

            if (error) throw error;

            if (data) {
                const newSettings = { ...settings };
                data.forEach(item => {
                    if (newSettings.hasOwnProperty(item.key)) {
                        newSettings[item.key] = item.value;
                    }
                });
                setSettings(newSettings);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
            setMessage({ type: 'error', text: 'Failed to load settings.' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            // Upsert YouTube URL
            const { error: ytError } = await supabase
                .from('site_settings')
                .upsert({
                    key: 'youtube_live_url',
                    value: settings.youtube_live_url,
                    description: 'URL for YouTube Live Stream'
                }, { onConflict: 'key' });

            if (ytError) throw ytError;

            // Upsert Facebook URL
            const { error: fbError } = await supabase
                .from('site_settings')
                .upsert({
                    key: 'facebook_live_url',
                    value: settings.facebook_live_url,
                    description: 'URL for Facebook Live Stream'
                }, { onConflict: 'key' });

            if (fbError) throw fbError;

            setMessage({ type: 'success', text: 'Live stream settings updated successfully!' });
        } catch (error) {
            console.error('Error saving settings:', error);
            setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Site Settings</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
                <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-700">
                    <LinkIcon className="mr-2" size={24} />
                    Live Darshan Links
                </h2>

                {message.text && (
                    <div className={`p-4 rounded-lg mb-6 flex items-center ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.type === 'success' ? <CheckCircle className="mr-2" size={20} /> : <AlertCircle className="mr-2" size={20} />}
                        {message.text}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading settings...</div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Live Embed URL</label>
                            <input
                                type="text"
                                name="youtube_live_url"
                                value={settings.youtube_live_url}
                                onChange={handleChange}
                                placeholder="https://www.youtube.com/embed/..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-1">Paste the full embed URL (e.g. from the 'Embed' tab on YouTube).</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Live Video URL</label>
                            <input
                                type="text"
                                name="facebook_live_url"
                                value={settings.facebook_live_url}
                                onChange={handleChange}
                                placeholder="https://www.facebook.com/plugins/video.php?..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-1">Paste the Facebook video embed URL.</p>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className={`flex items-center justify-center w-full px-6 py-3 rounded-lg text-white font-medium transition-all ${saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-red-800 shadow-md hover:shadow-lg'
                                    }`}
                            >
                                <Save className="mr-2" size={20} />
                                {saving ? 'Saving Changes...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SettingsManager;
