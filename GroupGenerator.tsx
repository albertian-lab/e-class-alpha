
import React, { useState, useEffect } from 'react';
import { CLASSES, generateStudents } from '../constants';
import { Student } from '../types';
import { RefreshCw, Users, UserPlus, Settings2, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

type GroupMode = 'byMemberCount' | 'byGroupCount';

const GroupGenerator: React.FC = () => {
    const { isAdminLoggedIn, adminClass, user } = useApp();
    const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
    const [mode, setMode] = useState<GroupMode>('byMemberCount');
    const [inputValue, setInputValue] = useState<number>(4);
    const [groups, setGroups] = useState<Student[][]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    // Auto select class if admin or student is logged in
    useEffect(() => {
        if (isAdminLoggedIn && adminClass) {
            setSelectedClass(adminClass);
        } else if (user?.role === 'student' && user.classId) {
            setSelectedClass(user.classId);
        }
    }, [isAdminLoggedIn, adminClass, user]);

    // Lock class filter only for authenticated students or admins
    const isClassLocked = (isAdminLoggedIn && !!adminClass) || user?.role === 'student';

    const handleGenerate = () => {
        setIsGenerating(true);
        // Use timeout to simulate "processing" and allow UI to update
        setTimeout(() => {
            const students = generateStudents(selectedClass);
            
            // Fisher-Yates Shuffle
            const shuffled = [...students];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }

            const newGroups: Student[][] = [];
            const val = Math.max(1, inputValue);

            if (mode === 'byMemberCount') {
                // Split by N members per group
                for (let i = 0; i < shuffled.length; i += val) {
                    newGroups.push(shuffled.slice(i, i + val));
                }
            } else {
                // Split into N total groups
                const totalGroups = Math.min(val, shuffled.length);
                
                // Initialize empty arrays
                for (let i = 0; i < totalGroups; i++) {
                    newGroups.push([]);
                }
                
                // Distribute
                shuffled.forEach((student, index) => {
                    const groupIndex = index % totalGroups;
                    newGroups[groupIndex].push(student);
                });
            }

            setGroups(newGroups);
            setIsGenerating(false);
        }, 800);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <header>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Generator Kelompok</h1>
                <p className="text-slate-500 dark:text-slate-400">Acak kelompok belajar secara adil dan cepat.</p>
            </header>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Pilih Kelas</label>
                        {isClassLocked ? (
                             <div className="w-full h-11 rounded-lg border-slate-300 bg-slate-100 dark:bg-slate-700 dark:border-slate-600 text-slate-500 dark:text-slate-300 px-3 flex items-center justify-between cursor-not-allowed">
                                <span>{selectedClass}</span>
                                <Lock size={14} />
                            </div>
                        ) : (
                            <select 
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="w-full h-11 rounded-lg border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3"
                            >
                                {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        )}
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Metode Pembagian</label>
                        <select 
                            value={mode}
                            onChange={(e) => setMode(e.target.value as GroupMode)}
                            className="w-full h-11 rounded-lg border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3"
                        >
                            <option value="byMemberCount">Berdasarkan Jumlah Anggota</option>
                            <option value="byGroupCount">Berdasarkan Jumlah Kelompok</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                            {mode === 'byMemberCount' ? 'Anggota Per Kelompok' : 'Total Kelompok'}
                        </label>
                        <div className="relative">
                            <Settings2 className="absolute left-3 top-3.5 text-slate-400" size={16} />
                            <input 
                                type="number" 
                                min="1" 
                                max="50"
                                value={inputValue}
                                onChange={(e) => setInputValue(parseInt(e.target.value) || 1)}
                                className="w-full h-11 rounded-lg border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 px-3"
                            />
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-70 transform active:scale-95 px-4 w-full"
                    >
                        <RefreshCw size={20} className={isGenerating ? "animate-spin" : ""} />
                        {isGenerating ? 'Mengacak...' : 'Generate Kelompok'}
                    </button>
                </div>
            </div>

            {groups.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {groups.map((group, index) => (
                        <div key={index} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-pop-in shadow-md hover:shadow-xl transition-shadow" style={{animationDelay: `${index * 0.05}s`}}>
                            <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                                <h3 className="font-bold text-slate-800 dark:text-white text-lg">Kelompok {index + 1}</h3>
                                <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                                    {group.length} Siswa
                                </span>
                            </div>
                            <ul className="p-4 space-y-3">
                                {group.map((student, sIdx) => (
                                    <li key={student.id} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 w-5 h-5 flex items-center justify-center rounded mt-0.5">{sIdx + 1}</span>
                                        <span className="font-medium">{student.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GroupGenerator;
