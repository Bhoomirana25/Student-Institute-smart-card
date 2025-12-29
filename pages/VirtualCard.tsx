
import React, { useState } from 'react';
import { Student } from '../types';

const VirtualCard: React.FC<{ student: Student }> = ({ student }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[80vh] animate-fadeIn">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Unified Smart ID</h2>
        <p className="text-gray-500">Tap to switch between Profile and Scan-Gate</p>
      </div>

      <div 
        className="relative w-full max-w-md h-64 md:h-72 cursor-pointer perspective"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
          style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* Front of Card */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl p-6 text-white shadow-2xl overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-70">Student Smart ID</p>
                <h3 className="font-bold text-lg leading-tight max-w-[200px]">{student.college}</h3>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                 <div className="w-6 h-6 border-2 border-white rounded-full"></div>
              </div>
            </div>

            <div className="flex space-x-6">
              <div className="w-24 h-24 bg-white/10 rounded-xl overflow-hidden border-2 border-white/20 backdrop-blur-sm">
                <img src={student.imageUrl} alt="Student" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <p className="text-xs text-blue-200 uppercase font-medium">Student Name</p>
                  <p className="text-lg font-bold leading-tight">{student.name}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-200 uppercase font-medium">Roll No</p>
                  <p className="font-mono text-lg font-bold">{student.rollNo}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-end">
              <div>
                <p className="text-[10px] text-blue-200 uppercase">Major</p>
                <p className="text-xs font-semibold">{student.course}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-blue-200 uppercase">Valid Thru</p>
                <p className="text-xs font-semibold">JUN 2028</p>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
          </div>

          {/* Back of Card: QR Focus */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl p-6 text-gray-800 shadow-2xl border-2 border-gray-100 flex flex-col items-center justify-center rotate-y-180" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
             <div className="w-full h-6 bg-gray-900 rounded-sm mb-4"></div>
             
             <div className="flex flex-col items-center bg-gray-50 p-4 rounded-2xl w-full border border-gray-100">
                <p className="text-[10px] text-gray-400 mb-2 uppercase font-extrabold tracking-widest">Unified Access QR</p>
                
                {/* SVG QR Code Placeholder */}
                <div className="bg-white p-3 rounded-xl shadow-inner mb-3">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" fill="white"/>
                    <rect x="10" y="10" width="30" height="30" stroke="black" strokeWidth="4"/>
                    <rect x="17.5" y="17.5" width="15" height="15" fill="black"/>
                    <rect x="60" y="10" width="30" height="30" stroke="black" strokeWidth="4"/>
                    <rect x="67.5" y="17.5" width="15" height="15" fill="black"/>
                    <rect x="10" y="60" width="30" height="30" stroke="black" strokeWidth="4"/>
                    <rect x="17.5" y="67.5" width="15" height="15" fill="black"/>
                    <rect x="50" y="50" width="10" height="10" fill="black"/>
                    <rect x="70" y="70" width="20" height="20" fill="black"/>
                    <rect x="50" y="80" width="10" height="10" fill="black"/>
                    <rect x="80" y="50" width="10" height="10" fill="black"/>
                  </svg>
                </div>
                
                <p className="text-[8px] font-mono text-gray-400 mb-3 tracking-widest">{student.id}</p>
                
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="bg-blue-50 py-1 px-2 rounded-lg text-center">
                    <p className="text-[8px] text-blue-700 font-bold uppercase">Payments</p>
                  </div>
                  <div className="bg-green-50 py-1 px-2 rounded-lg text-center">
                    <p className="text-[8px] text-green-700 font-bold uppercase">Verify Docs</p>
                  </div>
                </div>
             </div>
             
             <p className="text-[9px] mt-4 text-center text-gray-400 leading-tight">
               Scan this code to verify academic records or initiate a secure peer-to-peer payment.
             </p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
         <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            <span>Save to Wallet</span>
         </button>
         <button className="flex items-center justify-center space-x-2 bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-2xl font-bold shadow-sm hover:bg-gray-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/></svg>
            <span>Generate New QR</span>
         </button>
      </div>
    </div>
  );
};

export default VirtualCard;
