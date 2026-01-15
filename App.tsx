
import React, { useState, useEffect, useMemo } from 'react';
import { ViewType, AttendanceRecord, FinanceRecord, AIInsight } from './types';
import { INITIAL_ATTENDANCE_DATA, INITIAL_FINANCE_DATA } from './constants';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import AttendanceView from './components/AttendanceView';
import FinanceView from './components/FinanceView';
import DataEntryView from './components/DataEntryView';
import AIAdvisorView from './components/AIAdvisorView';
import { getGrowthInsights } from './geminiService';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('church_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE_DATA;
  });
  const [financeData, setFinanceData] = useState<FinanceRecord[]>(() => {
    const saved = localStorage.getItem('church_finance');
    return saved ? JSON.parse(saved) : INITIAL_FINANCE_DATA;
  });
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    localStorage.setItem('church_attendance', JSON.stringify(attendanceData));
    localStorage.setItem('church_finance', JSON.stringify(financeData));
  }, [attendanceData, financeData]);

  const refreshInsights = async () => {
    setLoadingInsights(true);
    const newInsights = await getGrowthInsights(attendanceData, financeData);
    setInsights(newInsights);
    setLoadingInsights(false);
  };

  useEffect(() => {
    refreshInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView attendance={attendanceData} finance={financeData} insights={insights} onRefresh={refreshInsights} isLoading={loadingInsights} />;
      case 'attendance':
        return <AttendanceView data={attendanceData} />;
      case 'finance':
        return <FinanceView data={financeData} />;
      case 'data-entry':
        return <DataEntryView 
          attendance={attendanceData} 
          setAttendance={setAttendanceData} 
          finance={financeData} 
          setFinance={setFinanceData} 
        />;
      case 'ai-advisor':
        return <AIAdvisorView attendance={attendanceData} finance={financeData} insights={insights} onRefresh={refreshInsights} isLoading={loadingInsights} />;
      default:
        return <DashboardView attendance={attendanceData} finance={financeData} insights={insights} onRefresh={refreshInsights} isLoading={loadingInsights} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 capitalize">
              {activeView.replace('-', ' ')}
            </h1>
            <p className="text-slate-500 text-sm">Welcome back to your Church Administration Hub</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
               Last Update: {new Date().toLocaleDateString()}
             </div>
          </div>
        </header>
        {renderView()}
      </main>
    </div>
  );
};

export default App;
