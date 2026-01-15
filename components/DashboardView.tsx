
import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { AttendanceRecord, FinanceRecord, AIInsight } from '../types';

interface DashboardViewProps {
  attendance: AttendanceRecord[];
  finance: FinanceRecord[];
  insights: AIInsight[];
  onRefresh: () => void;
  isLoading: boolean;
}

const DashboardView: React.FC<DashboardViewProps> = ({ attendance, finance, insights, onRefresh, isLoading }) => {
  const latest = attendance[attendance.length - 1] || { total: 0, men: 0, women: 0, children: 0 };
  const previous = attendance[attendance.length - 2] || { total: 0 };
  
  const attendanceGrowth = previous.total === 0 ? 100 : Math.round(((latest.total - previous.total) / previous.total) * 100);

  const latestIncome = finance[finance.length - 1]?.totalIncome || 0;
  const previousIncome = finance[finance.length - 2]?.totalIncome || 0;
  const incomeGrowth = previousIncome === 0 ? 100 : Math.round(((latestIncome - previousIncome) / previousIncome) * 100);

  const totalTithes = finance.reduce((acc, curr) => acc + curr.tithes, 0);
  const totalOfferings = finance.reduce((acc, curr) => acc + curr.offerings, 0);
  const totalSeeds = finance.reduce((acc, curr) => acc + curr.specialSeed, 0);

  const incomePieData = [
    { name: 'Tithes', value: totalTithes },
    { name: 'Offerings', value: totalOfferings },
    { name: 'Seeds/Donations', value: totalSeeds },
  ];
  
  const attendancePieData = [
    { name: 'Men', value: latest.men },
    { name: 'Women', value: latest.women },
    { name: 'Children', value: latest.children },
  ];
  
  const COLORS = ['#4f46e5', '#10b981', '#f59e0b'];
  const ATTENDANCE_COLORS = ['#3b82f6', '#ec4899', '#10b981'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Attendance" 
          value={latest.total.toString()} 
          change={attendanceGrowth} 
          icon="👥" 
          color="indigo"
        />
        <KPICard 
          title="Recent Income" 
          value={`₦${latestIncome.toLocaleString()}`} 
          change={incomeGrowth} 
          icon="💰" 
          color="green"
        />
        <KPICard 
          title="Men vs Women" 
          value={`${latest.men} | ${latest.women}`} 
          change={5} 
          icon="🚻" 
          color="amber"
        />
        <KPICard 
          title="Net Position" 
          value={`₦${latestIncome - (finance[finance.length - 1]?.totalExpenses || 0)}`} 
          change={12} 
          icon="📈" 
          color="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Growth Trends (Men vs. Women)</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendance}>
                <defs>
                  <linearGradient id="colorMen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWomen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="men" name="Men" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorMen)" />
                <Area type="monotone" dataKey="women" name="Women" stroke="#ec4899" strokeWidth={2} fillOpacity={1} fill="url(#colorWomen)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Latest Service Mix</h3>
          <div className="h-[240px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendancePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendancePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={ATTENDANCE_COLORS[index % ATTENDANCE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-bold text-slate-800">{latest.total}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Total Souls</span>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            {attendancePieData.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ATTENDANCE_COLORS[idx] }}></div>
                  <span className="text-slate-600 truncate">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-800 text-xs">{item.value} ({latest.total > 0 ? Math.round((item.value/latest.total)*100) : 0}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800">AI Growth Advisor</h3>
            <span className="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Gemini Pro</span>
          </div>
          <button 
            onClick={onRefresh}
            disabled={isLoading}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            {isLoading ? 'Analyzing...' : 'Refresh Insights'} 🔄
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.length > 0 ? insights.map((insight, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  insight.type === 'growth' ? 'bg-green-100 text-green-700' :
                  insight.type === 'finance' ? 'bg-indigo-100 text-indigo-700' :
                  'bg-rose-100 text-rose-700'
                }`}>
                  {insight.type}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  insight.priority === 'high' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {insight.priority} Priority
                </span>
              </div>
              <h4 className="font-bold text-slate-800 mb-1 text-sm">{insight.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{insight.description}</p>
            </div>
          )) : (
            <div className="col-span-3 py-8 text-center">
              <p className="text-slate-400 text-sm">No insights generated yet. Click refresh to analyze your data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, icon, color }) => {
  const isPositive = change >= 0;
  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-50 text-indigo-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${colorMap[color]}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-50 text-green-600' : 'bg-rose-50 text-rose-600'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}%
        </div>
      </div>
      <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{title}</h3>
      <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
  );
};

export default DashboardView;
