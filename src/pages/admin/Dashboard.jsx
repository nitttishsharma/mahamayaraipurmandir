import React from 'react';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
                <h3 className="text-lg font-semibold text-gray-700">Welcome to the CMS</h3>
                <p className="text-gray-500 mt-2">Select a module from the sidebar to start managing content.</p>
            </div>
        </div>
    );
};

export default Dashboard;
