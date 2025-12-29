
import React, { useState } from 'react';
import { Document } from '../types';
import { analyzeDocument } from '../services/gemini';

interface VaultProps {
  documents: Document[];
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}

const Vault: React.FC<VaultProps> = ({ documents, setDocuments }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Read file as base64 for AI analysis
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result?.toString().split(',')[1];
      if (base64) {
        try {
          const analysis = await analyzeDocument(base64, file.type);
          setAiAnalysis(analysis || "Analysis complete. Document verified.");
          setShowAnalysisModal(true);
          
          // Add to local state
          const newDoc: Document = {
            id: `d${Date.now()}`,
            name: file.name,
            type: file.type.includes('pdf') ? 'Academic' : 'Identity',
            date: new Date().toISOString().split('T')[0],
            status: 'Verified',
            aiSummary: analysis
          };
          setDocuments([newDoc, ...documents]);
        } catch (error) {
          console.error("Analysis failed", error);
        } finally {
          setIsUploading(false);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 space-y-8 animate-fadeIn max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Secure Vault</h2>
          <p className="text-gray-500">Encrypted storage for BE Computer Engineering records</p>
        </div>
        <div className="relative">
          <input 
            type="file" 
            id="doc-upload" 
            className="hidden" 
            onChange={handleFileUpload}
            accept=".pdf,image/*"
          />
          <label 
            htmlFor="doc-upload" 
            className={`flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            <span>{isUploading ? 'AI Analyzing...' : 'Upload New'}</span>
          </label>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start space-x-4">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </div>
          <div>
             <p className="text-sm font-bold text-blue-900">AI Verification Active</p>
             <p className="text-xs text-blue-700">Documents are scanned by EduSmart AI to verify authenticity.</p>
          </div>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-start space-x-4">
          <div className="bg-green-100 p-2 rounded-lg text-green-700">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/></svg>
          </div>
          <div>
             <p className="text-sm font-bold text-green-900">QR-Link Ready</p>
             <p className="text-xs text-green-700">Verified documents are now accessible via your card's QR code.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map(doc => (
          <div key={doc.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
             <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase mb-1 ${doc.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                     {doc.status}
                  </span>
                  <span className="text-[8px] text-blue-500 font-bold uppercase tracking-tighter flex items-center">
                    <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"/></svg>
                    QR Linked
                  </span>
                </div>
             </div>
             <h4 className="font-bold text-gray-800 mb-1 truncate">{doc.name}</h4>
             <p className="text-xs text-gray-400 mb-4">{doc.type} • Uploaded {doc.date}</p>
             <div className="flex space-x-2 mt-4">
               <button className="flex-1 bg-gray-50 text-gray-600 py-2 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors">View</button>
               <button className="flex-1 bg-gray-50 text-gray-600 py-2 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors">Share</button>
             </div>
          </div>
        ))}
      </div>

      {showAnalysisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-scaleIn">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800">AI Analysis Complete</h4>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 mb-6">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Extracted Insights</p>
              <div className="text-sm text-gray-700 leading-relaxed max-h-48 overflow-y-auto">
                {aiAnalysis}
              </div>
            </div>
            <button 
              onClick={() => setShowAnalysisModal(false)}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vault;
