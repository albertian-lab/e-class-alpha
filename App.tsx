
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Home from './pages/Home';
import Attendance from './pages/Attendance';
import Schedule from './pages/Schedule';
import Assignments from './pages/Assignments';
import AssignmentDetail from './pages/AssignmentDetail';
import GroupGenerator from './pages/GroupGenerator';
import Admin from './pages/Admin';
import Login from './pages/Login';

// Protected Route Component for Admin Only
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useApp();
    const location = useLocation();

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

const AppContent: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen relative flex flex-col">
                <Background />
                <Navbar />
                <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        
                        {/* Public / Spectator Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/absensi" element={<Attendance />} />
                        <Route path="/jadwal" element={<Schedule />} />
                        <Route path="/tugas" element={<Assignments />} />
                        <Route path="/tugas/:id" element={<AssignmentDetail />} />
                        <Route path="/kelompok" element={<GroupGenerator />} />
                        
                        {/* Protected Admin Route */}
                        <Route path="/admin" element={
                            <AdminRoute><Admin /></AdminRoute>
                        } />
                        
                        {/* Fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
                <footer className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur text-center py-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
                    <p>© {new Date().getFullYear()} E-Class Pro. Platform Manajemen Kelas.</p>
                </footer>
            </div>
        </Router>
    );
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
};

export default App;
