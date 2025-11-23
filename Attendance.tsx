
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { Check, X, Thermometer, Mail, FileText, Lock, CalendarDays, Users, CalendarOff, Shield, UserCheck, Eye } from 'lucide-react';
import { CLASSES, generateStudents, ATTENDANCE_COLORS } from '../constants';
import { AttendanceStatus, Student } from '../types';
import { useApp } from '../context/AppContext';

const Attendance: React.FC = () => {
    const { getAttendance, saveAttendance, isAdminLoggedIn, adminClass, user } = useApp();
    const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
    const [students, setStudents] = useState<Student[]>([]);
    const [attendanceData, setAttendanceData] = useState<Record<string, AttendanceStatus>>({});
    
    // Date State
    const todayStr = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(todayStr);
    
    const [isSaved, setIsSaved] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    const isStudent = user?.role === 'student';
    const isSpectator = !user; // New Spectator Mode Check

    // Update time for the reminder logic
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    // Effect to handle permissions (Admin & Student)
    useEffect(() => {
        if (isAdminLoggedIn && adminClass) {
            setSelectedClass(adminClass);
        } else if (isStudent && user?.classId) {
            setSelectedClass(user.classId);
            setSelectedDate(todayStr); // Force student to today
        }
        // Spectators stay on default or selected
    }, [isAdminLoggedIn, adminClass, isStudent, user, todayStr]);

    // Load students when class changes
    useEffect(() => {
        const loadedStudents = generateStudents(selectedClass);
        setStudents(loadedStudents);
        
        // Load Saved Attendance
        const savedData = getAttendance(selectedClass, selectedDate);
        
        if (Object.keys(savedData).length > 0) {
            setAttendanceData(savedData);
        } else {
            // Initialize empty
            const initialAttendance: Record<string, AttendanceStatus> = {};
            loadedStudents.forEach(s => initialAttendance[s.id] = AttendanceStatus.UNSET);
            setAttendanceData(initialAttendance);
        }
        setIsSaved(false); // Reset save indicator on class/date change
    }, [selectedClass, selectedDate, getAttendance]);

    const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
        // Security Check: If student, ensure they are modifying ONLY themselves
        if (isStudent && studentId !== user?.id) return;
        // Spectator check (double safety, though UI should be disabled)
        if (isSpectator) return;

        const newData = {
            ...attendanceData,
            [studentId]: status
        };
        setAttendanceData(newData);
        
        // Auto save on change
        saveAttendance(selectedClass, selectedDate, newData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    // Statistics
    const stats = Object.values(AttendanceStatus)
        .filter(s => s !== AttendanceStatus.UNSET)
        .map(status => {
            let label = status as string;
            if (status === AttendanceStatus.DISPENSASI) label = 'Disp';
            
            return {
                name: label,
                fullName: status,
                count: Object.values(attendanceData).filter(s => s === status).length
            };
        });

    const statusKeys = [AttendanceStatus.HADIR, AttendanceStatus.SAKIT, AttendanceStatus.IZIN, AttendanceStatus.DISPENSASI, AttendanceStatus.ALPA];

    // --- TIME & DATE LOGIC ---
    const currentHour = currentTime.getHours();
    
    // Check if selected date is weekend
    const dateObj = new Date(selectedDate);
    const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 6 = Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // 08:00 Locking Threshold
    const isPastCutoff = currentHour >= 8; 

    // Determine if editing is locked globally for the page context
    // Admin can ALWAYS edit.
    // Student can edit IF: Not past cutoff AND It is today AND Not Weekend.
    const isGlobalLock = isStudent && (isPastCutoff || selectedDate !== todayStr || isWeekend);
    
    // Spectators can NEVER edit
    const isReadOnly = isSpectator || isGlobalLock;

    return (
        <div className="space-y-6 animate-fade-in pb-8">
            {/* Header Section */}
            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                        <span className="bg-blue-600 text-white p-2 rounded-lg shadow-lg shadow-blue-500/30">
                            <Users size={24} />
                        </span>
                        Absensi Harian
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">
                        {isStudent 
                            ? "Isi kehadiran Anda untuk hari ini." 
                            : "Rekapitulasi kehadiran siswa Semester 1 TP 2025/2026."}
                    </p>
                </div>
                
                {/* Symmetrical Input Group */}
                <div className="w-full lg:w-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full md:w-48">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-2">
                            <CalendarDays size={14} /> Tanggal
                        </label>
                        {isStudent ? (
                            <div className={`w-full h-11 rounded-lg border flex items-center justify-between shadow-inner px-4 cursor-not-allowed ${isWeekend ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400' : 'bg-slate-100 border-slate-300 text-slate-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300'}`}>
                                <div className="flex flex-col leading-none justify-center">
                                    <span className="font-bold text-sm">
                                        {isWeekend ? 'Hari Libur' : 'Hari Ini'}
                                    </span>
                                    <span className="text-[10px] opacity-80 font-medium mt-0.5">
                                        {new Date(selectedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                    </span>
                                </div>
                                <Lock size={14} />
                            </div>
                        ) : (
                            <input 
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full h-11 rounded-lg border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 transition-all"
                            />
                        )}
                    </div>
                    <div className="w-full md:w-48">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-2">
                            <Users size={14} /> Kelas
                        </label>
                        {/* Only lock class if logged in as Admin or Student. Spectators can switch. */}
                        {(isAdminLoggedIn && adminClass) || isStudent ? (
                            <div className="w-full h-11 rounded-lg border-slate-300 bg-slate-100 dark:bg-slate-700 dark:border-slate-600 text-slate-500 dark:text-slate-300 px-4 flex items-center justify-between shadow-inner cursor-not-allowed">
                                <span className="font-medium">{selectedClass}</span>
                                <Lock size={14} />
                            </div>
                        ) : (
                            <select 
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="w-full h-11 rounded-lg border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                                {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        )}
                    </div>
                </div>
            </header>

            {/* Status Banner Logic */}
            {isWeekend ? (
                // WEEKEND BANNER
                <div className="rounded-xl p-4 border flex items-start md:items-center gap-4 shadow-sm bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700">
                    <div className="p-2.5 rounded-full shrink-0 bg-slate-300 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                        <CalendarOff size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-bold uppercase tracking-wide mb-1 text-slate-700 dark:text-slate-300">
                            Hari Libur
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Tidak ada kegiatan KBM pada hari {dayOfWeek === 6 ? 'Sabtu' : 'Minggu'}. Absensi ditiadakan.
                        </p>
                    </div>
                </div>
            ) : isSpectator ? (
                 // SPECTATOR BANNER
                 <div className="rounded-xl p-4 border flex items-start md:items-center gap-4 shadow-sm bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700">
                    <div className="p-2.5 rounded-full shrink-0 bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        <Eye size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-bold uppercase tracking-wide mb-1 text-slate-700 dark:text-slate-300">
                            Mode Spectator
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Anda sedang melihat data sebagai tamu. Silakan login untuk melakukan absensi mandiri.
                        </p>
                    </div>
                </div>
            ) : isGlobalLock ? (
                // LOCKED BANNER (Past 08:00 & Student)
                <div className="rounded-xl p-4 border flex items-start md:items-center gap-4 shadow-sm bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700">
                    <div className="p-2.5 rounded-full shrink-0 bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        <Lock size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-bold uppercase tracking-wide mb-1 text-slate-700 dark:text-slate-300">
                            Absensi Ditutup
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Waktu pengisian absensi mandiri telah berakhir (08:00 WIB).
                        </p>
                    </div>
                </div>
            ) : isAdminLoggedIn && isPastCutoff ? (
                // ADMIN OVERRIDE BANNER
                <div className="rounded-xl p-4 border flex items-start md:items-center gap-4 shadow-sm bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <div className="p-2.5 rounded-full shrink-0 bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200">
                        <Shield size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-bold uppercase tracking-wide mb-1 text-blue-700 dark:text-blue-300">
                            Mode Admin
                        </h3>
                        <p className="text-sm text-blue-600 dark:text-blue-200">
                            Anda memiliki akses penuh untuk mengubah data absensi kapan saja.
                        </p>
                    </div>
                </div>
            ) : isStudent ? (
                // STUDENT ACTIVE BANNER
                 <div className="rounded-xl p-4 border flex items-start md:items-center gap-4 shadow-sm bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
                    <div className="p-2.5 rounded-full shrink-0 bg-emerald-100 text-emerald-600 dark:bg-emerald-800 dark:text-emerald-200">
                        <UserCheck size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-bold uppercase tracking-wide mb-1 text-emerald-700 dark:text-emerald-300">
                            Absensi Dibuka
                        </h3>
                        <p className="text-sm text-emerald-600 dark:text-emerald-200">
                            Silakan isi kehadiran Anda sebelum pukul <span className="font-bold">08:00 WIB</span>.
                        </p>
                    </div>
                </div>
            ) : (
                // GENERAL ADMIN BANNER
                 <div className="rounded-xl p-4 border flex items-start md:items-center gap-4 shadow-sm bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <div className="p-2.5 rounded-full shrink-0 bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200">
                        <Shield size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-bold uppercase tracking-wide mb-1 text-blue-700 dark:text-blue-300">
                            Mode Admin
                        </h3>
                        <p className="text-sm text-blue-600 dark:text-blue-200">
                            Memantau kehadiran kelas {selectedClass} tanggal {new Date(selectedDate).toLocaleDateString('id-ID')}.
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
                {/* Attendance Table Section */}
                <div className="xl:col-span-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[calc(100vh-350px)] min-h-[600px]">
                    
                    {/* Table Toolbar */}
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex justify-between items-center backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                            <h2 className="font-bold text-lg text-slate-800 dark:text-white">Daftar Siswa</h2>
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                {selectedClass}
                            </span>
                        </div>
                    </div>

                    {/* Scrollable Table Area */}
                    <div className="overflow-auto flex-grow custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-100 dark:bg-slate-950 text-xs uppercase text-slate-500 dark:text-slate-400 font-bold tracking-wider sticky top-0 z-20 shadow-sm">
                                <tr>
                                    <th className="px-4 py-4 w-14 text-center border-b border-slate-200 dark:border-slate-800">No</th>
                                    <th className="px-6 py-4 min-w-[200px] border-b border-slate-200 dark:border-slate-800">Nama Siswa</th>
                                    <th className="px-4 py-4 min-w-[450px] border-b border-slate-200 dark:border-slate-800 text-center">Status Kehadiran</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {students.map((student, index) => {
                                    // Row Permission Logic
                                    const isCurrentUser = isStudent && student.id === user?.id;
                                    
                                    // Row is editable if:
                                    // 1. User is Admin
                                    // OR
                                    // 2. User is Student AND it's their row AND page isn't locked (time/date/weekend)
                                    // Spectators (user is null) have isRowEditable = false
                                    const isRowEditable = isAdminLoggedIn || (isCurrentUser && !isGlobalLock);
                                    
                                    const highlightRow = isCurrentUser ? "bg-blue-50/50 dark:bg-blue-900/20" : "";

                                    return (
                                        <tr key={student.id} className={`group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-150 ${highlightRow}`}>
                                            <td className="px-4 py-3 text-sm text-center font-mono text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                                                {(index + 1).toString().padStart(2, '0')}
                                            </td>
                                            <td className="px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                                                {student.name}
                                                {isCurrentUser && <span className="ml-2 text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold uppercase">Saya</span>}
                                            </td>
                                            <td className="px-4 py-2">
                                                {/* Symmetrical Grid for Buttons */}
                                                <div className={`grid grid-cols-5 gap-2 max-w-xl mx-auto ${!isRowEditable ? 'opacity-40 grayscale pointer-events-none select-none' : ''}`}>
                                                    {statusKeys.map((status) => {
                                                        const isSelected = attendanceData[student.id] === status;
                                                        const baseColor = ATTENDANCE_COLORS[status];
                                                        
                                                        return (
                                                            <button
                                                                key={status}
                                                                onClick={() => isRowEditable && handleStatusChange(student.id, status)}
                                                                disabled={!isRowEditable}
                                                                className={`
                                                                    relative h-9 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all duration-200 flex items-center justify-center
                                                                    ${isSelected 
                                                                        ? 'text-white shadow-md transform scale-105 ring-2 ring-offset-1 dark:ring-offset-slate-900' 
                                                                        : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                                                                    }
                                                                    ${!isRowEditable ? 'cursor-not-allowed' : 'cursor-pointer'}
                                                                `}
                                                                style={{
                                                                    backgroundColor: isSelected ? baseColor : undefined,
                                                                    borderColor: isSelected ? baseColor : undefined,
                                                                    boxShadow: isSelected && isRowEditable ? `0 4px 12px -2px ${baseColor}66` : undefined,
                                                                    '--tw-ring-color': baseColor
                                                                } as React.CSSProperties}
                                                            >
                                                                {status === AttendanceStatus.HADIR && <Check size={14} strokeWidth={3} className="mr-1" />}
                                                                {status === AttendanceStatus.SAKIT && <Thermometer size={14} strokeWidth={3} className="mr-1" />}
                                                                {status === AttendanceStatus.IZIN && <Mail size={14} strokeWidth={3} className="mr-1" />}
                                                                {status === AttendanceStatus.DISPENSASI && <FileText size={14} strokeWidth={3} className="mr-1" />}
                                                                {status === AttendanceStatus.ALPA && <X size={14} strokeWidth={3} className="mr-1" />}

                                                                {status === AttendanceStatus.HADIR ? 'Hadir' : 
                                                                 status === AttendanceStatus.SAKIT ? 'Sakit' :
                                                                 status === AttendanceStatus.IZIN ? 'Izin' :
                                                                 status === AttendanceStatus.DISPENSASI ? 'Disp' : 'Alpa'}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Footer Summary */}
                    <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 flex justify-between">
                        <span>Total Siswa: {students.length}</span>
                        <span>Sudah Absen: {Object.values(attendanceData).filter(s => s !== AttendanceStatus.UNSET).length}</span>
                    </div>
                </div>

                {/* Statistics Section - Right Side */}
                <div className="xl:col-span-1 space-y-6 h-full flex flex-col">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 flex-grow">
                        <h2 className="font-bold text-lg mb-6 text-slate-800 dark:text-white flex items-center gap-2">
                            <div className="w-1 h-5 bg-purple-500 rounded-full"></div>
                            Statistik Realtime
                        </h2>
                        
                        <div className="h-56 w-full mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#475569" opacity={0.1} />
                                    <XAxis 
                                        dataKey="name" 
                                        tick={{fontSize: 11, fill: '#94a3b8'}} 
                                        interval={0} 
                                        axisLine={false}
                                        tickLine={false}
                                        dy={5}
                                    />
                                    <YAxis allowDecimals={false} stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip 
                                        cursor={{fill: 'transparent'}}
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px', fontSize: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                        labelStyle={{ color: '#94a3b8', marginBottom: '0.25rem' }}
                                        labelFormatter={(label, payload) => {
                                            if (payload && payload.length > 0) {
                                                return payload[0].payload.fullName;
                                            }
                                            return label;
                                        }}
                                    />
                                    <Bar dataKey="count" radius={[4, 4, 0, 0]} animationDuration={800}>
                                        {stats.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={ATTENDANCE_COLORS[entry.fullName as AttendanceStatus]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        
                        <div className="space-y-3 overflow-y-auto max-h-[300px] custom-scrollbar pr-2">
                            {stats.map((stat) => (
                                <div key={stat.name} className="flex items-center justify-between text-sm p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full ring-2 ring-white dark:ring-slate-800 shadow-sm" style={{ backgroundColor: ATTENDANCE_COLORS[stat.fullName as AttendanceStatus] }}></div>
                                        <span className="text-slate-700 dark:text-slate-300 font-medium">{stat.fullName}</span>
                                    </div>
                                    <span className="font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-700 px-2.5 py-0.5 rounded-md shadow-sm border border-slate-100 dark:border-slate-600 min-w-[30px] text-center">
                                        {stat.count}
                                    </span>
                                </div>
                            ))}
                            
                            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                                <div className="flex items-center justify-between text-sm p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center gap-3">
                                        <Lock className="w-4 h-4 text-slate-400" />
                                        <span className="text-slate-500 dark:text-slate-400 font-medium">Belum Absen</span>
                                    </div>
                                    <span className="font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700 px-2.5 py-0.5 rounded-md shadow-sm min-w-[30px] text-center">
                                        {students.length - Object.values(attendanceData).filter(s => s !== AttendanceStatus.UNSET).length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-blue-600 dark:bg-blue-900 rounded-2xl p-5 shadow-lg shadow-blue-500/20 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
                        <div className="flex gap-4 items-start relative z-10">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                <Shield className="text-white" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-base mb-1">Data Terlindungi</h4>
                                <p className="text-blue-100 text-xs leading-relaxed opacity-90">
                                    Akses absensi dibatasi sesuai pengguna dan waktu server untuk integritas data.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
