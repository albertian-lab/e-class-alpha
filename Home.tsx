
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Calendar, BookOpen, Users, ArrowRight, Clock, CheckCircle2, AlertTriangle, CheckCircle, LogIn, AlertCircle, MapPin, XCircle, Coffee } from 'lucide-react';
import { CLASSES, SCHEDULES } from '../constants';
import { useApp } from '../context/AppContext';
import { getDeadlineStatus, getSubjectIcon } from '../utils';
import { AttendanceStatus } from '../types';

const Home: React.FC = () => {
  const { assignments, user, getAttendance, isAssignmentCompleted } = useApp();

  // 1. Filter assignments based on user's class if logged in
  const classAssignments = assignments.filter(a => {
      if (!user?.classId) return true; // Show all for spectators
      return a.classId === user.classId;
  });

  // 2. Separate into Pending vs Completed (if Student)
  // If not student (spectator/admin), consider all as "pending" for visualization
  const pendingAssignments = user?.role === 'student' 
      ? classAssignments.filter(a => !isAssignmentCompleted(a.id))
      : classAssignments;

  const completedCount = user?.role === 'student'
      ? classAssignments.length - pendingAssignments.length
      : 0;

  // 3. Calculate Stats based on PENDING assignments only
  const totalPending = pendingAssignments.length;
  const urgentTasks = pendingAssignments.filter(a => getDeadlineStatus(a.deadline).category === 'Segera').length;
  const lateTasks = pendingAssignments.filter(a => getDeadlineStatus(a.deadline).category === 'Terlambat').length;
  
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const dateString = today.toLocaleDateString('id-ID', dateOptions);
  const dayName = today.toLocaleDateString('id-ID', { weekday: 'long' });
  const dateIso = today.toISOString().split('T')[0];

  // Daily Summary Data
  const todaySchedule = user ? SCHEDULES[user.classId]?.find(d => d.day === dayName) : null;
  
  // Tasks Due Today (Only show Pending ones)
  const tasksDueToday = pendingAssignments.filter(a => {
      const d = new Date(a.deadline);
      return d.getDate() === today.getDate() && 
             d.getMonth() === today.getMonth() && 
             d.getFullYear() === today.getFullYear();
  });

  const attendanceRecord = user ? getAttendance(user.classId, dateIso) : {};
  const myStatus = user ? attendanceRecord[user.id] : null;
  const hasAbsenced = myStatus && myStatus !== AttendanceStatus.UNSET;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 dark:from-blue-900 dark:to-slate-900 shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        
        {/* Content Container - Split Layout */}
        <div className="relative z-10 px-6 py-12 md:px-12 flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Column: Welcome Text */}
          <div className="flex-1 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/30 backdrop-blur-md border border-blue-400/30 text-blue-50 text-sm font-bold shadow-lg">
                <Clock size={16} /> {dateString}
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Selamat Datang <br/>
              {user ? (
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200 leading-snug">
                    {user.name}
                 </span>
              ) : (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200 leading-snug">
                    di E-Class Pro
                 </span>
              )}
            </h1>
            
            <p className="text-lg text-blue-100 leading-relaxed max-w-xl">
              {user 
                ? `Platform manajemen kelas terpadu. Pantau absensi, jadwal pelajaran, dan tugas sekolah untuk kelas ${user.classId} dengan mudah.`
                : "Platform manajemen kelas terpadu. Pantau absensi, jadwal, dan tugas sekolah. Silakan login untuk akses fitur lengkap."
              }
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              {user ? (
                  <>
                    <Link to="/absensi" className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:scale-105 hover:shadow-xl active:scale-95">
                        Mulai Absensi <ArrowRight size={18} />
                    </Link>
                    <Link to="/jadwal" className="bg-blue-600/40 backdrop-blur-md border border-white/20 text-white hover:bg-blue-600/50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95">
                        Lihat Jadwal
                    </Link>
                  </>
              ) : (
                   <Link to="/login" className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:scale-105 hover:shadow-xl active:scale-95">
                        Login Sekarang <LogIn size={18} />
                    </Link>
              )}
            </div>
          </div>

          {/* Right Column: Assignment Summary Card */}
          <div className="w-full max-w-md">
            {/* Increased opacity for better visibility */}
            <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl text-white relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/30 rounded-full blur-3xl"></div>

                <div className="flex justify-between items-center mb-6 border-b border-white/20 pb-4 relative z-10">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <BookOpen size={20} className="text-blue-200" /> 
                        {user ? "Ringkasan Tugas" : "Statistik Sistem"}
                    </h3>
                    <Link to="/tugas" className="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                        Lihat Semua <ArrowRight size={12}/>
                    </Link>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-6 relative z-10">
                    <div className="bg-blue-950/40 p-3 rounded-xl text-center border border-blue-400/30 backdrop-blur-sm">
                        <span className="block text-2xl font-bold mb-1">{totalPending}</span>
                        <span className="text-[10px] uppercase tracking-wider opacity-80">Sisa</span>
                    </div>
                    <div className="bg-orange-900/40 p-3 rounded-xl text-center border border-orange-400/30 text-orange-100 backdrop-blur-sm">
                        <span className="block text-2xl font-bold mb-1">{urgentTasks}</span>
                        <span className="text-[10px] uppercase tracking-wider opacity-80">Segera</span>
                    </div>
                    <div className="bg-red-900/40 p-3 rounded-xl text-center border border-red-400/30 text-red-100 backdrop-blur-sm">
                        <span className="block text-2xl font-bold mb-1">{lateTasks}</span>
                        <span className="text-[10px] uppercase tracking-wider opacity-80">Telat</span>
                    </div>
                </div>

                <div className="space-y-3 relative z-10">
                    {user ? (
                        (urgentTasks > 0 || lateTasks > 0) ? (
                            <div className="flex items-start gap-3 text-sm bg-orange-500/20 p-3 rounded-lg border border-orange-500/30">
                                <AlertTriangle size={18} className="text-orange-200 flex-shrink-0 mt-0.5" />
                                <span className="leading-snug">
                                    Ada <span className="font-bold text-orange-100">{urgentTasks + lateTasks} tugas belum selesai</span> yang membutuhkan perhatian Anda.
                                </span>
                            </div>
                        ) : totalPending === 0 && classAssignments.length > 0 ? (
                             <div className="flex items-center gap-3 text-sm bg-emerald-500/20 p-3 rounded-lg border border-emerald-500/30">
                                <CheckCircle size={18} className="text-emerald-200 flex-shrink-0" />
                                <span className="leading-snug">Luar biasa! Semua tugas telah Anda selesaikan.</span>
                            </div>
                        ) : totalPending === 0 ? (
                            <div className="flex items-center gap-3 text-sm bg-blue-500/20 p-3 rounded-lg border border-blue-500/30">
                                <CheckCircle size={18} className="text-blue-200 flex-shrink-0" />
                                <span className="leading-snug">Belum ada tugas aktif untuk kelas Anda.</span>
                            </div>
                        ) : (
                             <div className="flex items-center gap-3 text-sm bg-blue-500/20 p-3 rounded-lg border border-blue-500/30">
                                <Activity size={18} className="text-blue-200 flex-shrink-0" />
                                <span className="leading-snug">Anda memiliki {totalPending} tugas dalam daftar tunggu.</span>
                            </div>
                        )
                    ) : (
                        <div className="flex items-center gap-3 text-sm bg-blue-500/20 p-3 rounded-lg border border-blue-500/30">
                            <Activity size={18} className="text-blue-200 flex-shrink-0" />
                            <span className="leading-snug">Anda dalam mode Spectator. Login untuk melihat progres tugas pribadi.</span>
                        </div>
                    )}
                </div>
            </div>
          </div>

        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickCard 
          to="/absensi" 
          title="Absensi" 
          desc="Rekap kehadiran siswa realtime."
          icon={<Activity size={24} />}
          color="text-green-500"
          bg="bg-green-100 dark:bg-green-900/20"
        />
        <QuickCard 
          to="/jadwal" 
          title="Jadwal Pelajaran" 
          desc="Cek mata pelajaran hari ini."
          icon={<Calendar size={24} />}
          color="text-purple-500"
          bg="bg-purple-100 dark:bg-purple-900/20"
        />
        <QuickCard 
          to="/tugas" 
          title="Daftar Tugas" 
          desc={user ? `${totalPending} tugas belum selesai.` : `${totalPending} tugas aktif terdaftar.`}
          icon={<BookOpen size={24} />}
          color="text-orange-500"
          bg="bg-orange-100 dark:bg-orange-900/20"
          badge={user && urgentTasks > 0 ? urgentTasks : undefined}
        />
        <QuickCard 
          to="/kelompok" 
          title="Generator" 
          desc="Buat kelompok belajar instan."
          icon={<Users size={24} />}
          color="text-pink-500"
          bg="bg-pink-100 dark:bg-pink-900/20"
        />
      </div>

      {/* Today's Summary Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
         <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <Calendar size={20} />
                </div>
                Ringkasan Hari Ini
            </h3>
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 capitalize">
                {dateString}
            </span>
         </div>
         
         <div className="p-6">
            {!user ? (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400 animate-pulse">
                        <Users size={36} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Mode Spectator</h4>
                    <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-8 text-base">
                        Silakan login sebagai Siswa untuk melihat jadwal pelajaran, tugas harian, dan status absensi Anda secara personal.
                    </p>
                    <Link to="/login" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all hover:scale-105 shadow-lg">
                        <LogIn size={20} /> Login Siswa
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Schedule Column */}
                    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 text-sm uppercase tracking-wide">
                                <Clock size={16} className="text-blue-500"/> Jadwal Pelajaran
                            </h4>
                            <Link to="/jadwal" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                Selengkapnya <ArrowRight size={12}/>
                            </Link>
                        </div>
                        
                        <div className="flex-1">
                            {todaySchedule && todaySchedule.lessons.length > 0 ? (
                                <div className="space-y-2">
                                    {todaySchedule.lessons.map((lesson, idx) => (
                                        lesson.subject !== 'ISTIRAHAT' && (
                                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-white dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg shrink-0">
                                                    {getSubjectIcon(lesson.subject)}
                                                </div>
                                                <div className="min-w-0 flex-1 flex justify-between items-center gap-4">
                                                    <p className="font-bold text-slate-800 dark:text-white truncate">{lesson.subject}</p>
                                                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">{lesson.time}</span>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                    {todaySchedule.lessons.every(l => l.subject === 'ISTIRAHAT') && (
                                        <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-10">
                                            <Coffee size={32} className="mb-2 opacity-50"/>
                                            <p className="font-medium">Tidak ada pelajaran hari ini.</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-10 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                                    <Calendar size={32} className="mb-2 opacity-50" />
                                    <p className="font-medium">Tidak ada jadwal.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Status Column */}
                    <div className="flex flex-col gap-5 h-full">
                        {/* Attendance Status */}
                        <div className="flex-1 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800 p-5 flex flex-col">
                            <h4 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 text-sm uppercase tracking-wide mb-3">
                                <Activity size={16} className="text-green-500"/> Status Absensi
                            </h4>
                            <div className={`flex-1 flex items-center gap-5 p-4 rounded-xl border shadow-sm ${hasAbsenced ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'}`}>
                                <div className={`p-4 rounded-full shrink-0 ${hasAbsenced ? 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200' : 'bg-orange-100 text-orange-600 dark:bg-orange-800 dark:text-orange-200'}`}>
                                    {hasAbsenced ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
                                </div>
                                <div>
                                    <h5 className={`font-bold text-xl mb-1 ${hasAbsenced ? 'text-green-800 dark:text-green-300' : 'text-orange-800 dark:text-orange-300'}`}>
                                        {hasAbsenced ? 'Sudah Absen' : 'Belum Absen'}
                                    </h5>
                                    <p className={`text-sm font-medium ${hasAbsenced ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                                        {hasAbsenced ? `Status tercatat: ${myStatus}` : 'Segera isi kehadiran Anda hari ini.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Assignments Due Today */}
                        <div className="flex-1 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800 p-5 flex flex-col">
                             <h4 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 text-sm uppercase tracking-wide mb-3">
                                <AlertTriangle size={16} className="text-red-500"/> Tenggat Hari Ini
                            </h4>
                            <div className="flex-1">
                                {tasksDueToday.length > 0 ? (
                                    <div className="space-y-2 h-full overflow-y-auto custom-scrollbar max-h-[140px]">
                                        {tasksDueToday.map(task => (
                                            <div key={task.id} className="bg-white dark:bg-slate-800 border-l-4 border-l-red-500 border-y border-r border-slate-200 dark:border-slate-700 p-3 rounded-r-lg flex items-center justify-between gap-3 shadow-sm">
                                                <div className="min-w-0">
                                                    <h5 className="font-bold text-slate-800 dark:text-white text-sm truncate">{task.title}</h5>
                                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                                        {task.subject}
                                                    </span>
                                                </div>
                                                <span className="shrink-0 text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 px-2 py-1 rounded">
                                                    Hari Ini
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center gap-3 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-center p-4">
                                        <CheckCircle size={24} className="text-emerald-500 flex-shrink-0" />
                                        <span className="text-sm font-medium">
                                            {classAssignments.length > 0 && totalPending === 0 
                                                ? "Semua tugas hari ini beres!" 
                                                : "Tidak ada tenggat waktu hari ini."}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
         </div>
      </div>

      {/* Info Section - Status Info Only */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-blue-500" /> Status Sistem
            </h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-slate-600 dark:text-slate-400">Total Kelas Terdaftar</span>
                    <span className="font-bold text-slate-900 dark:text-white">{CLASSES.length} Kelas</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-slate-600 dark:text-slate-400">Semester Aktif</span>
                    <span className="font-bold text-slate-900 dark:text-white">Ganjil 2025/2026</span>
                </div>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Akses Guru / Admin</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm px-6">
                Kelola tugas, jadwal, dan data kelas melalui panel admin yang aman.
            </p>
            <Link to="/admin" className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white py-3 rounded-xl font-medium transition-colors">
                Masuk ke Panel Admin
            </Link>
        </div>
      </div>
    </div>
  );
};

const QuickCard = ({ to, title, desc, icon, color, bg, badge }: any) => (
    <Link to={to} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative">
        {badge && (
            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce shadow-sm">
                {badge} Segera
            </div>
        )}
        <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
    </Link>
);

export default Home;
