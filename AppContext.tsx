
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Assignment, AttendanceStatus, ThemeMode, User, UserRole } from '../types';
import { MOCK_ASSIGNMENTS } from '../constants';

interface AppContextType {
    theme: ThemeMode;
    toggleTheme: () => void;
    assignments: Assignment[];
    addAssignment: (assignment: Assignment) => void;
    deleteAssignment: (id: string) => void;
    updateAssignment: (id: string, updated: Partial<Assignment>) => void;
    
    // Persistence Logic
    getAttendance: (classId: string, date: string) => Record<string, AttendanceStatus>;
    saveAttendance: (classId: string, date: string, data: Record<string, AttendanceStatus>) => void;
    
    // Auth Logic
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    isAdminLoggedIn: boolean; // Computed helper
    adminClass: string | null; // Helper

    // Completion Logic (Global mapping: AssignmentID -> Array of UserIDs)
    getCompletedStudents: (assignmentId: string) => string[];
    toggleCompletion: (assignmentId: string) => void;
    isAssignmentCompleted: (assignmentId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Theme State
    const [theme, setTheme] = useState<ThemeMode>('dark'); 
    
    // Auth State
    const [user, setUser] = useState<User | null>(() => {
        try {
            const savedUser = localStorage.getItem('currentUser');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    // Assignment State
    const [assignments, setAssignments] = useState<Assignment[]>(() => {
        try {
            const savedAssignments = localStorage.getItem('assignments');
            return savedAssignments ? JSON.parse(savedAssignments) : MOCK_ASSIGNMENTS;
        } catch {
            return MOCK_ASSIGNMENTS;
        }
    });

    // Assignment Completion State: Record<AssignmentID, StudentID[]>
    const [assignmentCompletions, setAssignmentCompletions] = useState<Record<string, string[]>>(() => {
        try {
            const saved = localStorage.getItem('assignmentCompletions');
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });
    
    // Persistence Effects
    useEffect(() => {
        localStorage.setItem('assignments', JSON.stringify(assignments));
    }, [assignments]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('assignmentCompletions', JSON.stringify(assignmentCompletions));
    }, [assignmentCompletions]);

    // Theme Effect
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // Assignment Actions
    const addAssignment = (assignment: Assignment) => {
        setAssignments(prev => [...prev, assignment]);
    };

    const deleteAssignment = (id: string) => {
        setAssignments(prev => prev.filter(a => a.id !== id));
    };

    const updateAssignment = (id: string, updated: Partial<Assignment>) => {
        setAssignments(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
    };

    // Auth Actions
    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const isAdminLoggedIn = user?.role === 'admin';
    const adminClass = user?.role === 'admin' ? user.classId : null;

    // Completion Actions
    const toggleCompletion = (assignmentId: string) => {
        if (!user || user.role !== 'student') return;

        setAssignmentCompletions(prev => {
            const currentStudents = prev[assignmentId] || [];
            const isCompleted = currentStudents.includes(user.id);
            
            let newStudents;
            if (isCompleted) {
                newStudents = currentStudents.filter(id => id !== user.id);
            } else {
                newStudents = [...currentStudents, user.id];
            }

            return {
                ...prev,
                [assignmentId]: newStudents
            };
        });
    };

    const isAssignmentCompleted = (assignmentId: string) => {
        if (!user || user.role !== 'student') return false;
        const students = assignmentCompletions[assignmentId] || [];
        return students.includes(user.id);
    };

    const getCompletedStudents = (assignmentId: string) => {
        return assignmentCompletions[assignmentId] || [];
    };

    // Attendance Persistence
    const getAttendance = (classId: string, date: string): Record<string, AttendanceStatus> => {
        const key = `attendance-${classId}-${date}`;
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : {};
    };

    const saveAttendance = (classId: string, date: string, data: Record<string, AttendanceStatus>) => {
        const key = `attendance-${classId}-${date}`;
        localStorage.setItem(key, JSON.stringify(data));
    };

    return (
        <AppContext.Provider value={{ 
            theme, 
            toggleTheme, 
            assignments, 
            addAssignment, 
            deleteAssignment, 
            updateAssignment,
            getAttendance,
            saveAttendance,
            user,
            login,
            logout,
            isAdminLoggedIn,
            adminClass,
            toggleCompletion,
            isAssignmentCompleted,
            getCompletedStudents
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
