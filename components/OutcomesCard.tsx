import React, { useState } from 'react';
import { Outcome } from '../types';
import { CheckSquare, Check, RotateCw } from 'lucide-react';

interface OutcomesCardProps {
  outcomes: Outcome[];
  onToggleOutcome: (outcomeId: string) => void;
}

const OutcomesCard: React.FC<OutcomesCardProps> = ({ outcomes, onToggleOutcome }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const completedCount = outcomes.filter(o => o.isCompleted).length;
  const totalCount = outcomes.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleCardClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleToggle = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onToggleOutcome(id);
  };

  return (
    <div 
      className="relative perspective-1000 h-full min-h-[160px] cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRONT SIDE */}
        <div className="absolute w-full h-full bg-gradient-to-br from-slate-900/80 to-slate-900/40 rounded-xl p-6 border border-white/10 flex flex-col justify-center backface-hidden shadow-2xl hover:border-emerald-500/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <CheckSquare size={14} className="text-emerald-500" />
              Итоги недели
            </h4>
            <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
              {completedCount} / {totalCount}
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {outcomes.map((outcome) => (
              <div key={outcome.id} className="text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed group-hover:text-white transition-colors">
                <span className={`block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 transition-colors ${outcome.isCompleted ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-600'}`}></span>
                <span className={outcome.isCompleted ? 'line-through text-emerald-500/50' : ''}>{outcome.text}</span>
              </div>
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-800/50 h-1 rounded-full overflow-hidden mt-auto">
             <div 
               className="h-full bg-emerald-500 transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
               style={{ width: `${progress}%` }}
             ></div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div 
            className="absolute w-full h-full rounded-xl border border-emerald-500/40 bg-[#161b28] backface-hidden rotate-y-180 flex flex-col shadow-[0_0_20px_rgba(16,185,129,0.15)] overflow-hidden"
            onClick={(e) => e.stopPropagation()} 
        >
           {/* BACK HEADER */}
           <div className="p-3 border-b border-emerald-500/20 bg-emerald-500/10 flex justify-between items-center">
              <span className="text-xs font-bold uppercase text-emerald-300">
                  Чеклист итогов
              </span>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                className="text-slate-400 hover:text-white"
              >
                <RotateCw size={14} />
              </button>
           </div>
           
           <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
             <div className="space-y-3">
               {outcomes.map((outcome) => (
                 <div 
                   key={outcome.id} 
                   className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group/item"
                   onClick={(e) => handleToggle(e, outcome.id)}
                 >
                   <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all ${
                     outcome.isCompleted 
                       ? 'bg-emerald-500 border-emerald-500 text-black' 
                       : 'bg-black/40 border-slate-600 group-hover/item:border-emerald-400'
                   }`}>
                     {outcome.isCompleted && <Check size={12} strokeWidth={4} />}
                   </div>
                   <span className={`text-xs leading-relaxed transition-colors select-none ${
                     outcome.isCompleted ? 'text-emerald-400 line-through opacity-70' : 'text-slate-200'
                   }`}>
                     {outcome.text}
                   </span>
                 </div>
               ))}
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default OutcomesCard;