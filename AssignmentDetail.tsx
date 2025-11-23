
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Clock, CalendarDays, StickyNote, CheckCircle, Circle, CheckCircle2, Users, Search } from 'lucide-react';
import { getDeadlineStatus, getCategoryColor, getSubjectIcon } from '../utils';
import { STUDENTS_DB } from '../constants';

const AssignmentDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { assignments, isAssignmentCompleted, toggleCompletion, getCompletedStudents, user } = useApp();
    const navigate = useNavigate();

    const assignment = assignments.find(a => a.id === id);

    if (!assignment) {
        return (
            <div className="text-center py-20 animate-fade-in">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Tugas tidak ditemukan</h2>
                <Link to="/tugas" className="text-blue-600 hover:underline mt-4 inline-block">Kembali ke Daftar Tugas</Link>
            </div>
        );
    }

    const isCompleted = id ? isAssignmentCompleted(id) : false;
    const status = getDeadlineStatus(assignment.deadline);
    const categoryColor = getCategoryColor(assignment.category || 'Tugas');

    // Admin View Logic
    const completedStudentIds = id ? getCompletedStudents(id) : [];
    // Get full student details for this assignment's class who have completed it
    const classStudents = STUDENTS_DB.filter(s => s.classId === assignment.classId);
    const completedStudentsList = classStudents.filter(s => completedStudentIds.includes(s.id));
    const completionPercentage = Math.round((completedStudentsList.length / classStudents.length) * 100) || 0;

    return (
        <div className="animate-fade-in max-w-5xl mx-auto pb-12">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6 font-medium">
                <ArrowLeft size={20} /> Kembali
            </button>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
                 {/* Header */}
                 <div className="p-6 md:p-8 relative z-10">
                    <div className="flex flex-wrap gap-3 mb-6">
                         <span className="px-3 py-1 rounded-full text-sm font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {assignment.classId}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${categoryColor}`}>
                            {assignment.category || 'Tugas'}
                        </span>
                         <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1.5 ${status.badgeBg} ${status.badgeColor} border ${status.cardBorder}`}>
                            <Clock size={14} /> {status.text}
                        </span>
                        {user?.role === 'student' && isCompleted && (
                            <span className="px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                                <CheckCircle2 size={14} /> Selesai
                            </span>
                        )}
                    </div>

                    <div className="flex items-start gap-6">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hidden md:flex items-center justify-center w-20 h-20">
                            {getSubjectIcon(assignment.subject)}
                        </div>
                        <div className="flex-1">
                            <h1 className={`text-3xl md:text-4xl font-bold mb-2 leading-tight ${user?.role === 'student' && isCompleted ? 'text-slate-500 dark:text-slate-500 line-through decoration-slate-400/50' : 'text-slate-900 dark:text-white'}`}>
                                {assignment.title}
                            </h1>
                            <p className="text-xl text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2">
                                {assignment.subject}
                            </p>
                        </div>
                    </div>
                 </div>
                 
                 <div className="h-px bg-slate-200 dark:bg-slate-800 mx-6 md:mx-8"></div>

                 {/* Content */}
                 <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <StickyNote size={16} /> Catatan / Instruksi
                            </h3>
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                {assignment.note ? assignment.note : <span className="italic text-slate-400">Tidak ada catatan tambahan.</span>}
                            </div>
                        </div>

                        {/* Admin View: Completion List */}
                        {user?.role === 'admin' && (
                            <div className="mt-8 animate-slide-up">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                        <Users size={16} /> Status Pengumpulan Siswa
                                    </h3>
                                    <span className="text-xs font-bold px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                                        {completedStudentsList.length} / {classStudents.length} ({completionPercentage}%)
                                    </span>
                                </div>
                                
                                <div className="bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                    <div className="p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                                            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="max-h-60 overflow-y-auto custom-scrollbar p-2">
                                        {completedStudentsList.length > 0 ? (
                                            <ul className="space-y-1">
                                                {completedStudentsList.map((student, idx) => (
                                                    <li key={student.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
                                                        <span className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                                                            {idx + 1}
                                                        </span>
                                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{student.name}</span>
                                                        <CheckCircle size={14} className="ml-auto text-green-500" />
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-center text-sm text-slate-500 py-4 italic">Belum ada siswa yang menyelesaikan tugas ini.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        {/* Student Action Card */}
                        {user?.role === 'student' && (
                            <div className={`rounded-xl p-5 border shadow-sm transition-all duration-300 ${isCompleted ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                                <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${isCompleted ? 'text-green-700 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>
                                    {isCompleted ? <CheckCircle size={16} /> : <Circle size={16} />} Status Pengerjaan
                                </h3>
                                <button
                                    onClick={() => id && toggleCompletion(id)}
                                    className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                                        isCompleted 
                                        ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/30' 
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200'
                                    }`}
                                >
                                    {isCompleted ? (
                                        <>
                                            <CheckCircle size={20} /> Selesai
                                        </>
                                    ) : (
                                        <>
                                            <Circle size={20} /> Tandai Selesai
                                        </>
                                    )}
                                </button>
                                {isCompleted && <p className="text-xs text-center mt-3 text-green-600 dark:text-green-400 font-medium animate-fade-in">Tugas ini telah ditandai selesai.</p>}
                            </div>
                        )}

                        {/* Admin Action info */}
                        {user?.role === 'admin' && (
                            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                                <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-2">Kontrol Admin</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Anda melihat halaman ini sebagai Admin. Anda dapat memantau siapa saja yang telah menyelesaikan tugas.
                                </p>
                            </div>
                        )}

                        {/* Deadline Card */}
                        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-5 border border-blue-100 dark:border-blue-800/30">
                            <h3 className="text-sm font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <CalendarDays size={16} /> Deadline
                            </h3>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-slate-800 dark:text-white">
                                    {new Date(assignment.deadline).toLocaleDateString('id-ID', { day: 'numeric' })}
                                </p>
                                <p className="text-lg font-medium text-slate-600 dark:text-slate-300 uppercase">
                                    {new Date(assignment.deadline).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 pt-2 border-t border-blue-200 dark:border-blue-800">
                                    Hari {new Date(assignment.deadline).toLocaleDateString('id-ID', { weekday: 'long' })}
                                </p>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default AssignmentDetail;
