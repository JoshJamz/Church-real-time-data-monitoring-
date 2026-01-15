
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { AttendanceRecord } from '../types';

interface AttendanceViewProps {
  data: AttendanceRecord[];
}

const AttendanceView: React.FC<AttendanceViewProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6">Demographic Breakdown</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: '#f8fafc' }} />
              <Legend verticalAlign="top" height={36}/>
              <Bar dataKey="men" name="Men" fill="#3b82f6" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="women" name="Women" fill="#ec4899" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="children" name="Children" fill="#10b981" radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Attendance Log</h3>
          <button className="text-xs font-bold text-indigo-600 border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-50">
            Export Records
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Day</th>
                <th className="px-6 py-4">Men</th>
                <th className="px-6 py-4">Women</th>
                <th className="px-6 py-4">Children</th>
                <th className="px-6 py-4 font-bold">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...data].reverse().map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">{record.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.dayOfWeek}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.men}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.women}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.children}</td>
                  <td className="px-6 py-4 text-sm font-bold text-indigo-600">{record.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceView;
