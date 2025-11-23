
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BookOpen, Clock, StickyNote, Filter, CalendarDays, ChevronDown, Tag, ArrowRight, X, Lock, CheckCircle2 } from 'lucide-react';
import { CLASSES } from '../constants';
import { Assignment } from '../types';
import { getDeadlineStatus, getCategoryColor, getSubjectIcon } from '../utils';

const AssignmentCard: React.FC<{ assignment: Assignment }> = ({ assignment }) => {
    const { user, isAssignmentCompleted } = useApp();
    const [isExpanded, setIsExpanded] = useState(false);
    const status = getDeadlineStatus(assignment.deadline);
    const category = assignment.category || 'Tugas';
    const categoryStyle = getCategoryColor(category);
    
    const isCompleted = user?.role === 'student' && isAssignmentCompleted(assignment.id);
    
    return (
        <div className={`${status.cardBg} ${status.cardBorder} border rounded-xl shadow-sm overflow-hidden flex flex-col transition-all duration-300 ${isExpanded ? 'ring-2 ring-blue-500/20 dark:ring-blue-400/20' : 'hover:shadow-md hover:-translate-y-1'} ${isCompleted ? 'opacity-80 grayscale-[0.3]' : ''}`}>
            {/* Clickable Header */}
            <div 
                className="p-5 cursor-pointer select-none" 
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2 flex-wrap items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-white/60 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50">
                            {assignment.classId}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold border ${categoryStyle}`}>
                            {category}
                        </span>
                        {isCompleted && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800 animate-pop-in">
                                <CheckCircle2 size={12} className="mr-1" /> Selesai
                            </span>
                        )}
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold whitespace-nowrap backdrop-blur-sm ${status.badgeBg} ${status.badgeColor} border ${status.cardBorder}`}>
                        <Clock size={12} className="mr-1" />
                        {status.text}
                    </span>
                </div>
                
                <div className="flex gap-3 items-center">
                    <div className="flex-shrink-0 p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50">
                        {getSubjectIcon(assignment.subject)}
                    </div>
                    <div className="flex-grow min-w-0">
                        <h3 className={`text-lg font-bold leading-tight truncate pr-2 ${isCompleted ? 'text-slate-500 dark:text-slate-400 line-through decoration-slate-400/50' : 'text-slate-900 dark:text-white'}`}>{assignment.title}</h3>
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1 truncate">{assignment.subject}</p>
                    </div>
                    <div className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDown size={20} />
                    </div>
                </div>
            </div>
            
            {/* Expandable Content */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-5 pb-5">
                    <div className="bg-white/60 dark:bg-slate-900/40 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-300 flex gap-3 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                        <StickyNote size={16} className="flex-shrink-0 mt-0.5 text-slate-400" />
                        <p className="italic break-words w-full leading-relaxed">{assignment.note || "Tidak ada catatan tambahan."}</p>
                    </div>
                </div>
                <div className="bg-white/40 dark:bg-slate-950/20 px-5 py-3 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center text-sm backdrop-blur-sm">
                    <div className="flex flex-col">
                         <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">Deadline</span>
                         <span className="font-bold text-slate-700 dark:text-slate-200">
                             {new Date(assignment.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                         </span>
                    </div>
                    <Link 
                        to={`/tugas/${assignment.id}`}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95"
                    >
                        Detail <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Assignments: React.FC = () => {
    const { assignments, isAdminLoggedIn, adminClass, user } = useApp();
    const [selectedClassFilter, setSelectedClassFilter] = useState<string>('All');
    const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

    const isStudent = user?.role === 'student';

    // Auto select class if admin or student is logged in
    useEffect(() => {
        if (isAdminLoggedIn && adminClass) {
            setSelectedClassFilter(adminClass);
        } else if (isStudent && user?.classId) {
            setSelectedClassFilter(user.classId);
        }
    }, [isAdminLoggedIn, adminClass, isStudent, user]);

    const filteredAssignments = assignments.filter(a => {
        const classMatch = selectedClassFilter === 'All' || a.classId === selectedClassFilter;
        const currentCategory = a.category || 'Tugas';
        const categoryMatch = selectedCategoryFilter === 'All' || currentCategory === selectedCategoryFilter;
        
        if (!classMatch || !categoryMatch) return false;
        if (selectedStatusFilter === 'All') return true;

        const status = getDeadlineStatus(a.deadline);
        return status.category === selectedStatusFilter;
    });

    const resetFilters = () => {
        if (!isAdminLoggedIn && !isStudent) setSelectedClassFilter('All');
        setSelectedCategoryFilter('All');
        setSelectedStatusFilter('All');
    };

    // Lock class filter only for authenticated students or admins
    const isClassLocked = (isAdminLoggedIn && !!adminClass) || isStudent;

    return (
        <div className="space-y-6 animate-fade-in pb-8">
            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Daftar Tugas</h1>
                    <p className="text-slate-500 dark:text-slate-400">Tugas aktif dan tenggat waktu pengumpulan.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
                    {/* Class Filter */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter size={16} className="text-slate-400" />
                        </div>
                        {isClassLocked ? (
                            <div className="w-full pl-10 pr-4 py-2.5 rounded-lg border-slate-300 bg-slate-100 dark:bg-slate-700 dark:border-slate-600 text-slate-500 dark:text-slate-300 shadow-sm truncate text-sm font-medium border flex items-center justify-between cursor-not-allowed">
                                <span>{selectedClassFilter}</span>
                                <Lock size={14} className="ml-2"/>
                            </div>
                        ) : (
                            <select
                                value={selectedClassFilter}
                                onChange={(e) => setSelectedClassFilter(e.target.value)}
                                className="w-full pl-10 pr-8 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none cursor-pointer text-sm font-medium transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                                <option value="All">Semua Kelas</option>
                                {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        )}
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Tag size={16} className="text-slate-400" />
                        </div>
                        <select
                            value={selectedCategoryFilter}
                            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                            className="w-full pl-10 pr-8 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none cursor-pointer text-sm font-medium transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                            <option value="All">Semua Kategori</option>
                            <option value="PR">PR</option>
                            <option value="Tugas">Tugas</option>
                            <option value="Kuis">Kuis</option>
                            <option value="Proyek">Proyek</option>
                            <option value="Ulangan">Ulangan</option>
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CalendarDays size={16} className="text-slate-400" />
                        </div>
                        <select
                            value={selectedStatusFilter}
                            onChange={(e) => setSelectedStatusFilter(e.target.value)}
                            className="w-full pl-10 pr-8 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none cursor-pointer text-sm font-medium transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                            <option value="All">Semua Status</option>
                            <option value="Segera">Segera (≤ 2 Hari)</option>
                            <option value="Akan Datang">Akan Datang</option>
                            <option value="Terlambat">Terlambat</option>
                        </select>
                    </div>
                </div>
            </header>

            {filteredAssignments.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed shadow-sm">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">Tidak ada tugas ditemukan</h3>
                    <p className="text-slate-500 mt-1 mb-6">
                        Tidak ada tugas yang cocok dengan filter yang dipilih.
                    </p>
                    {(selectedCategoryFilter !== 'All' || selectedStatusFilter !== 'All') && (
                        <button 
                            onClick={resetFilters}
                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 mx-auto"
                        >
                            <X size={16} /> Reset Filter
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAssignments.map((assignment) => (
                        <AssignmentCard key={assignment.id} assignment={assignment} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Assignments;
