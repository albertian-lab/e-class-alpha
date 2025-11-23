
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CLASSES } from '../constants';
import { Assignment, AssignmentCategory } from '../types';
import { Plus, Trash2, Edit2, Save, X, BookOpen, Lock, Tag } from 'lucide-react';

const Admin: React.FC = () => {
    const { assignments, addAssignment, deleteAssignment, updateAssignment, isAdminLoggedIn, adminClass } = useApp();
    
    // Admin Content State
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Assignment>>({
        classId: CLASSES[0],
        subject: '',
        title: '',
        deadline: '',
        note: '',
        category: 'Tugas'
    });

    // If not admin, this component shouldn't really be rendered due to ProtectedRoute,
    // but just in case or for TS correctness:
    if (!isAdminLoggedIn || !adminClass) {
        return <div className="p-8 text-center text-red-500">Akses Ditolak. Halaman ini hanya untuk Admin.</div>;
    }

    // Filter assignments based on logged-in admin class
    const classAssignments = assignments.filter(a => a.classId === adminClass);

    // Set initial form classId when logged in
    useEffect(() => {
        if (adminClass) {
            setFormData(prev => ({ ...prev, classId: adminClass }));
        }
    }, [adminClass]);

    const resetForm = () => {
        setFormData({
            classId: adminClass,
            subject: '',
            title: '',
            deadline: '',
            note: '',
            category: 'Tugas'
        });
        setIsEditing(null);
    };

    const handleEditClick = (assignment: Assignment) => {
        setIsEditing(assignment.id);
        setFormData(assignment);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        resetForm();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.subject || !formData.title || !formData.deadline) return;

        // Security check: ensure admin can only modify their own class
        if (formData.classId !== adminClass) return;

        if (isEditing) {
            updateAssignment(isEditing, formData);
        } else {
            const newAssignment: Assignment = {
                id: Date.now().toString(),
                classId: formData.classId!,
                subject: formData.subject!,
                title: formData.title!,
                deadline: formData.deadline!,
                note: formData.note || '',
                category: formData.category || 'Tugas'
            };
            addAssignment(newAssignment);
        }
        resetForm();
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Panel Admin</h1>
                    <p className="text-slate-500 dark:text-slate-400">Kelola tugas untuk kelas <span className="font-bold text-blue-600 dark:text-blue-400">{adminClass}</span></p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add/Edit Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 sticky top-24">
                        <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white flex items-center gap-2">
                            {isEditing ? (
                                <><Edit2 size={20} className="text-yellow-500" /> Edit Tugas</>
                            ) : (
                                <><Plus size={20} className="text-blue-500" /> Tambah Tugas Baru</>
                            )}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kelas</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={adminClass} 
                                        disabled 
                                        className="w-full rounded-md border-slate-300 bg-slate-100 dark:bg-slate-800 dark:border-slate-700 text-slate-500 dark:text-slate-400 p-2.5 pl-9 text-sm font-bold cursor-not-allowed"
                                    />
                                    <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kategori</label>
                                <div className="relative">
                                    <select
                                        className="w-full rounded-md border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white p-2.5 text-sm focus:ring-2 focus:ring-blue-500 pl-9"
                                        value={formData.category || 'Tugas'}
                                        onChange={e => setFormData({...formData, category: e.target.value as AssignmentCategory})}
                                    >
                                        <option value="PR">PR (Pekerjaan Rumah)</option>
                                        <option value="Tugas">Tugas Sekolah</option>
                                        <option value="Kuis">Kuis</option>
                                        <option value="Proyek">Proyek</option>
                                        <option value="Ulangan">Ulangan Harian</option>
                                    </select>
                                    <Tag size={16} className="absolute left-3 top-3 text-slate-400 pointer-events-none"/>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mata Pelajaran</label>
                                <input 
                                    type="text" 
                                    className="w-full rounded-md border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                                    placeholder="Contoh: Matematika"
                                    value={formData.subject}
                                    onChange={e => setFormData({...formData, subject: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Judul Tugas</label>
                                <input 
                                    type="text" 
                                    className="w-full rounded-md border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                                    placeholder="Judul tugas..."
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tenggat Waktu</label>
                                <input 
                                    type="date" 
                                    className="w-full rounded-md border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                                    value={formData.deadline}
                                    onChange={e => setFormData({...formData, deadline: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Catatan (Opsional)</label>
                                <textarea 
                                    className="w-full rounded-md border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                    placeholder="Instruksi tambahan..."
                                    value={formData.note}
                                    onChange={e => setFormData({...formData, note: e.target.value})}
                                />
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    type="submit"
                                    className={`flex-1 text-white font-medium py-2.5 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 ${isEditing ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {isEditing ? <Save size={18} /> : <Plus size={18} />}
                                    {isEditing ? 'Simpan Perubahan' : 'Simpan Tugas'}
                                </button>
                                {isEditing && (
                                    <button 
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="px-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* List View */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Daftar Tugas {adminClass}</h2>
                        <span className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Total: {classAssignments.length}</span>
                    </div>
                    
                    {classAssignments.length === 0 && (
                         <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed">
                            <BookOpen className="mx-auto h-12 w-12 text-slate-400 mb-4 opacity-50" />
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white">Belum ada tugas</h3>
                            <p className="text-slate-500 text-sm mt-1">Silakan tambah tugas baru melalui form di samping.</p>
                        </div>
                    )}

                    {classAssignments.map(assignment => (
                        <div key={assignment.id} className={`bg-white dark:bg-slate-900 rounded-lg border p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all group ${isEditing === assignment.id ? 'border-yellow-500 ring-1 ring-yellow-500 shadow-md' : 'border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700'}`}>
                            <div className="flex-1 w-full">
                                <div className="flex items-center justify-between md:justify-start gap-2 mb-2">
                                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                                        {assignment.subject}
                                    </span>
                                     <span className="text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded">
                                        {assignment.category || 'Tugas'}
                                    </span>
                                    <div className="md:hidden flex gap-2 ml-auto">
                                        <button 
                                            onClick={() => handleEditClick(assignment)}
                                            className="p-1.5 text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 rounded hover:bg-yellow-100"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            onClick={() => deleteAssignment(assignment.id)}
                                            className="p-1.5 text-red-600 bg-red-50 dark:bg-red-900/20 rounded hover:bg-red-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-slate-800 dark:text-white text-lg">{assignment.title}</h3>
                                {assignment.note && (
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1 italic bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded">"{assignment.note}"</p>
                                )}
                                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                                    Deadline: {new Date(assignment.deadline).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                            
                            <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button 
                                    onClick={() => handleEditClick(assignment)}
                                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                                >
                                    <Edit2 size={16} /> Edit
                                </button>
                                <button 
                                    onClick={() => deleteAssignment(assignment.id)}
                                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                >
                                    <Trash2 size={16} /> Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;
