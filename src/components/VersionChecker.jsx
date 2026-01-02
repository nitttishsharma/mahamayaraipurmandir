import React, { useEffect, useState } from 'react';

const VersionChecker = () => {
    const [version, setVersion] = useState(null);

    useEffect(() => {
        fetch('/version.json')
            .then(res => res.json())
            .then(data => setVersion(data.version))
            .catch(err => console.error('Failed to fetch version:', err));
    }, []);

    if (!version) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md text-xs text-gray-600 z-50">
            v{version}
        </div>
    );
};

export default VersionChecker;
