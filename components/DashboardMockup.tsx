import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { CHART_DATA } from '../constants';
import { TrendingUp, Users, Wallet, Target, Plus, Calendar } from 'lucide-react';

type DataMode = 'expectation' | 'reality';

interface MetricState {
  visits: number;
  connects: number;
  actions: number;
  tvl: number;
}

interface DailyDataEntry {
  dayNum: number; // For sorting
  day: string;    // Display label "Day X"
  visits: number;
  connects: number;
  actions: number;
  tvl: number;
}

const DashboardMockup: React.FC = () => {
  const [dataMode, setDataMode] = useState<DataMode>('expectation');
  
  // Baseline / Goal metrics (Static for Expectation mode)
  const expectationMetrics: MetricState = {
    visits: 8500,
    connects: 950,
    actions: 450,
    tvl: 320000
  };

  // HISTORY STATE: Stores data per day for charts
  const [history, setHistory] = useState<DailyDataEntry[]>([]);

  // Computed Totals for the Cards
  const realityMetrics = useMemo(() => {
    return history.reduce((acc, curr) => ({
      visits: acc.visits + curr.visits,
      connects: acc.connects + curr.connects,
      actions: acc.actions + curr.actions,
      tvl: Math.max(acc.tvl, curr.tvl) // TVL usually takes the latest or max, let's allow cumulative for simplicity or max
    }), { visits: 0, connects: 0, actions: 0, tvl: 0 });
  }, [history]);

  // State for input fields (Value and Day)
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    visits: '', connects: '', actions: '', tvl: ''
  });
  
  // Default day to '1' initially
  const [dayInputs, setDayInputs] = useState<{ [key: string]: string }>({
    visits: '1', connects: '1', actions: '1', tvl: '1'
  });

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>, key: string, value: string) => {
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setter((prev: any) => ({ ...prev, [key]: value }));
    }
  };

  const handleAdd = (key: keyof MetricState) => {
    const valueToAdd = parseInt(inputs[key] || '0', 10);
    const dayNum = parseInt(dayInputs[key] || '1', 10);

    if (valueToAdd > 0 && dayNum > 0) {
      setHistory(prevHistory => {
        // Check if day exists
        const existingDayIndex = prevHistory.findIndex(h => h.dayNum === dayNum);
        let newHistory = [...prevHistory];

        if (existingDayIndex >= 0) {
          // Update existing day
          const dayData = { ...newHistory[existingDayIndex] };
          if (key === 'tvl') {
             // For TVL, typically we overwrite or update the snapshot for that day
             dayData[key] = valueToAdd;
          } else {
             // For others, we add (e.g. +50 visits today)
             dayData[key] += valueToAdd;
          }
          newHistory[existingDayIndex] = dayData;
        } else {
          // Create new day entry
          const newEntry: DailyDataEntry = {
            dayNum,
            day: `Day ${dayNum}`,
            visits: 0,
            connects: 0,
            actions: 0,
            tvl: 0,
            [key]: valueToAdd
          };
          newHistory.push(newEntry);
        }

        // Sort by Day Number
        return newHistory.sort((a, b) => a.dayNum - b.dayNum);
      });

      // Clear value input but keep day input (often entering multiple metrics for same day)
      setInputs(prev => ({ ...prev, [key]: '' }));
    }
  };

  // Logic to determine which data to show in charts
  const chartData = dataMode === 'expectation' ? CHART_DATA : history;

  // Helper to format numbers nicely
  const formatVal = (val: number, isCurrency: boolean = false) => {
    if (isCurrency) {
      if (val === 0) return '$0.00';
      return `$${(val / 1000).toFixed(1)}k`; // e.g. $320.0k
    }
    return val.toLocaleString(); // e.g. 8,500
  };

  const statsConfig = [
    { 
      key: 'visits' as keyof MetricState,
      label: 'Total Visits', 
      sub: dataMode === 'expectation' ? '+12% vs yesterday' : 'Live Traffic', 
      icon: Users, 
      color: 'text-purple-400', 
      glow: 'shadow-purple-500/10' 
    },
    { 
      key: 'connects' as keyof MetricState,
      label: 'Wallet Connects', 
      sub: dataMode === 'expectation' ? '11.2% Conversion' : 'On-chain interactions', 
      icon: Wallet, 
      color: 'text-cyan-400', 
      glow: 'shadow-cyan-500/10' 
    },
    { 
      key: 'actions' as keyof MetricState,
      label: 'First Actions', 
      sub: dataMode === 'expectation' ? '47% from Connect' : 'Conversions', 
      icon: Target, 
      color: 'text-emerald-400', 
      glow: 'shadow-emerald-500/10' 
    },
    { 
      key: 'tvl' as keyof MetricState,
      label: 'Estimated TVL', 
      sub: 'Goal: $500k', 
      icon: TrendingUp, 
      color: 'text-amber-400', 
      glow: 'shadow-amber-500/10',
      isCurrency: true
    }
  ];

  return (
    <div className="p-6 md:p-10 space-y-8 animate-fade-in">
      <div className="glass-panel rounded-3xl p-8 shadow-2xl transition-all duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight flex items-center gap-3">
              Liquidity Pools 
              <span className="text-purple-400">Analytics</span>
            </h2>
            <p className="text-slate-400 font-light">
              {dataMode === 'expectation' 
                ? 'Projected performance metrics (Baseline)' 
                : 'Actual live performance data (Daily Input)'}
            </p>
          </div>

          {/* Controls: Mode Switcher & Live Badge */}
          <div className="flex flex-col items-end gap-3">
             
             {/* Expectation / Reality Toggle */}
             <div className="flex bg-[#0d111c] p-1 rounded-lg border border-white/10 relative">
                <button 
                  onClick={() => setDataMode('expectation')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    dataMode === 'expectation' 
                      ? 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Ожидание
                </button>
                <button 
                  onClick={() => setDataMode('reality')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    dataMode === 'reality' 
                      ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Реальность
                </button>
             </div>

             {/* Live Indicator */}
             <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500 ${
               dataMode === 'expectation' 
                ? 'bg-purple-500/10 border-purple-500/20' 
                : 'bg-emerald-500/10 border-emerald-500/20'
             }`}>
               <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dataMode === 'expectation' ? 'bg-purple-400' : 'bg-emerald-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${dataMode === 'expectation' ? 'bg-purple-500' : 'bg-emerald-500'}`}></span>
                </span>
                <span className={`text-xs font-semibold tracking-wide ${dataMode === 'expectation' ? 'text-purple-400' : 'text-emerald-400'}`}>
                  {dataMode === 'expectation' ? 'SIMULATION MODE' : 'LIVE DATA ENTRY'}
                </span>
             </div>

          </div>
        </div>

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {statsConfig.map((stat, i) => {
             const displayValue = dataMode === 'expectation' ? expectationMetrics[stat.key] : realityMetrics[stat.key];
             const formattedValue = formatVal(displayValue, stat.isCurrency);

             return (
               <div key={i} className={`bg-[#0d111c] p-6 rounded-2xl border transition-all duration-500 flex flex-col justify-between ${
                 dataMode === 'expectation' 
                   ? `border-white/5 hover:border-white/10 ${stat.glow}` // Expectation Style
                   : `border-emerald-500/20 bg-emerald-950/5 shadow-[0_0_15px_rgba(16,185,129,0.05)]` // Reality Style (Active)
               }`}>
                 <div>
                   <div className="flex items-center gap-3 mb-3 text-slate-500 text-xs font-bold uppercase tracking-wider">
                     <stat.icon size={16} className={`${dataMode === 'expectation' ? stat.color : 'text-emerald-400'} transition-colors duration-500`} /> {stat.label}
                   </div>
                   <div className="text-4xl font-bold text-white mb-1 transition-all duration-500">{formattedValue}</div>
                   <div className={`text-xs font-medium transition-colors duration-500 ${dataMode === 'expectation' ? stat.color : 'text-slate-500'}`}>
                     {stat.sub}
                   </div>
                 </div>

                 {/* ADD INPUT ROW - Only visible in REALITY Mode */}
                 {dataMode === 'reality' && (
                   <div className="mt-4 pt-4 border-t border-emerald-500/20 animate-fade-in">
                      <div className="flex gap-2 mb-1">
                          <label className="text-[9px] text-slate-500 uppercase font-bold w-1/3">Day</label>
                          <label className="text-[9px] text-slate-500 uppercase font-bold w-2/3">Value</label>
                      </div>
                      <div className="flex gap-2">
                        {/* Day Input */}
                        <div className="relative w-1/3">
                            <input 
                                type="text" 
                                value={dayInputs[stat.key]}
                                onChange={(e) => handleInputChange(setDayInputs, stat.key, e.target.value)}
                                className="w-full bg-black/40 border border-emerald-500/30 rounded px-2 py-1 text-xs text-center text-white focus:outline-none focus:border-emerald-400 transition-colors"
                            />
                        </div>
                        
                        {/* Value Input */}
                        <input 
                            type="text" 
                            placeholder="Add..."
                            value={inputs[stat.key]}
                            onChange={(e) => handleInputChange(setInputs, stat.key, e.target.value)}
                            className="w-full bg-black/40 border border-emerald-500/30 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-slate-600"
                        />
                        
                        <button 
                            onClick={() => handleAdd(stat.key)}
                            className="bg-emerald-500/20 hover:bg-emerald-500 hover:text-white text-emerald-400 border border-emerald-500/30 rounded p-1 transition-all active:scale-95"
                            title="Add to Day"
                        >
                            <Plus size={14} />
                        </button>
                      </div>
                   </div>
                 )}
              </div>
             );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-96">
          
          {/* Area Chart */}
          <div className="bg-[#0d111c] p-6 rounded-2xl border border-white/5 relative overflow-hidden">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 pl-2">Трафик и Конверсии (Cumulative)</h3>
            
            {dataMode === 'reality' && history.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none opacity-50">
                <p className="text-slate-600 font-bold text-sm uppercase tracking-widest">Add data to Day 1 to start chart</p>
              </div>
            )}

            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConnects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020408', borderColor: '#1e293b', color: '#f1f5f9', borderRadius: '8px' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <Area 
                  type="monotone" 
                  dataKey="visits" 
                  stroke={dataMode === 'expectation' ? "#a855f7" : "#10b981"} 
                  fillOpacity={1} 
                  fill={dataMode === 'expectation' ? "url(#colorVisits)" : "transparent"} 
                  strokeWidth={2} 
                  name="Visits" 
                  animationDuration={1000}
                />
                <Area 
                  type="monotone" 
                  dataKey="connects" 
                  stroke={dataMode === 'expectation' ? "#06b6d4" : "#a855f7"} 
                  fillOpacity={1} 
                  fill={dataMode === 'expectation' ? "url(#colorConnects)" : "transparent"} 
                  strokeWidth={2} 
                  name="Connects" 
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

           {/* Bar Chart */}
           <div className="bg-[#0d111c] p-6 rounded-2xl border border-white/5 relative overflow-hidden">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 pl-2">Действия пользователей (Daily)</h3>
            
            {dataMode === 'reality' && history.length === 0 && (
               <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none opacity-50">
                 <p className="text-slate-600 font-bold text-sm uppercase tracking-widest">Waiting for input...</p>
               </div>
            )}

            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   cursor={{fill: '#1e293b'}}
                   contentStyle={{ backgroundColor: '#020408', borderColor: '#1e293b', color: '#f1f5f9', borderRadius: '8px' }}
                />
                <Legend />
                <Bar 
                  dataKey="actions" 
                  name="First Actions" 
                  fill={dataMode === 'expectation' ? "#10b981" : "#10b981"} 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1000}
                />
                <Bar 
                  dataKey="connects" 
                  name="Wallet Connects" 
                  fill={dataMode === 'expectation' ? "#a855f7" : "#a855f7"} 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;