
import React, { useState } from 'react';
import { AttendanceRecord, FinanceRecord } from '../types';

interface DataEntryViewProps {
  attendance: AttendanceRecord[];
  setAttendance: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
  finance: FinanceRecord[];
  setFinance: React.Dispatch<React.SetStateAction<FinanceRecord[]>>;
}

const DataEntryView: React.FC<DataEntryViewProps> = ({ attendance, setAttendance, finance, setFinance }) => {
  const [activeTab, setActiveTab] = useState<'attendance' | 'finance'>('attendance');
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getDayOfWeek = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const handleAttendanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const men = parseInt(formData.men || 0);
    const women = parseInt(formData.women || 0);
    const children = parseInt(formData.children || 0);
    const date = formData.date || new Date().toISOString().split('T')[0];
    
    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      date,
      dayOfWeek: getDayOfWeek(date),
      men,
      women,
      children,
      total: men + women + children
    };
    
    setAttendance([...attendance, newRecord]);
    setFormData({});
  };

  const handleFinanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tithes = parseFloat(formData.tithes || 0);
    const offerings = parseFloat(formData.offerings || 0);
    const specialSeed = parseFloat(formData.specialSeed || 0);
    
    const welfare = parseFloat(formData.welfare || 0);
    const utility = parseFloat(formData.utility || 0);
    const program = parseFloat(formData.program || 0);

    const totalIncome = tithes + offerings + specialSeed;
    const totalExpenses = welfare + utility + program;

    const newRecord: FinanceRecord = {
      id: Date.now().toString(),
      date: formData.date || new Date().toISOString().split('T')[0],
      tithes,
      offerings,
      specialSeed,
      totalIncome,
      welfare,
      utility,
      program,
      totalExpenses,
      netPosition: totalIncome - totalExpenses
    };

    setFinance([...finance, newRecord]);
    setFormData({});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex">
        <button 
          onClick={() => setActiveTab('attendance')}
          className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all ${activeTab === 'attendance' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          Attendance Entry
        </button>
        <button 
          onClick={() => setActiveTab('finance')}
          className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all ${activeTab === 'finance' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          Finance Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6">
            {activeTab === 'attendance' ? '👥 New Attendance' : '💰 New Finance'}
          </h3>
          
          <form onSubmit={activeTab === 'attendance' ? handleAttendanceSubmit : handleFinanceSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
              <input 
                type="date" 
                name="date"
                required
                onChange={handleInputChange}
                value={formData.date || ''}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" 
              />
            </div>

            {activeTab === 'attendance' ? (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Men</label>
                  <input type="number" name="men" onChange={handleInputChange} value={formData.men || ''} placeholder="0" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Women</label>
                  <input type="number" name="women" onChange={handleInputChange} value={formData.women || ''} placeholder="0" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Children</label>
                  <input type="number" name="children" onChange={handleInputChange} value={formData.children || ''} placeholder="0" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tithes (₦)</label>
                    <input type="number" name="tithes" onChange={handleInputChange} value={formData.tithes || ''} placeholder="0" className="w-full px-2 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Offerings (₦)</label>
                    <input type="number" name="offerings" onChange={handleInputChange} value={formData.offerings || ''} placeholder="0" className="w-full px-2 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Seeds (₦)</label>
                    <input type="number" name="specialSeed" onChange={handleInputChange} value={formData.specialSeed || ''} placeholder="0" className="w-full px-2 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                </div>
                <hr />
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Welfare (₦)</label>
                    <input type="number" name="welfare" onChange={handleInputChange} value={formData.welfare || ''} placeholder="0" className="w-full px-2 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Utility (₦)</label>
                    <input type="number" name="utility" onChange={handleInputChange} value={formData.utility || ''} placeholder="0" className="w-full px-2 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Program (₦)</label>
                    <input type="number" name="program" onChange={handleInputChange} value={formData.program || ''} placeholder="0" className="w-full px-2 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all">
              Save Entry
            </button>
          </form>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl text-white">
          <h3 className="text-xl font-bold mb-4">Excel Sync</h3>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Drag your weekly Excel sheet here to automatically populate all attendance and financial records.
          </p>
          <div className="border-2 border-dashed border-slate-700 rounded-xl p-12 flex flex-col items-center justify-center gap-4 hover:border-indigo-500 transition-colors cursor-pointer">
            <span className="text-4xl">📄</span>
            <span className="text-sm font-bold">Import XLSX / CSV</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataEntryView;
