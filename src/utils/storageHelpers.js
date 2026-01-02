import { supabase } from '../supabaseClient';

/**
 * Deletes an image from the 'images' bucket in Supabase Storage.
 * Extract the file path from the full public URL.
 * @param {string} fullUrl - The full public URL of the image.
 * @returns {Promise<{data, error}>} - The result of the remove operation.
 */
export const deleteImageFromStorage = async (fullUrl) => {
    if (!fullUrl) return { data: null, error: null };

    try {
        // Extract the file path from the URL
        // Example URL: https://xyz.supabase.co/storage/v1/object/public/images/0.123.jpg
        // We need: 0.123.jpg

        // This regex looks for 'images/' and captures everything after it
        const matches = fullUrl.match(/\/images\/(.+)$/);

        if (matches && matches[1]) {
            const filePath = decodeURIComponent(matches[1]);
            const { data, error } = await supabase
                .storage
                .from('images')
                .remove([filePath]);

            return { data, error };
        } else {
            console.warn('Could not extract file path from URL:', fullUrl);
            return { error: 'Invalid URL format' };
        }
    } catch (err) {
        console.error('Error deleting image:', err);
        return { error: err };
    }
};
