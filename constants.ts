
import { AttendanceRecord, FinanceRecord } from './types';

export const INITIAL_ATTENDANCE_DATA: AttendanceRecord[] = [
  { id: '1', date: '2024-01-07', dayOfWeek: 'Sunday', men: 55, women: 65, children: 45, total: 165 },
  { id: '2', date: '2024-01-14', dayOfWeek: 'Sunday', men: 60, women: 75, children: 50, total: 185 },
  { id: '3', date: '2024-01-21', dayOfWeek: 'Sunday', men: 58, women: 70, children: 55, total: 183 },
  { id: '4', date: '2024-01-28', dayOfWeek: 'Sunday', men: 70, women: 80, children: 60, total: 210 },
  { id: '5', date: '2024-02-04', dayOfWeek: 'Sunday', men: 72, women: 83, children: 65, total: 220 },
  { id: '6', date: '2024-02-11', dayOfWeek: 'Sunday', men: 75, women: 87, children: 70, total: 232 },
];

export const INITIAL_FINANCE_DATA: FinanceRecord[] = [
  { 
    id: '1', date: '2024-01-07', tithes: 250000, offerings: 45000, specialSeed: 120000, totalIncome: 415000,
    welfare: 50000, utility: 35000, program: 120000, totalExpenses: 205000, netPosition: 210000 
  },
  { 
    id: '2', date: '2024-01-14', tithes: 210000, offerings: 52000, specialSeed: 80000, totalIncome: 342000,
    welfare: 30000, utility: 42000, program: 15000, totalExpenses: 87000, netPosition: 255000 
  },
  { 
    id: '3', date: '2024-01-21', tithes: 320000, offerings: 38000, specialSeed: 50000, totalIncome: 408000,
    welfare: 45000, utility: 38000, program: 60000, totalExpenses: 143000, netPosition: 265000 
  },
  { 
    id: '4', date: '2024-01-28', tithes: 280000, offerings: 65000, specialSeed: 200000, totalIncome: 545000,
    welfare: 100000, utility: 45000, program: 80000, totalExpenses: 225000, netPosition: 320000 
  },
];
