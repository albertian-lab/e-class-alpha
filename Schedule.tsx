
import React, { useState, useEffect } from 'react';
import { CLASSES, SCHEDULES } from '../constants';
import { Calendar, Clock, BookOpen, Lock } from 'lucide-react';
import { getSubjectIcon } from '../utils';
import { useApp } from '../context/AppContext';

const Schedule: React.FC = () => {
    const { isAdminLoggedIn, adminClass, user } = useApp();
    const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
    
    // Auto select class if admin or student is logged in
    useEffect(() => {
        if (isAdminLoggedIn && adminClass) {
            setSelectedClass(adminClass);
        } else if (user?.role === 'student' && user.classId) {
            setSelectedClass(user.classId);
        }
    }, [isAdminLoggedIn, adminClass, user]);

    const currentSchedule = SCHEDULES[selectedClass] || [];
    // Lock class selector only for logged-in students or admins bound to a class. 
    // Spectators (user=null) should be free to browse.
    const isLocked = (isAdminLoggedIn && !!adminClass) || user?.role === 'student';

    return (
        <div className="space-y-6 animate-fade-in">
             <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Jadwal Pelajaran</h1>
                    <p className="text-slate-500 dark:text-slate-400">Jadwal aktif Semester 1 TP 2025/2026.</p>
                </div>
                <div className="w-full md:w-auto">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pilih Kelas</label>
                    {isLocked ? (
                         <div className="w-full md:w-48 h-11 rounded-lg border-slate-300 bg-slate-100 dark:bg-slate-700 dark:border-slate-600 text-slate-500 dark:text-slate-300 px-3 flex items-center justify-between shadow-inner cursor-not-allowed">
                            <span className="font-medium px-2">{selectedClass}</span>
                            <Lock size={16} className="mr-2" />
                        </div>
                    ) : (
                        <select 
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full md:w-48 h-11 rounded-lg border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 cursor-pointer"
                        >
                            {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentSchedule.map((daySchedule) => (
                    <div key={daySchedule.day} className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 group">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                            <div className="flex items-center gap-2">
                                <Calendar className="text-blue-500" size={20} />
                                <h2 className="font-bold text-lg text-slate-800 dark:text-white uppercase tracking-wider">{daySchedule.day}</h2>
                            </div>
                        </div>
                        <div className="p-4">
                            <ul className="space-y-3">
                                {daySchedule.lessons.map((lesson, idx) => (
                                    <li key={idx} className={`relative pl-6 border-l-2 ${lesson.subject === 'ISTIRAHAT' ? 'border-yellow-300 dark:border-yellow-600' : 'border-slate-200 dark:border-slate-700'} pb-2 last:pb-0 last:border-0`}>
                                        <div className={`absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full ${lesson.subject === 'ISTIRAHAT' ? 'bg-yellow-400' : 'bg-blue-500'} ring-4 ring-white dark:ring-slate-900`}></div>
                                        <div className="flex gap-3 items-start">
                                            <div className={`mt-0.5 p-1.5 rounded-lg border flex-shrink-0 ${lesson.subject === 'ISTIRAHAT' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}>
                                                 {getSubjectIcon(lesson.subject)}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className={`text-xs font-semibold flex items-center gap-1 mb-0.5 ${lesson.subject === 'ISTIRAHAT' ? 'text-yellow-600 dark:text-yellow-500' : 'text-blue-600 dark:text-blue-400'}`}>
                                                    <Clock size={10} /> {lesson.time}
                                                </span>
                                                <span className={`text-sm font-bold leading-tight truncate ${lesson.subject === 'ISTIRAHAT' ? 'text-slate-500 italic' : 'text-slate-900 dark:text-white'}`}>
                                                    {lesson.subject}
                                                </span>
                                                {lesson.code && lesson.subject !== 'ISTIRAHAT' && (
                                                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                                                        <BookOpen size={10} /> Kode: {lesson.code}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Schedule;
