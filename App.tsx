
import React, { useState, useEffect } from 'react';
import { AppRoute, Student, Transaction, Document } from './types';
import { Icons } from './constants';
import Dashboard from './pages/Dashboard';
import VirtualCard from './pages/VirtualCard';
import Wallet from './pages/Wallet';
import Vault from './pages/Vault';
import Assistant from './pages/Assistant';
import TechDocs from './pages/TechDocs';

const App: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<AppRoute>(AppRoute.DASHBOARD);
  const [student, setStudent] = useState<Student>({
    id: 'STU-2024-001',
    name: 'Anita',
    course: 'BE Computer Engineering',
    batch: '2021-2025',
    college: 'Shri Swaminarayan Institute of Technology',
    balance: 1250.50,
    rollNo: 'CE-107054',
    imageUrl: 'https://picsum.photos/200/200?random=1'
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 't1', title: 'Main Canteen Lunch', amount: 85, date: '2024-05-12', type: 'debit', category: 'Canteen' },
    { id: 't2', title: 'Semester Lab Fee', amount: 500, date: '2024-05-10', type: 'debit', category: 'Fees' },
    { id: 't3', title: 'Wallet Topup (GPay)', amount: 1000, date: '2024-05-09', type: 'credit', category: 'Other' },
    { id: 't4', title: 'Library Late Return', amount: 20, date: '2024-05-05', type: 'debit', category: 'Library' },
  ]);

  const [documents, setDocuments] = useState<Document[]>([
    { id: 'd1', name: 'Semester 4 Marksheet', type: 'Academic', date: '2024-02-15', status: 'Verified' },
    { id: 'd2', name: 'Address Proof', type: 'Identity', date: '2024-01-10', status: 'Verified' },
  ]);

  const handlePayment = (amount: number, title: string, category: Transaction['category']) => {
    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      title,
      amount,
      date: new Date().toISOString().split('T')[0],
      type: 'debit',
      category
    };
    setTransactions([newTransaction, ...transactions]);
    setStudent({ ...student, balance: student.balance - amount });
  };

  const handleTopup = (amount: number) => {
    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      title: 'Wallet Topup (GPay)',
      amount,
      date: new Date().toISOString().split('T')[0],
      type: 'credit',
      category: 'Other'
    };
    setTransactions([newTransaction, ...transactions]);
    setStudent({ ...student, balance: student.balance + amount });
  };

  const renderContent = () => {
    switch (activeRoute) {
      case AppRoute.DASHBOARD: return <Dashboard student={student} transactions={transactions} onNavigate={setActiveRoute} />;
      case AppRoute.CARD: return <VirtualCard student={student} />;
      case AppRoute.WALLET: return <Wallet balance={student.balance} transactions={transactions} onPayment={handlePayment} onTopup={handleTopup} />;
      case AppRoute.VAULT: return <Vault documents={documents} setDocuments={setDocuments} />;
      case AppRoute.AI_ASSISTANT: return <Assistant student={student} />;
      case AppRoute.TECH_DOCS: return <TechDocs />;
      default: return <Dashboard student={student} transactions={transactions} onNavigate={setActiveRoute} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-800 tracking-tight">EduSmart</h1>
          <p className="text-xs text-gray-400 font-medium">NEXT-GEN CAMPUS WALLET</p>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <NavItem active={activeRoute === AppRoute.DASHBOARD} onClick={() => setActiveRoute(AppRoute.DASHBOARD)} icon={<Icons.Dashboard />} label="Dashboard" />
          <NavItem active={activeRoute === AppRoute.CARD} onClick={() => setActiveRoute(AppRoute.CARD)} icon={<Icons.Card />} label="Virtual ID Card" />
          <NavItem active={activeRoute === AppRoute.WALLET} onClick={() => setActiveRoute(AppRoute.WALLET)} icon={<Icons.Wallet />} label="Payments & Wallet" />
          <NavItem active={activeRoute === AppRoute.VAULT} onClick={() => setActiveRoute(AppRoute.VAULT)} icon={<Icons.Vault />} label="Document Vault" />
          <NavItem active={activeRoute === AppRoute.AI_ASSISTANT} onClick={() => setActiveRoute(AppRoute.AI_ASSISTANT)} icon={<Icons.AI />} label="AI Campus Guide" />
          <NavItem active={activeRoute === AppRoute.TECH_DOCS} onClick={() => setActiveRoute(AppRoute.TECH_DOCS)} icon={<Icons.Docs />} label="Technical Docs" />
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
            <img src={student.imageUrl} alt="Profile" className="w-8 h-8 rounded-full" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-gray-700 truncate">{student.name}</p>
              <p className="text-xs text-gray-500 truncate">{student.rollNo}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        {renderContent()}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-3 z-50">
        <MobileNavItem active={activeRoute === AppRoute.DASHBOARD} onClick={() => setActiveRoute(AppRoute.DASHBOARD)} icon={<Icons.Dashboard />} />
        <MobileNavItem active={activeRoute === AppRoute.CARD} onClick={() => setActiveRoute(AppRoute.CARD)} icon={<Icons.Card />} />
        <MobileNavItem active={activeRoute === AppRoute.WALLET} onClick={() => setActiveRoute(AppRoute.WALLET)} icon={<Icons.Wallet />} />
        <MobileNavItem active={activeRoute === AppRoute.VAULT} onClick={() => setActiveRoute(AppRoute.VAULT)} icon={<Icons.Vault />} />
        <MobileNavItem active={activeRoute === AppRoute.AI_ASSISTANT} onClick={() => setActiveRoute(AppRoute.AI_ASSISTANT)} icon={<Icons.AI />} />
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactNode, label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    <span className={active ? 'text-blue-600' : 'text-gray-400'}>{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const MobileNavItem: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactNode }> = ({ active, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full transition-colors ${active ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}
  >
    {icon}
  </button>
);

export default App;
