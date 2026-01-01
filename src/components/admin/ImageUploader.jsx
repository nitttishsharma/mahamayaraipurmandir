import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Upload, X, Loader } from 'lucide-react';

const ImageUploader = ({ onUpload, currentImage }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage || '');

    const handleUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);

            setPreview(data.publicUrl);
            onUpload(data.publicUrl);
        } catch (error) {
            console.error('Error uploading image:', error.message);
            alert('Error uploading image!');
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview('');
        onUpload('');
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            {preview ? (
                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploading ? (
                            <Loader className="w-8 h-8 text-primary animate-spin mb-3" />
                        ) : (
                            <Upload className="w-8 h-8 text-gray-400 mb-3" />
                        )}
                        <p className="mb-2 text-sm text-gray-500">
                            {uploading ? 'Uploading...' : <><span className="font-semibold">Click to upload</span> or drag and drop</>}
                        </p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                    />
                </label>
            )}
        </div>
    );
};

export default ImageUploader;
