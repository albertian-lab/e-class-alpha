
import React from 'react';
import { Moon, Sun, Book, Bird, Flower, Star, Flame, BookHeart, Scale, HeartHandshake, Lightbulb, Calculator, Atom, FlaskConical, Dna, Monitor, Globe, TrendingUp, Users, Clock, Palette, Activity, Languages, BookOpen, Coffee } from 'lucide-react';

export const getDeadlineStatus = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Explicitly parse YYYY-MM-DD to avoid timezone shifts
    // new Date('2025-01-01') defaults to UTC, causing day shifts in local time
    const [year, month, day] = dateStr.split('-').map(Number);
    const deadline = new Date(year, month - 1, day); // Month is 0-indexed
    deadline.setHours(0, 0, 0, 0);
    
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    // Past Deadline
    if (diffDays < 0) return { 
        category: 'Terlambat',
        text: 'Terlambat', 
        badgeColor: 'text-red-700 dark:text-red-300', 
        badgeBg: 'bg-white/60 dark:bg-red-900/40', 
        cardBorder: 'border-red-200 dark:border-red-800/50',
        cardBg: 'bg-red-50/50 dark:bg-red-900/10'
    };

    // Today
    if (diffDays === 0) return {
        category: 'Segera',
        text: 'Hari Ini',
        badgeColor: 'text-orange-700 dark:text-orange-300',
        badgeBg: 'bg-white/60 dark:bg-orange-900/40',
        cardBorder: 'border-orange-200 dark:border-orange-800/50',
        cardBg: 'bg-orange-50/50 dark:bg-orange-900/10'
    };

    // Tomorrow
    if (diffDays === 1) return {
        category: 'Segera',
        text: 'Besok',
        badgeColor: 'text-orange-700 dark:text-orange-300',
        badgeBg: 'bg-white/60 dark:bg-orange-900/40',
        cardBorder: 'border-orange-200 dark:border-orange-800/50',
        cardBg: 'bg-orange-50/50 dark:bg-orange-900/10'
    };

    // Less than 3 days
    if (diffDays <= 3) return { 
        category: 'Segera',
        text: `${diffDays} Hari Lagi`, 
        badgeColor: 'text-orange-700 dark:text-orange-300', 
        badgeBg: 'bg-white/60 dark:bg-orange-900/40', 
        cardBorder: 'border-orange-200 dark:border-orange-800/50',
        cardBg: 'bg-orange-50/50 dark:bg-orange-900/10'
    };

    // Future
    return { 
        category: 'Akan Datang',
        text: `${diffDays} Hari lagi`, 
        badgeColor: 'text-emerald-700 dark:text-emerald-300', 
        badgeBg: 'bg-white/60 dark:bg-emerald-900/40', 
        cardBorder: 'border-emerald-200 dark:border-emerald-800/50',
        cardBg: 'bg-emerald-50/50 dark:bg-emerald-900/10'
    };
};

export const getCategoryColor = (category: string) => {
    switch (category) {
        case 'PR': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800';
        case 'Kuis': return 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 border-pink-200 dark:border-pink-800';
        case 'Proyek': return 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 border-teal-200 dark:border-teal-800';
        case 'Ulangan': return 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800';
        case 'Tugas': default: return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    }
};

export const getSubjectIcon = (subject: string) => {
    const s = subject.toLowerCase();

    if (s.includes('istirahat')) return <Coffee size={20} className="text-amber-600 dark:text-amber-500" />;

    if (s.includes('islam')) return <Moon size={20} className="text-yellow-500 dark:text-yellow-400" />;
    if (s.includes('kristen')) return <Book size={20} className="text-yellow-500 dark:text-yellow-400" />;
    if (s.includes('katolik')) return <Bird size={20} className="text-yellow-500 dark:text-yellow-400" />;
    if (s.includes('hindu')) return <Flower size={20} className="text-yellow-500 dark:text-yellow-400" />;
    if (s.includes('budha') || s.includes('buddha')) return <Sun size={20} className="text-yellow-500 dark:text-yellow-400" />;
    if (s.includes('yahudi')) return <Star size={20} className="text-yellow-500 dark:text-yellow-400" />;
    if (s.includes('konghucu')) return <Flame size={20} className="text-yellow-500 dark:text-yellow-400" />;
    
    if (s.includes('agama') || s.includes('pabp')) return <BookHeart size={20} className="text-yellow-500 dark:text-yellow-400" />;

    if (s.includes('pancasila') || s.includes('pkn')) return <Scale size={20} className="text-red-500 dark:text-red-400" />;

    if (s.includes('bk') || s.includes('bimbingan') || s.includes('konseling')) {
        return <HeartHandshake size={20} className="text-rose-500 dark:text-rose-400" />;
    }

    if (s.includes('pkwu') || s.includes('kewirausahaan') || s.includes('wirausaha')) {
        return <Lightbulb size={20} className="text-amber-500 dark:text-amber-400" />;
    }

    if (s.includes('matematika')) return <Calculator size={20} className="text-blue-500 dark:text-blue-400" />;
    if (s.includes('fisika')) return <Atom size={20} className="text-cyan-500 dark:text-cyan-400" />;
    if (s.includes('kimia')) return <FlaskConical size={20} className="text-purple-500 dark:text-purple-400" />;
    if (s.includes('biologi')) return <Dna size={20} className="text-emerald-500 dark:text-emerald-400" />;
    if (s.includes('informatika') || s.includes('info')) return <Monitor size={20} className="text-slate-500 dark:text-slate-400" />;
    
    if (s.includes('geografi')) return <Globe size={20} className="text-sky-500 dark:text-sky-400" />;
    if (s.includes('ekonomi')) return <TrendingUp size={20} className="text-green-500 dark:text-green-400" />;
    if (s.includes('sosiologi')) return <Users size={20} className="text-indigo-500 dark:text-indigo-400" />;
    if (s.includes('sejarah')) return <Clock size={20} className="text-amber-700 dark:text-amber-500" />;

    if (s.includes('seni') || s.includes('prakarya')) return <Palette size={20} className="text-pink-500 dark:text-pink-400" />;
    if (s.includes('pjok') || s.includes('penjas')) return <Activity size={20} className="text-orange-500 dark:text-orange-400" />;
    if (s.includes('bahasa') || s.includes('b.')) return <Languages size={20} className="text-teal-500 dark:text-teal-400" />;
    
    return <BookOpen size={20} className="text-slate-400" />;
};
