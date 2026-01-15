
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { FinanceRecord } from '../types';

interface FinanceViewProps {
  data: FinanceRecord[];
}

const FinanceView: React.FC<FinanceViewProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6">Financial Overview (₦)</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend verticalAlign="top" height={36}/>
              <Line type="monotone" dataKey="totalIncome" name="Total Income" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="totalExpenses" name="Total Expenses" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="netPosition" name="Net Position" stroke="#4f46e5" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Financial Ledger</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold tracking-wider">
              <tr>
                <th className="px-4 py-4">Date</th>
                <th className="px-4 py-4 text-green-700">Tithes</th>
                <th className="px-4 py-4 text-green-700">Offerings</th>
                <th className="px-4 py-4 text-green-700">Seeds</th>
                <th className="px-4 py-4 font-bold text-green-800">Total Income</th>
                <th className="px-4 py-4 text-rose-700">Welfare</th>
                <th className="px-4 py-4 text-rose-700">Utility</th>
                <th className="px-4 py-4 text-rose-700">Program</th>
                <th className="px-4 py-4 font-bold text-rose-800">Total Exp.</th>
                <th className="px-4 py-4">Net</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...data].reverse().map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-4 font-medium">{record.date}</td>
                  <td className="px-4 py-4">₦{record.tithes.toLocaleString()}</td>
                  <td className="px-4 py-4">₦{record.offerings.toLocaleString()}</td>
                  <td className="px-4 py-4">₦{record.specialSeed.toLocaleString()}</td>
                  <td className="px-4 py-4 font-bold text-green-600">₦{record.totalIncome.toLocaleString()}</td>
                  <td className="px-4 py-4">₦{record.welfare.toLocaleString()}</td>
                  <td className="px-4 py-4">₦{record.utility.toLocaleString()}</td>
                  <td className="px-4 py-4">₦{record.program.toLocaleString()}</td>
                  <td className="px-4 py-4 font-bold text-rose-600">₦{record.totalExpenses.toLocaleString()}</td>
                  <td className={`px-4 py-4 font-bold ${record.netPosition >= 0 ? 'text-indigo-600' : 'text-rose-600'}`}>
                    ₦{record.netPosition.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinanceView;
