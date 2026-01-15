
import React from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'attendance', label: 'Attendance', icon: '👥' },
    { id: 'finance', label: 'Finance', icon: '💰' },
    { id: 'data-entry', label: 'Excel / Data Entry', icon: '📝' },
    { id: 'ai-advisor', label: 'AI Advisor', icon: '✨' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full hidden lg:flex">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl">
            ⛪
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">GrowthHub</span>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeView === item.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Current Project</p>
          <p className="text-sm font-bold text-slate-800 mb-1">Building Expansion</p>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mb-2">
            <div className="bg-green-500 h-1.5 rounded-full w-[65%]"></div>
          </div>
          <p className="text-[10px] text-slate-500">65% of $500,000 goal</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
