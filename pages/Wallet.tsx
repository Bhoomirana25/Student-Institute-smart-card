
import React, { useState } from 'react';
import { Transaction } from '../types';

interface WalletProps {
  balance: number;
  transactions: Transaction[];
  onPayment: (amount: number, title: string, category: Transaction['category']) => void;
  onTopup: (amount: number) => void;
}

const Wallet: React.FC<WalletProps> = ({ balance, transactions, onPayment, onTopup }) => {
  const [showPayModal, setShowPayModal] = useState(false);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [payTarget, setPayTarget] = useState<'Canteen' | 'Library' | 'Fees'>('Canteen');

  const handlePay = () => {
    const amt = parseFloat(amount);
    if (!isNaN(amt) && amt > 0) {
      onPayment(amt, `Campus ${payTarget} Payment`, payTarget);
      setAmount('');
      setShowPayModal(false);
    }
  };

  const handleAddMoney = () => {
    const amt = parseFloat(amount);
    if (!isNaN(amt) && amt > 0) {
      onTopup(amt);
      setAmount('');
      setShowTopupModal(false);
    }
  };

  return (
    <div className="p-6 space-y-8 animate-fadeIn max-w-4xl mx-auto">
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex justify-between items-start mb-10">
          <div>
            <p className="text-blue-100 text-sm font-semibold mb-1">Available Balance</p>
            <h2 className="text-4xl font-bold">₹{balance.toFixed(2)}</h2>
          </div>
          <div className="bg-white/20 p-3 rounded-full backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setShowTopupModal(true)}
            className="flex items-center justify-center space-x-2 bg-white text-blue-700 py-3 rounded-2xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            <span>Top Up</span>
          </button>
          <button 
            onClick={() => setShowPayModal(true)}
            className="flex items-center justify-center space-x-2 bg-blue-900/50 text-white border border-white/30 py-3 rounded-2xl font-bold hover:bg-blue-900/60 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <span>Scan & Pay</span>
          </button>
        </div>
      </header>

      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6">Transaction History</h3>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {transactions.map(t => (
              <div key={t.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${t.type === 'debit' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                    {t.category === 'Canteen' && '🍴'}
                    {t.category === 'Library' && '📚'}
                    {t.category === 'Fees' && '🎓'}
                    {t.category === 'Other' && '💰'}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{t.title}</p>
                    <p className="text-xs text-gray-400">{t.date} • {t.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${t.type === 'debit' ? 'text-gray-800' : 'text-green-600'}`}>
                    {t.type === 'debit' ? '-' : '+'}₹{t.amount.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-scaleIn">
            <h4 className="text-2xl font-bold text-gray-800 mb-2 text-center">Scan to Pay</h4>
            <p className="text-gray-500 text-center text-sm mb-6">Select campus service and enter amount</p>
            
            <div className="space-y-4">
               <div>
                 <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Service Type</label>
                 <div className="grid grid-cols-3 gap-2">
                    {['Canteen', 'Library', 'Fees'].map(item => (
                      <button 
                        key={item}
                        onClick={() => setPayTarget(item as any)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${payTarget === item ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                      >
                        {item}
                      </button>
                    ))}
                 </div>
               </div>
               <div>
                 <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Amount (₹)</label>
                 <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-2xl font-bold text-center focus:ring-2 focus:ring-blue-500 outline-none"
                 />
               </div>
               <button 
                onClick={handlePay}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-blue-700 transition-colors mt-4"
               >
                 Confirm Payment
               </button>
               <button 
                onClick={() => setShowPayModal(false)}
                className="w-full text-gray-400 font-semibold py-2 text-sm"
               >
                 Cancel
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Topup Modal (Simulated GPay) */}
      {showTopupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-scaleIn">
            <div className="flex flex-col items-center mb-6">
               <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
               </div>
               <h4 className="text-2xl font-bold text-gray-800">Add Funds</h4>
               <p className="text-gray-500 text-sm">Transfer via UPI or Net Banking</p>
            </div>
            
            <div className="space-y-4">
               <div>
                 <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Amount to Add</label>
                 <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="₹ 500"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-2xl font-bold text-center focus:ring-2 focus:ring-blue-500 outline-none"
                 />
               </div>
               <div className="grid grid-cols-2 gap-4 mt-6">
                 <button className="flex flex-col items-center justify-center p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png" className="h-6 object-contain mb-2" alt="GPay" />
                    <span className="text-xs font-semibold text-gray-500">Google Pay</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/512px-Paytm_Logo_%28standalone%29.svg.png" className="h-4 object-contain mb-2" alt="Paytm" />
                    <span className="text-xs font-semibold text-gray-500">Paytm / UPI</span>
                 </button>
               </div>
               <button 
                onClick={handleAddMoney}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-blue-700 transition-colors mt-4"
               >
                 Proceed to Pay
               </button>
               <button 
                onClick={() => setShowTopupModal(false)}
                className="w-full text-gray-400 font-semibold py-2 text-sm"
               >
                 Go Back
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
