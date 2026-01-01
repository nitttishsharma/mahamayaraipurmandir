import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { LayoutDashboard, Calendar, Image, Users, Heart, LogOut, Settings } from 'lucide-react';

const AdminLayout = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-primary font-serif text-xl">Loading Admin Portal...</div>;
    }

    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Events', path: '/admin/events', icon: <Calendar size={20} /> },
        { name: 'Gallery', path: '/admin/gallery', icon: <Image size={20} /> },
        { name: 'Committee', path: '/admin/committee', icon: <Users size={20} /> },
        { name: 'Donations', path: '/admin/donations', icon: <Heart size={20} /> },
        { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-white shadow-xl flex flex-col z-20">
                <div className="p-6 border-b border-white/10">
                    <h1 className="font-serif text-xl font-bold tracking-wide">CMS Admin</h1>
                    <p className="text-xs text-white/60 mt-1">Shree Mahamaya Temple</p>
                </div>

                <nav className="flex-1 py-6 space-y-1 px-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors group ${location.pathname === item.path
                                ? 'bg-white/20 text-white font-medium'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-red-200 hover:bg-red-900/30 hover:text-red-100 rounded-lg transition-colors"
                    >
                        <LogOut size={20} className="mr-3" />
                        Logout
                    </button>
                    <div className="mt-4 text-xs text-center text-white/30">
                        {session.user.email}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative">
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
                    </h2>
                    <Link to="/" target="_blank" className="text-primary text-sm hover:underline">
                        View Live Site
                    </Link>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
