
import React from 'react';

const TechDocs: React.FC = () => {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10 animate-fadeIn bg-white min-h-screen">
      <header className="border-b border-gray-100 pb-8">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">EduSmart: Technical Blueprint</h1>
        <p className="text-xl text-gray-500">A Next-Gen Unified Student Identity & Financial Ecosystem</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">1. Problem Statement Analysis</h2>
        <div className="bg-gray-50 p-6 rounded-3xl leading-relaxed text-gray-700">
          <p className="mb-4">
            Physical student IDs are outdated. They are easily lost, don't store academic data, and aren't integrated with campus commerce. Students carry multiple items: ID, wallet, and paper documents.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Fragmentation:</strong> Separate systems for ID, Canteen, Library, and Fees.</li>
            <li><strong>Manual Verification:</strong> Staff manually checking physical documents for validity.</li>
            <li><strong>Payment Friction:</strong> Lack of seamless digital payments within the campus ecosystem.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">2. Solution Architecture (MVP)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-gray-100 rounded-3xl shadow-sm">
            <h3 className="font-bold text-blue-700 mb-3">Core Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✔</span>
                <span><strong>Dynamic Virtual ID:</strong> Real-time generated barcode for attendance and security.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✔</span>
                <span><strong>Unified Wallet:</strong> UPI-integrated campus currency for zero-friction payments.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✔</span>
                <span><strong>AI-Vault:</strong> Intelligent document storage with automated verification.</span>
              </li>
            </ul>
          </div>
          <div className="p-6 border border-gray-100 rounded-3xl shadow-sm">
            <h3 className="font-bold text-blue-700 mb-3">Tech Stack</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start"><span className="text-blue-500 mr-2">▹</span><span><strong>Frontend:</strong> React 18+, TypeScript, Tailwind CSS</span></li>
              <li className="flex items-start"><span className="text-blue-500 mr-2">▹</span><span><strong>AI Engine:</strong> Google Gemini 3 (Flash Preview)</span></li>
              <li className="flex items-start"><span className="text-blue-500 mr-2">▹</span><span><strong>Icons/UI:</strong> Custom SVG System, Inter Variable Font</span></li>
              <li className="flex items-start"><span className="text-blue-500 mr-2">▹</span><span><strong>State:</strong> React Hooks (Unified Global Context)</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">3. AI-Enhanced Innovation</h2>
        <div className="bg-blue-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3">OCR & Verification</h3>
              <p className="text-sm text-blue-100 opacity-90 leading-relaxed">
                Using Gemini's vision capabilities, EduSmart doesn't just store documents; it reads them. It extracts marks, validity dates, and authenticity markers automatically upon upload.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Predictive Campus Guide</h3>
              <p className="text-sm text-blue-100 opacity-90 leading-relaxed">
                A context-aware LLM chatbot that knows the student's roll number, balance, and major, providing personalized academic and financial guidance.
              </p>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
        </div>
      </section>

      <section className="space-y-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-800">4. Future Roadmap</h2>
        <div className="border-l-4 border-blue-600 pl-6 space-y-6">
          <div>
            <h4 className="font-bold text-gray-800">NFC Tap-to-Enter</h4>
            <p className="text-sm text-gray-500">Integration with hardware NFC sensors for contactless gate entry and library check-ins.</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-800">Blockchain Records</h4>
            <p className="text-sm text-gray-500">Storing degree certificates and final marks on a private blockchain to prevent academic fraud.</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-800">P2P Peer Payments</h4>
            <p className="text-sm text-gray-500">Allowing students to split bills and transfer small amounts securely between campus wallets.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechDocs;
