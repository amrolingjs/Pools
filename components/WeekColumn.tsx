import React from 'react';
import { WeekData, RoadmapItem } from '../types';
import Card from './Card';
import OutcomesCard from './OutcomesCard';

interface WeekColumnProps {
  week: WeekData;
  onUpdateItem: (id: string, updates: Partial<RoadmapItem>) => void;
  onUpdateOutcome: (weekId: string, outcomeId: string) => void;
}

const WeekColumn: React.FC<WeekColumnProps> = ({ week, onUpdateItem, onUpdateOutcome }) => {
  return (
    <div className="w-full glass-panel rounded-2xl overflow-hidden shadow-2xl shadow-black/20 group hover:border-purple-500/20 transition-all duration-500">
      {/* Header Row */}
      <div className="p-6 md:p-8 border-b border-white/5 bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <div className="flex items-center gap-3 mb-1">
             <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{week.title}</h2>
             <div className="h-px bg-white/10 flex-1 md:w-20"></div>
           </div>
           <p className="text-sm text-purple-400 font-bold uppercase tracking-widest text-[10px]">{week.subtitle}</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          
          {/* Tasks Grid */}
          {week.items.map((item) => (
            <Card 
              key={item.id} 
              item={item} 
              onUpdate={onUpdateItem}
            />
          ))}

          {/* Outcomes Card (Special Interactive Flip Card) */}
          {week.outcomes && week.outcomes.length > 0 && (
             <OutcomesCard 
               outcomes={week.outcomes}
               onToggleOutcome={(outcomeId) => onUpdateOutcome(week.id, outcomeId)}
             />
          )}
          
        </div>
      </div>
    </div>
  );
};

export default WeekColumn;