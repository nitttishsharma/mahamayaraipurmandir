import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Upload, Loader, CheckCircle, X } from 'lucide-react';

const PaymentScreenshotUpload = ({ leadId, onUploadComplete }) => {
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB');
            return;
        }

        setError('');
        setUploading(true);

        try {
            // Create unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `payment_${leadId}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            // Update donation_leads record with screenshot URL
            const { error: updateError } = await supabase
                .from('donation_leads')
                .update({ payment_screenshot: publicUrl })
                .eq('id', leadId);

            if (updateError) throw updateError;

            setPreviewUrl(publicUrl);
            setUploaded(true);
            if (onUploadComplete) onUploadComplete(publicUrl);
        } catch (err) {
            console.error('Error uploading screenshot:', err);
            setError('Failed to upload screenshot. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const clearUpload = () => {
        setPreviewUrl('');
        setUploaded(false);
        setError('');
    };

    return (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-6">
            <div className="flex items-center mb-4">
                <Upload className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-green-900">Upload Payment Screenshot</h4>
            </div>
            <p className="text-sm text-green-700 mb-4">
                Please upload a screenshot of your payment confirmation to help us verify your donation.
            </p>

            {!uploaded ? (
                <div>
                    <label className="block">
                        <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-400 hover:bg-green-100 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                disabled={uploading}
                            />
                            {uploading ? (
                                <div className="flex flex-col items-center">
                                    <Loader className="w-8 h-8 text-green-600 animate-spin mb-2" />
                                    <span className="text-sm text-green-700">Uploading...</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <Upload className="w-8 h-8 text-green-600 mb-2" />
                                    <span className="text-sm text-green-700 font-medium">Click to upload screenshot</span>
                                    <span className="text-xs text-green-600 mt-1">PNG, JPG up to 5MB</span>
                                </div>
                            )}
                        </div>
                    </label>

                    {error && (
                        <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center flex-1">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-green-900">Screenshot uploaded successfully!</p>
                                {previewUrl && (
                                    <img
                                        src={previewUrl}
                                        alt="Payment Screenshot"
                                        className="mt-2 max-w-xs rounded border border-gray-200"
                                    />
                                )}
                            </div>
                        </div>
                        <button
                            onClick={clearUpload}
                            className="text-gray-400 hover:text-gray-600 ml-2"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentScreenshotUpload;
