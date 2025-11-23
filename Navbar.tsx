
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Activity, Calendar, BookOpen, Users, Shield, Atom, LayoutDashboard, LogOut, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme, user, logout } = useApp();
    const location = useLocation();
    const navigate = useNavigate();

    // Hide Navbar only on Login page to focus on the form
    if (location.pathname === '/login') return null;

    const navItems = [
        { name: 'Beranda', path: '/', icon: <LayoutDashboard size={18} /> },
        { name: 'Absensi', path: '/absensi', icon: <Activity size={18} /> },
        { name: 'Jadwal', path: '/jadwal', icon: <Calendar size={18} /> },
        { name: 'Tugas', path: '/tugas', icon: <BookOpen size={18} /> },
        { name: 'Kelompok', path: '/kelompok', icon: <Users size={18} /> },
        { name: 'Admin', path: '/admin', icon: <Shield size={18} /> },
    ];

    const getLinkClass = (path: string, isMobile: boolean = false) => {
        const isActive = location.pathname === path;

        const baseClasses = isMobile 
            ? "flex items-center gap-3 block px-3 py-3 rounded-lg text-base font-medium"
            : "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200";

        if (isActive) {
            return `${baseClasses} bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400`;
        }
        return `${baseClasses} text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-300`;
    };

    return (
        <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo Section */}
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
                    <div className="hidden md:flex items-center gap-1">
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
                        
                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-3"></div>
                        
                        {user ? (
                            /* User Profile Info - Symmetrical Pill Design */
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-3 pl-1 pr-1 py-1 rounded-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                                    <div className="text-right hidden lg:block pl-3">
                                        <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight truncate max-w-[200px] xl:max-w-[220px]" title={user.name}>
                                            {user.name}
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                                            {user.role === 'admin' ? 'Admin' : user.classId}
                                        </div>
                                    </div>
                                    
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-800 ${user.role === 'admin' ? 'bg-indigo-500' : 'bg-blue-500'}`}>
                                        {user.role === 'admin' ? <Shield size={14} /> : user.name.charAt(0)}
                                    </div>
                                </div>

                                <button
                                    onClick={toggleTheme}
                                    title="Ganti Tema"
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                                >
                                    {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                                </button>
                                
                                <button
                                    onClick={logout}
                                    title="Keluar"
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-800"
                                >
                                    <LogOut size={16} />
                                </button>
                            </div>
                        ) : (
                            /* Guest / Spectator Mode Buttons */
                            <div className="flex items-center gap-2">
                                 <button
                                    onClick={toggleTheme}
                                    title="Ganti Tema"
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                                >
                                    {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                                </button>
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg active:scale-95"
                                >
                                    <LogIn size={16} />
                                    Masuk
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-3">
                        {user ? (
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md ${user.role === 'admin' ? 'bg-indigo-500' : 'bg-blue-500'}`}>
                                {user.role === 'admin' ? <Shield size={16} /> : user.name.charAt(0)}
                            </div>
                        ) : (
                             <Link to="/login" className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md">
                                <LogIn size={16} />
                            </Link>
                        )}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 absolute w-full shadow-2xl animate-slide-up h-[calc(100vh-80px)] overflow-y-auto">
                    {user ? (
                        <div className="px-6 py-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg ring-4 ring-white dark:ring-slate-800 ${user.role === 'admin' ? 'bg-indigo-500' : 'bg-blue-500'}`}>
                                    {user.role === 'admin' ? <Shield size={28} /> : user.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-slate-800 dark:text-white leading-tight">{user.name}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                                        {user.role === 'admin' ? `Administrator Kelas ${user.classId}` : `Siswa ${user.classId} • ${user.id}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                         <div className="px-6 py-6 bg-blue-50 dark:bg-blue-900/10 border-b border-slate-200 dark:border-slate-700 text-center">
                            <p className="text-slate-600 dark:text-slate-300 font-medium mb-3">Anda sedang dalam Mode Tamu</p>
                             <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-transform active:scale-95 w-full justify-center"
                            >
                                <LogIn size={20} />
                                Login Sekarang
                            </Link>
                         </div>
                    )}

                    <div className="px-4 py-4 space-y-2">
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
                        <div className="border-t border-slate-200 dark:border-slate-700 my-4 pt-4 flex gap-3">
                            <button
                                onClick={toggleTheme}
                                className="flex-1 flex items-center justify-center gap-2 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold transition-transform active:scale-95"
                            >
                                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />} Mode
                            </button>
                            {user && (
                                <button
                                    onClick={logout}
                                    className="flex-1 flex items-center justify-center gap-2 p-3.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold transition-transform active:scale-95"
                                >
                                    <LogOut size={20} /> Keluar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
