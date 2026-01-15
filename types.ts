
export interface AttendanceRecord {
  id: string;
  date: string;
  dayOfWeek: string;
  men: number;
  women: number;
  children: number;
  total: number;
}

export interface FinanceRecord {
  id: string;
  date: string;
  // Income
  tithes: number;
  offerings: number;
  specialSeed: number;
  totalIncome: number;
  // Expenses
  welfare: number;
  utility: number;
  program: number;
  totalExpenses: number;
  // Summary
  netPosition: number;
}

export interface AIInsight {
  title: string;
  description: string;
  type: 'growth' | 'finance' | 'warning';
  priority: 'high' | 'medium' | 'low';
}

export type ViewType = 'dashboard' | 'attendance' | 'finance' | 'data-entry' | 'ai-advisor';
