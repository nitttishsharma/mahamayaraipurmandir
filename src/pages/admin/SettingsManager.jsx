import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Save, Link as LinkIcon, AlertCircle, CheckCircle, Image as ImageIcon, MessageSquare } from 'lucide-react';
import ImageUploader from '../../components/admin/ImageUploader';
import { deleteImageFromStorage } from '../../utils/storageHelpers';

const SettingsManager = () => {
    const [settings, setSettings] = useState({
        youtube_live_url: '',
        facebook_live_url: '',
        popup_enabled: 'false',
        popup_image: '',
        popup_link: '',
        heritage_image: ''
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

    const handleImageUpload = async (url) => {
        // If there was an existing image and we are replacing it (url is different), delete the old one
        if (settings.popup_image && settings.popup_image !== url) {
            await deleteImageFromStorage(settings.popup_image);
        }
        setSettings(prev => ({ ...prev, popup_image: url }));
    };

    const handleHeritageImageUpload = async (url) => {
        // If there was an existing image and we are replacing it (url is different), delete the old one
        if (settings.heritage_image && settings.heritage_image !== url) {
            await deleteImageFromStorage(settings.heritage_image);
        }
        setSettings(prev => ({ ...prev, heritage_image: url }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const updates = [
                { key: 'youtube_live_url', value: settings.youtube_live_url, description: 'URL for YouTube Live Stream' },
                { key: 'facebook_live_url', value: settings.facebook_live_url, description: 'URL for Facebook Live Stream' },
                { key: 'popup_enabled', value: settings.popup_enabled, description: 'Enable/Disable Welcome Popup' },
                { key: 'popup_image', value: settings.popup_image, description: 'Image URL for Welcome Popup' },
                { key: 'popup_link', value: settings.popup_link, description: 'Optional link for Welcome Popup' },
                { key: 'heritage_image', value: settings.heritage_image, description: 'Image URL for Heritage Section' }
            ];

            for (const update of updates) {
                const { error } = await supabase
                    .from('site_settings')
                    .upsert(update, { onConflict: 'key' });
                if (error) throw error;
            }

            setMessage({ type: 'success', text: 'Settings updated successfully!' });
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

            <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Live Darshan Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
                    <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-700">
                        <LinkIcon className="mr-2" size={24} />
                        Live Darshan Links
                    </h2>

                    {loading ? (
                        <div className="text-center py-10 text-gray-500">Loading settings...</div>
                    ) : (
                        <div className="space-y-6">
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
                                <p className="text-xs text-gray-500 mt-1">Paste the full embed URL.</p>
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
                            </div>
                        </div>
                    )}
                </div>

                {/* Welcome Popup Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
                    {/* ... (keep existing popup settings code) ... */}
                    <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-700">
                        <MessageSquare className="mr-2" size={24} />
                        Welcome Popup Settings
                    </h2>

                    {loading ? (
                        <div className="text-center py-10 text-gray-500">Loading settings...</div>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        name="popup_enabled"
                                        checked={settings.popup_enabled === 'true'}
                                        onChange={(e) => setSettings(prev => ({ ...prev, popup_enabled: e.target.checked ? 'true' : 'false' }))}
                                        className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                                    />
                                    <span className="text-gray-700 font-medium">Enable Welcome Popup</span>
                                </label>
                                <p className="text-xs text-gray-500 mt-1 ml-8">Shows a popup when users visit the home page.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Popup Image</label>
                                <ImageUploader
                                    onUpload={handleImageUpload}
                                    currentImage={settings.popup_image}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Popup Link (Optional)</label>
                                <input
                                    type="text"
                                    name="popup_link"
                                    value={settings.popup_link}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                                <p className="text-xs text-gray-500 mt-1">If set, clicking the popup image will redirect here.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Heritage Section Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
                    <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-700">
                        <ImageIcon className="mr-2" size={24} />
                        Heritage Section Settings
                    </h2>

                    {loading ? (
                        <div className="text-center py-10 text-gray-500">Loading settings...</div>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Heritage Image</label>
                                <p className="text-xs text-gray-500 mb-3"> This image appears in the "Sacred Heritage" section on the homepage. </p>
                                <ImageUploader
                                    onUpload={handleHeritageImageUpload}
                                    currentImage={settings.heritage_image}
                                />
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <div className="mt-8">
                {message.text && (
                    <div className={`p-4 rounded-lg mb-6 flex items-center max-w-4xl ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.type === 'success' ? <CheckCircle className="mr-2" size={20} /> : <AlertCircle className="mr-2" size={20} />}
                        {message.text}
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className={`flex items-center justify-center w-full max-w-xs px-6 py-3 rounded-lg text-white font-medium transition-all ${saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-red-800 shadow-md hover:shadow-lg'
                        }`}
                >
                    <Save className="mr-2" size={20} />
                    {saving ? 'Saving Changes...' : 'Save All Settings'}
                </button>
            </div>
        </div>
    );
};

export default SettingsManager;
