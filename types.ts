
export enum AttendanceStatus {
  HADIR = 'Hadir',
  SAKIT = 'Sakit',
  IZIN = 'Izin',
  DISPENSASI = 'Dispensasi',
  ALPA = 'Alpa',
  UNSET = 'Belum Absen'
}

export interface Student {
  id: string; // This will now be the NIS
  nis: string;
  nisn: string;
  name: string;
  gender: 'L' | 'P';
  religion: string;
  classId: string; // e.g., "11 P 01"
}

export type UserRole = 'student' | 'admin';

export interface User {
    id: string;
    name: string;
    role: UserRole;
    classId: string; // For students: their class. For admins: the class they manage.
}

export interface AttendanceRecord {
  studentId: string;
  status: AttendanceStatus;
  date: string; // ISO date string YYYY-MM-DD
}

export type AssignmentCategory = 'Tugas' | 'PR' | 'Kuis' | 'Proyek' | 'Ulangan';

export interface Assignment {
  id: string;
  classId: string;
  subject: string;
  title: string;
  deadline: string;
  note: string;
  category: AssignmentCategory;
}

export interface ClassScheduleItem {
  time: string;
  subject: string;
  code?: string; // The short code e.g. "BIND"
  teacher?: string;
}

export interface DailySchedule {
  day: string;
  lessons: ClassScheduleItem[];
}

export type ScheduleMap = Record<string, DailySchedule[]>;

export type ThemeMode = 'light' | 'dark';
