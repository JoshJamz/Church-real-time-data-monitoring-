
import React from 'react';
import { AIInsight, AttendanceRecord, FinanceRecord } from '../types';

interface AIAdvisorViewProps {
  attendance: AttendanceRecord[];
  finance: FinanceRecord[];
  insights: AIInsight[];
  onRefresh: () => void;
  isLoading: boolean;
}

const AIAdvisorView: React.FC<AIAdvisorViewProps> = ({ attendance, finance, insights, onRefresh, isLoading }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 text-indigo-600 text-9xl">✨</div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Growth & Finance Advisor</h2>
          <p className="text-slate-600 mb-6 max-w-2xl leading-relaxed">
            Our AI analysis engine processes your attendance patterns and financial health to provide
            strategic recommendations for church growth and sustainability.
          </p>
          <button 
            onClick={onRefresh}
            disabled={isLoading}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Processing Data...' : 'Generate New Strategic Report'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">📈</span>
            Growth Opportunities
          </h3>
          {insights.filter(i => i.type === 'growth').map((insight, idx) => (
            <InsightCard key={idx} insight={insight} />
          ))}
          {insights.filter(i => i.type === 'growth').length === 0 && !isLoading && (
            <div className="p-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-slate-400">
              No specific growth insights yet. Click refresh to analyze.
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">⚖️</span>
            Financial Stewardship
          </h3>
          {insights.filter(i => i.type === 'finance' || i.type === 'warning').map((insight, idx) => (
            <InsightCard key={idx} insight={insight} />
          ))}
          {insights.filter(i => i.type === 'finance' || i.type === 'warning').length === 0 && !isLoading && (
            <div className="p-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-slate-400">
              No financial insights yet. Click refresh to analyze.
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-slate-900 rounded-3xl p-12 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Need a Custom Report?</h3>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
          Ask our AI specific questions about your ministry data, such as "Why did attendance drop in February?" or "How can we increase building fund giving?"
        </p>
        <div className="flex max-w-md mx-auto">
          <input 
            type="text" 
            placeholder="Ask your digital ministry coach..."
            className="flex-1 bg-slate-800 border-none rounded-l-xl px-6 py-4 focus:ring-0 outline-none"
          />
          <button className="bg-indigo-600 px-6 py-4 rounded-r-xl font-bold hover:bg-indigo-700 transition-colors">
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

const InsightCard: React.FC<{ insight: AIInsight }> = ({ insight }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-2 mb-4">
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
        insight.type === 'growth' ? 'bg-green-100 text-green-700' :
        insight.type === 'finance' ? 'bg-indigo-100 text-indigo-700' :
        'bg-rose-100 text-rose-700'
      }`}>
        {insight.type}
      </span>
      {insight.priority === 'high' && (
        <span className="bg-rose-100 text-rose-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase animate-pulse">
          High Priority
        </span>
      )}
    </div>
    <h4 className="text-lg font-bold text-slate-800 mb-2">{insight.title}</h4>
    <p className="text-sm text-slate-600 leading-relaxed mb-4">{insight.description}</p>
    <button className="text-indigo-600 text-xs font-bold hover:underline">View Suggested Action Plan →</button>
  </div>
);

export default AIAdvisorView;
