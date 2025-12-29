
import React from 'react';
import { Student, Transaction, AppRoute } from '../types';
import { Icons } from '../constants';

interface DashboardProps {
  student: Student;
  transactions: Transaction[];
  onNavigate: (route: AppRoute) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ student, transactions, onNavigate }) => {
  return (
    <div className="p-6 space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome, {student.name.split(' ')[0]}!</h2>
          <p className="text-gray-500 font-medium">Everything's running smoothly at {student.college}.</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
           <div className="bg-green-100 p-3 rounded-xl">
             <Icons.Wallet />
           </div>
           <div>
             <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Wallet Balance</p>
             <p className="text-2xl font-bold text-gray-800">₹{student.balance.toFixed(2)}</p>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionCard label="View ID Card" icon={<Icons.Card />} onClick={() => onNavigate(AppRoute.CARD)} color="bg-blue-500" />
            <QuickActionCard label="Add Money" icon={<Icons.Wallet />} onClick={() => onNavigate(AppRoute.WALLET)} color="bg-green-500" />
            <QuickActionCard label="Upload Docs" icon={<Icons.Vault />} onClick={() => onNavigate(AppRoute.VAULT)} color="bg-amber-500" />
            <QuickActionCard label="Campus Bot" icon={<Icons.AI />} onClick={() => onNavigate(AppRoute.AI_ASSISTANT)} color="bg-purple-500" />
          </div>

          <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
              <button onClick={() => onNavigate(AppRoute.WALLET)} className="text-sm font-semibold text-blue-600 hover:text-blue-700">See All</button>
            </div>
            <div className="space-y-4">
              {transactions.slice(0, 4).map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${t.type === 'debit' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {t.category === 'Canteen' && '🍴'}
                      {t.category === 'Library' && '📚'}
                      {t.category === 'Fees' && '🎓'}
                      {t.category === 'Other' && '💰'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{t.title}</p>
                      <p className="text-xs text-gray-500">{t.date}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${t.type === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
                    {t.type === 'debit' ? '-' : '+'}₹{t.amount}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
           <section className="bg-blue-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="text-lg font-bold mb-1">Campus Status</h3>
               <p className="text-blue-100 text-sm mb-4">You are currently checked in.</p>
               <div className="space-y-3">
                 <div className="flex justify-between text-sm bg-blue-800/50 p-3 rounded-xl">
                   <span>Attendance</span>
                   <span className="font-bold">88%</span>
                 </div>
                 <div className="flex justify-between text-sm bg-blue-800/50 p-3 rounded-xl">
                   <span>Library Books</span>
                   <span className="font-bold">2 Issued</span>
                 </div>
               </div>
             </div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
           </section>

           <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
             <h3 className="text-lg font-bold text-gray-800 mb-4">Smart Suggestions</h3>
             <div className="space-y-4">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                   <p className="text-xs font-bold text-amber-800 mb-1 italic">AI ALERT</p>
                   <p className="text-xs text-amber-900">Semester exam fees are due by next Friday. You have sufficient balance.</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                   <p className="text-xs font-bold text-blue-800 mb-1 italic">CANTEEN INSIGHT</p>
                   <p className="text-xs text-blue-900">Your average lunch spend is ₹75. Try the new loyalty combo to save more!</p>
                </div>
             </div>
           </section>
        </div>
      </div>
    </div>
  );
};

const QuickActionCard: React.FC<{ label: string, icon: React.ReactNode, onClick: () => void, color: string }> = ({ label, icon, onClick, color }) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
    <div className={`p-3 rounded-xl ${color} text-white mb-2 transition-transform group-hover:scale-110`}>
      {icon}
    </div>
    <span className="text-xs font-bold text-gray-600 text-center">{label}</span>
  </button>
);

export default Dashboard;
