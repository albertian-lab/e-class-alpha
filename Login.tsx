
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CLASSES, CLASS_PASSWORDS, STUDENTS_DB } from '../constants';
import { User } from '../types';
import { Lock, User as UserIcon, GraduationCap, Shield, Atom, ChevronRight, Sparkles, BookOpen } from 'lucide-react';

type LoginMode = 'student' | 'admin';

const Login: React.FC = () => {
    const { login } = useApp();
    const navigate = useNavigate();
    const [mode, setMode] = useState<LoginMode>('student');
    
    // Student Form
    const [nis, setNis] = useState('');
    const [studentError, setStudentError] = useState('');

    // Admin Form
    const [adminClass, setAdminClass] = useState(CLASSES[0]);
    const [adminPassword, setAdminPassword] = useState('');
    const [adminError, setAdminError] = useState('');

    const handleStudentLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const student = STUDENTS_DB.find(s => s.nis === nis);
        
        if (student) {
            const user: User = {
                id: student.nis, // Use NIS as ID
                name: student.name,
                role: 'student',
                classId: student.classId
            };
            login(user);
            navigate('/');
        } else {
            setStudentError('NIS tidak ditemukan. Periksa kembali data Anda.');
        }
    };

    const handleAdminLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (CLASS_PASSWORDS[adminClass] === adminPassword) {
            const user: User = {
                id: `admin-${adminClass}`,
                name: `Admin ${adminClass}`,
                role: 'admin',
                classId: adminClass
            };
            login(user);
            navigate('/');
        } else {
            setAdminError('Password salah.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 relative overflow-hidden font-sans">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950">
                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                {/* Large Gradient Blobs to fill the empty look */}
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-cyan-400/10 rounded-full blur-[80px] animate-float"></div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-20 text-blue-200/40 animate-float" style={{animationDelay: '0s'}}>
                    <Atom size={64} />
                </div>
                <div className="absolute bottom-20 right-32 text-indigo-200/40 animate-float" style={{animationDelay: '1.5s'}}>
                    <BookOpen size={56} />
                </div>
                <div className="absolute top-1/3 right-10 text-cyan-200/30 animate-float" style={{animationDelay: '3s'}}>
                    <Sparkles size={48} />
                </div>
            </div>

            <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800 overflow-hidden relative z-10 flex flex-col">
                
                {/* Brand Header */}
                <div className="pt-8 pb-6 text-center px-8 border-b border-slate-100 dark:border-slate-800">
                    <div className="inline-flex items-center justify-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                            <Atom size={24} className="animate-spin-slow" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter">
                            E-CLASS <span className="text-blue-600 dark:text-blue-400">PRO</span>
                        </h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Akses Portal Akademik Terpadu</p>
                </div>

                {/* Main Content Area */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                    {/* Tabs */}
                    <div className="bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-xl flex mb-6 shadow-inner">
                        <button 
                            onClick={() => { setMode('student'); setStudentError(''); }}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${mode === 'student' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-black/5' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                        >
                            <GraduationCap size={16} /> Siswa
                        </button>
                        <button 
                            onClick={() => { setMode('admin'); setAdminError(''); }}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${mode === 'admin' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-black/5' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                        >
                            <Shield size={16} /> Admin
                        </button>
                    </div>

                    {/* Forms - Utilizing Flex Grow to fill space */}
                    <div className="flex-1 flex flex-col justify-center">
                        {mode === 'student' ? (
                            <form onSubmit={handleStudentLogin} className="space-y-5 animate-fade-in">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 ml-1">NIS (Nomor Induk Siswa)</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <UserIcon className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                        </div>
                                        <input 
                                            type="text" 
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                                            placeholder="Masukkan NIS Anda"
                                            value={nis}
                                            onChange={(e) => setNis(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                {studentError && (
                                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg flex items-center gap-2 animate-shake border border-red-100 dark:border-red-800">
                                        <Lock size={14} /> {studentError}
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95 group"
                                >
                                    Masuk Portal <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleAdminLogin} className="space-y-5 animate-fade-in">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 ml-1">Kelas Tujuan</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Shield className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                                        </div>
                                        <select 
                                            value={adminClass}
                                            onChange={(e) => setAdminClass(e.target.value)}
                                            className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                                            <ChevronRight className="text-slate-400 rotate-90" size={16} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 ml-1">Password</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Lock className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                                        </div>
                                        <input 
                                            type="password" 
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                                            placeholder="••••••••"
                                            value={adminPassword}
                                            onChange={(e) => setAdminPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                {adminError && (
                                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg flex items-center gap-2 animate-shake border border-red-100 dark:border-red-800">
                                        <Lock size={14} /> {adminError}
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 active:scale-95 group"
                                >
                                    Akses Admin <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
                
                {/* Footer - Integrated seamlessly */}
                <div className="bg-slate-50 dark:bg-slate-800/50 py-4 px-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400 font-medium">
                    <span>© 2025 E-Class Pro</span>
                    <span className="flex items-center gap-1"><Shield size={10}/> Secure Access</span>
                </div>
            </div>
            
            <style>{`
                .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default Login;
