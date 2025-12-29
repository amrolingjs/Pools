import React, { useState } from 'react';
import { WEEKS_DATA, FUTURE_GOALS } from './constants';
import WeekColumn from './components/WeekColumn';
import DashboardMockup from './components/DashboardMockup';
import CryptoBackground from './components/CryptoBackground';
import { Layers, BarChart3, Clock, Milestone, MessageCircle, TrendingUp, Zap } from 'lucide-react';
import { RoadmapItem, WeekData } from './types';

enum ViewMode {
  ROADMAP = 'ROADMAP',
  DASHBOARD = 'DASHBOARD'
}

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.ROADMAP);
  // Lift state up to manage updates
  const [weeks, setWeeks] = useState<WeekData[]>(WEEKS_DATA);

  const handleUpdateItem = (itemId: string, updates: Partial<RoadmapItem>) => {
    setWeeks(prevWeeks => 
      prevWeeks.map(week => ({
        ...week,
        items: week.items.map(item => 
          item.id === itemId ? { ...item, ...updates } : item
        )
      }))
    );
  };

  const handleUpdateOutcome = (weekId: string, outcomeId: string) => {
    setWeeks(prevWeeks => 
      prevWeeks.map(week => {
        if (week.id === weekId && week.outcomes) {
          return {
            ...week,
            outcomes: week.outcomes.map(outcome => 
              outcome.id === outcomeId 
                ? { ...outcome, isCompleted: !outcome.isCompleted } 
                : outcome
            )
          };
        }
        return week;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-100 selection:bg-purple-500/30 selection:text-purple-200 relative">
      
      {/* Background Effect */}
      <CryptoBackground />

      {/* Navbar */}
      <header className="h-20 border-b border-white/5 bg-[#020408]/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <span className="text-xl font-bold text-white">P</span>
          </div>
          <div className="leading-tight">
            <div className="text-xl font-bold tracking-tight text-white">Liquidity Pools</div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">Launch Strategy</div>
          </div>
        </div>

        <nav className="flex gap-2 p-1.5 rounded-xl bg-white/5 border border-white/5">
          <button 
            onClick={() => setView(ViewMode.ROADMAP)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              view === ViewMode.ROADMAP 
                ? 'bg-[#1e293b] text-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.1)] border border-purple-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers size={16} /> Roadmap
          </button>
          <button 
            onClick={() => setView(ViewMode.DASHBOARD)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              view === ViewMode.DASHBOARD 
                ? 'bg-[#1e293b] text-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.1)] border border-purple-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
             <BarChart3 size={16} /> Analytics
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative z-10">
        
        {view === ViewMode.ROADMAP ? (
          <div className="h-full flex flex-col overflow-y-auto custom-scrollbar">
            {/* Header Area for Roadmap */}
            <div className="px-6 md:px-10 py-10 max-w-7xl mx-auto w-full">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                    Baseline & Launch
                  </h1>
                  <p className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed">
                    Стратегия запуска рассчитана на <span className="text-purple-400 font-medium">1 месяц</span> интенсивной работы для создания базы и получения первых результатов.
                    Включает в себя экономику, упаковку, трафик и аналитику.
                  </p>
                </div>
                <div className="hidden lg:block shrink-0">
                   <div className="px-4 py-3 rounded-lg border border-purple-500/20 bg-purple-950/20 flex items-center gap-3">
                      <Zap className="text-purple-400" size={20} />
                      <span className="text-purple-200 text-sm font-medium">Current Phase: <span className="text-white">Week 1 Baseline</span></span>
                   </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-white/5 border border-white/5 px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></span> Задача
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-white/5 border border-white/5 px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span> KPI
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-white/5 border border-white/5 px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span> Отчет
                </div>
              </div>
            </div>

            {/* Vertical Stack Container */}
            <div className="flex flex-col gap-8 px-6 md:px-10 pb-20 max-w-7xl mx-auto w-full">
              
              {/* Regular Weeks as Rows */}
              {weeks.map((week) => (
                <WeekColumn 
                  key={week.id} 
                  week={week} 
                  onUpdateItem={handleUpdateItem}
                  onUpdateOutcome={handleUpdateOutcome}
                />
              ))}

              {/* Future Goals Section (Wide Row) */}
              <div className="mt-8">
                 <div className="flex items-center gap-4 mb-6 px-2">
                    <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                       <Milestone className="text-indigo-400" size={24} />
                    </div>
                    <div>
                       <h2 className="text-3xl font-bold text-white tracking-tight">Будущие этапы</h2>
                       <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs mt-1">Scaling & Authority</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {FUTURE_GOALS.map((goal) => (
                      <div key={goal.id} className="bg-[#0d111c]/60 backdrop-blur-md border border-indigo-500/20 p-8 rounded-2xl hover:border-indigo-500/40 transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] group">
                        <div className="flex justify-between items-start mb-6 border-b border-indigo-500/10 pb-4">
                           <div>
                             <h3 className="font-bold text-2xl text-indigo-100 group-hover:text-white transition-colors">{goal.title}</h3>
                           </div>
                           <span className="text-xs font-bold bg-indigo-500/20 px-3 py-1.5 rounded-lg text-indigo-300 border border-indigo-500/20 uppercase tracking-wider">{goal.period}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <div className="text-xs font-bold text-indigo-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Задачи
                            </div>
                            <ul className="space-y-2.5">
                              {goal.items.map((item, i) => (
                                <li key={i} className="text-sm text-indigo-200/80 pl-3 border-l border-indigo-500/30 hover:text-indigo-100 transition-colors">{item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-emerald-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Target KPI
                            </div>
                            <ul className="space-y-2.5">
                              {goal.kpi.map((k, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-emerald-200/80 bg-emerald-900/10 px-3 py-1.5 rounded border border-emerald-500/10">
                                  <TrendingUp size={14} className="text-emerald-500 shrink-0" /> {k}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto custom-scrollbar">
             <DashboardMockup />
          </div>
        )}
      </main>

      {/* Communication Footer */}
      <footer className="border-t border-white/5 bg-[#020408]/80 backdrop-blur-md py-4 px-8 text-xs text-slate-500 flex justify-between items-center z-20">
        <div className="flex gap-8">
          <div className="flex items-center gap-2 hover:text-purple-400 transition-colors cursor-pointer">
            <Clock size={14} />
            <span className="font-medium">Созвоны: Вт/Пт (60 мин)</span>
          </div>
          <div className="flex items-center gap-2 hover:text-purple-400 transition-colors cursor-pointer">
            <MessageCircle size={14} />
            <span className="font-medium">Updates: Daily Telegram</span>
          </div>
        </div>
        <div className="opacity-50 font-mono">
          SYSTEM_VERSION_1.0 // LIQUIDITY_POOLS
        </div>
      </footer>
    </div>
  );
};

export default App;