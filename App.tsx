import React, { useState } from 'react';
import { dashboardData } from './services/data';
import { RecruitmentView } from './components/RecruitmentView';
import { SchedulingView } from './components/SchedulingView';
import { Search, Bell, Clock, MoreHorizontal, ChevronDown } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'recruitment' | 'scheduling'>('recruitment');

  return (
    <div className="min-h-screen pb-20 font-sans selection:bg-apple-blue/20">
      {/* Apple-style Frosted Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-apple-border h-14 flex items-center justify-between px-6 transition-all duration-300">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 bg-gradient-to-br from-solvo-navy to-blue-700 rounded-lg shadow-sm text-white flex items-center justify-center font-bold text-lg">S</div>
           <div className="flex flex-col leading-none">
             <span className="text-sm font-semibold text-apple-text tracking-tight">Synergy Home Care</span>
             <span className="text-[10px] text-apple-subtext font-medium">South Austin Dashboard</span>
           </div>
        </div>

        {/* Center: iOS Segmented Control */}
        <div className="hidden md:flex bg-gray-200/50 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('recruitment')}
            className={`px-6 py-1.5 text-xs font-medium rounded-[6px] transition-all duration-200 ease-out ${
              activeTab === 'recruitment' 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Recruitment
          </button>
          <button
            onClick={() => setActiveTab('scheduling')}
            className={`px-6 py-1.5 text-xs font-medium rounded-[6px] transition-all duration-200 ease-out ${
              activeTab === 'scheduling' 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Scheduling
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center text-xs text-apple-subtext bg-white/50 px-2 py-1 rounded-md border border-apple-border">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                Live
             </div>
             <button className="p-2 hover:bg-black/5 rounded-full text-apple-text transition-colors">
                <Search className="w-4 h-4" />
             </button>
             <button className="p-2 hover:bg-black/5 rounded-full text-apple-text transition-colors relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 border border-white shadow-sm flex items-center justify-center text-xs font-medium text-gray-600">
                JD
             </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1120px] mx-auto px-6 py-10 animate-fade-in-up">
        
        {/* Mobile Tab Switcher (visible only on small screens) */}
        <div className="md:hidden mb-6 bg-gray-200/50 p-1 rounded-lg flex">
          <button
            onClick={() => setActiveTab('recruitment')}
            className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
              activeTab === 'recruitment' ? 'bg-white shadow-sm text-black' : 'text-gray-500'
            }`}
          >
            Recruitment
          </button>
          <button
            onClick={() => setActiveTab('scheduling')}
            className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
              activeTab === 'scheduling' ? 'bg-white shadow-sm text-black' : 'text-gray-500'
            }`}
          >
            Scheduling
          </button>
        </div>

        {/* Page Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 text-[40px] flex items-center justify-center bg-white rounded-2xl shadow-apple-card border border-apple-border">
              📊
            </div>
            <div>
               <h1 className="text-3xl font-bold text-apple-text tracking-tight mb-1">Q4 Performance</h1>
               <p className="text-apple-subtext text-sm max-w-md">
                 Real-time overview of recruitment pipelines and scheduling efficiency for the South Austin office.
               </p>
               
               {/* Notion-like Properties, but styled like iOS tags */}
               <div className="flex flex-wrap gap-2 mt-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-apple-border rounded-full text-xs font-medium text-apple-subtext shadow-sm">
                     <Clock className="w-3 h-3"/>
                     Oct 1 - Dec 3
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-notion-green-bg border border-notion-green-bg/50 rounded-full text-xs font-medium text-notion-green-text shadow-sm">
                     <span className="w-1.5 h-1.5 rounded-full bg-notion-green-text"></span>
                     On Track
                  </div>
               </div>
            </div>
          </div>
          
          {/* Actions removed */}
        </div>

        {activeTab === 'recruitment' ? (
          <RecruitmentView data={dashboardData.recruitment} />
        ) : (
          <SchedulingView data={dashboardData.scheduling} />
        )}
      </main>
    </div>
  );
}

export default App;