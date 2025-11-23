import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Activity, Calendar, BookOpen, Users, Shield, Atom, LayoutDashboard, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useApp();
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/', icon: <LayoutDashboard size={18} /> },
        { name: 'Absensi', path: '/absensi', icon: <Activity size={18} /> },
        { name: 'Jadwal', path: '/jadwal', icon: <Calendar size={18} /> },
        { name: 'Tugas', path: '/tugas', icon: <BookOpen size={18} /> },
        { name: 'Kelompok', path: '/kelompok', icon: <Users size={18} /> },
        { name: 'AI Asisten', path: '/ai-assistant', icon: <Sparkles size={18} /> }, // New AI Assistant item
        { name: 'Admin', path: '/admin', icon: <Shield size={18} /> },
    ];

    const getLinkClass = (path: string, isMobile: boolean = false) => {
        const isActive = location.pathname === path;

        const baseClasses = isMobile 
            ? "flex items-center gap-3 block px-3 py-2 rounded-md text-base font-medium"
            : "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200";

        if (isActive) {
            return `${baseClasses} bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm`;
        }
        return `${baseClasses} text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-300`;
    };

    return (
        <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo Section - Strictly Centered & Symmetrical */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3 group select-none">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                                <Atom size={24} className="animate-spin-slow" />
                            </div>
                            <div className="flex flex-col justify-center h-10">
                                <span className="font-black text-xl text-slate-800 dark:text-white tracking-tighter leading-none">E-CLASS</span>
                                <span className="text-[0.65rem] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.38em] leading-none mt-1">PRO</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={getLinkClass(item.path)}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        ))}
                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleTheme}
                            className="mr-2 p-2 rounded-md text-slate-600 dark:text-slate-300"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 absolute w-full shadow-xl">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={getLinkClass(item.path, true)}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
