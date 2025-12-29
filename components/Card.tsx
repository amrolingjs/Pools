import React, { useState } from 'react';
import { RoadmapItem, CardType, TaskStatus, ReactionType } from '../types';
import { 
  CheckCircle2, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  User, 
  Calendar,
  RotateCw,
  Clock,
  AlertCircle,
  Eye,
  Smile,
  ThumbsUp,
  Frown
} from 'lucide-react';

interface CardProps {
  item: RoadmapItem;
  onUpdate: (id: string, updates: Partial<RoadmapItem>) => void;
}

const Card: React.FC<CardProps> = ({ item, onUpdate }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<'edit' | 'read'>('edit');
  
  const isTask = item.type === CardType.TASK;
  const isReport = item.type === CardType.REPORT;
  const canFlip = isTask || isReport;

  const getStyle = (type: CardType) => {
    switch (type) {
      case CardType.TASK:
        return 'border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]';
      case CardType.KPI:
        return 'border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]';
      case CardType.REPORT:
        return 'border-amber-500/20 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]';
      case CardType.RISK:
        return 'border-red-500/20 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]';
      default:
        return 'border-slate-800 hover:border-slate-600';
    }
  };

  // Status Helpers
  const currentStatus = item.status || 'To Do';

  const getStatusIconColor = (status?: string) => {
    if (status === 'Done') return 'text-emerald-400';
    if (status === 'Not Done') return 'text-red-400';
    if (status === 'In Progress') return 'text-amber-400';
    return 'text-slate-500'; // Default To Do
  };

  const getIcon = (type: CardType) => {
    switch (type) {
      case CardType.TASK: 
        return <CheckCircle2 size={14} className={getStatusIconColor(item.status)} />;
      case CardType.KPI: 
        return <TrendingUp size={14} className="text-emerald-400" />;
      case CardType.REPORT: 
        return <FileText size={14} className={item.status === 'Done' ? 'text-amber-400' : 'text-slate-500'} />;
      case CardType.RISK: 
        return <AlertTriangle size={14} className="text-red-400" />;
    }
  };

  const getLabel = (type: CardType) => {
    switch (type) {
      case CardType.TASK: return 'Задача';
      case CardType.KPI: return 'KPI';
      case CardType.REPORT: return 'Отчет';
      case CardType.RISK: return 'Риск';
    }
  };

  const getStatusBadgeStyle = (status?: string) => {
    if (status === 'Done') return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (status === 'Not Done') return 'text-red-400 border-red-500/30 bg-red-500/10';
    if (status === 'In Progress') return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-slate-400 border-slate-700 bg-slate-800/50';
  };

  // Handlers
  const handleStatusChange = (status: TaskStatus) => {
    onUpdate(item.id, { status });
  };

  const handleReportChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate(item.id, { report: e.target.value });
  };
  
  const handleLateToggle = (isLate: boolean) => {
    onUpdate(item.id, { isLate });
    if (!isLate) {
        onUpdate(item.id, { lateDuration: undefined });
    }
  };

  const handleLateDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(item.id, { lateDuration: e.target.value });
  };

  const handleReaction = (reaction: ReactionType) => {
    // Toggle off if clicking same
    if (item.reaction === reaction) {
      onUpdate(item.id, { reaction: undefined });
    } else {
      onUpdate(item.id, { reaction });
    }
  };

  const handleCardClick = () => {
    if (canFlip) {
      setMode('edit');
      setIsFlipped(!isFlipped);
    }
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canFlip) {
      setMode('read');
      setIsFlipped(true);
    }
  };

  // Calculate dynamic height class
  // If reading, we expand significantly. If editing or front, we stick to grid defaults.
  const containerHeightClass = (isFlipped && mode === 'read') 
    ? 'min-h-[400px] z-10' 
    : 'h-full min-h-[160px]';

  return (
    <div 
      className={`relative perspective-1000 w-full transition-all duration-700 ease-in-out cursor-pointer group ${containerHeightClass}`}
      onClick={handleCardClick}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRONT SIDE */}
        <div className={`absolute w-full h-full p-5 rounded-xl border bg-[#0d111c] backface-hidden flex flex-col justify-between ${getStyle(item.type)}`}>
          <div>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${isTask ? 'text-white' : 'text-slate-500'}`}>
                  {getIcon(item.type)}
                  {getLabel(item.type)}
                </span>
              </div>
              
              {item.deadline && (
                <span className="text-[10px] text-slate-400 flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  <Calendar size={10} />
                  {item.deadline}
                </span>
              )}
            </div>
            
            <h3 className="font-semibold text-base leading-snug mb-2 text-slate-100">{item.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-light line-clamp-3">{item.description}</p>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 relative">
            {item.owner && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                   <User size={10} className="text-slate-400" />
                </div>
                <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">{item.owner.split(' ')[0]}</span>
              </div>
            )}

            {/* Middle Button: View Report (Visible on hover or if report exists) */}
            {canFlip && (
              <button 
                onClick={handleViewClick}
                className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${item.report ? 'bg-white/10 border-purple-500/30 text-white opacity-100' : 'bg-white/5 border-white/10 text-slate-400 opacity-0 group-hover:opacity-100'}`}
                title="Читать отчет"
              >
                 <Eye size={12} />
                 <span className="text-[10px] font-medium">Отчет</span>
                 {item.reaction && (
                   <span className="text-xs ml-0.5">
                     {item.reaction === 'happy' && '🤩'}
                     {item.reaction === 'like' && '👍'}
                     {item.reaction === 'sad' && '😔'}
                   </span>
                 )}
              </button>
            )}

            {/* Status Display Logic */}
            <div className="flex gap-2">
                {item.status && item.status !== 'To Do' && !isReport && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusBadgeStyle(item.status)} font-medium`}>
                        {item.status === 'Not Done' ? 'Failed' : item.status}
                    </span>
                )}
                
                {/* Report Specific Status Badge */}
                {isReport && item.status === 'Done' && (
                    <div className="flex gap-1">
                        {item.isLate ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 font-bold flex items-center gap-1">
                                <AlertCircle size={10} />
                                Опоздание
                            </span>
                        ) : (
                            <span className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold flex items-center gap-1">
                                <Clock size={10} />
                                Вовремя
                            </span>
                        )}
                    </div>
                )}
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div 
            className={`absolute w-full h-full rounded-xl border bg-[#161b28] backface-hidden rotate-y-180 flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden
             ${isTask ? 'border-purple-500/40' : 'border-amber-500/40'}
            `}
             onClick={(e) => e.stopPropagation()} 
        >
           {/* BACK HEADER */}
           <div className={`p-3 border-b flex justify-between items-center shrink-0 ${isTask ? 'bg-purple-500/10 border-purple-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
              <span className={`text-xs font-bold uppercase ${isTask ? 'text-purple-300' : 'text-amber-300'}`}>
                  {mode === 'read' ? 'Просмотр отчета' : (isTask ? 'Управление задачей' : 'Метрики отчета')}
              </span>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                className="text-slate-400 hover:text-white"
              >
                <RotateCw size={14} />
              </button>
           </div>
           
           <div className="p-4 flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
             
             {/* ========================================================= */}
             {/* MODE: EDIT (DEFAULT) - NO EMOJIS, ONLY INPUTS             */}
             {/* ========================================================= */}
             {mode === 'edit' && (
               <>
                 {isTask && (
                     <div>
                       <label className="text-[10px] uppercase text-slate-500 font-bold mb-1.5 block">Статус</label>
                       <div className="flex gap-2">
                         <button 
                           onClick={() => handleStatusChange('In Progress')}
                           className={`flex-1 py-1.5 px-2 rounded text-[10px] font-bold border transition-all ${
                             currentStatus === 'In Progress' 
                               ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                               : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                           }`}
                         >
                           В процессе
                         </button>
                         <button 
                           onClick={() => handleStatusChange('Done')}
                           className={`flex-1 py-1.5 px-2 rounded text-[10px] font-bold border transition-all ${
                             currentStatus === 'Done' 
                               ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                               : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                           }`}
                         >
                           Готово
                         </button>
                         <button 
                           onClick={() => handleStatusChange('Not Done')}
                           className={`flex-1 py-1.5 px-2 rounded text-[10px] font-bold border transition-all ${
                             currentStatus === 'Not Done' 
                               ? 'bg-red-500/20 border-red-500 text-red-400' 
                               : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                           }`}
                         >
                           Отмена
                         </button>
                       </div>
                     </div>
                 )}

                 {isReport && (
                     <div className="space-y-3">
                        <div>
                            <label className="text-[10px] uppercase text-slate-500 font-bold mb-1.5 block">Статус сдачи</label>
                            <div className="flex gap-2 mb-2">
                                 <button 
                                   onClick={() => { handleStatusChange('Done'); handleLateToggle(false); }}
                                   className={`flex-1 py-1.5 px-2 rounded text-[10px] font-bold border transition-all ${
                                     currentStatus === 'Done' && !item.isLate
                                       ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                                       : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                   }`}
                                 >
                                   Вовремя
                                 </button>
                                 <button 
                                   onClick={() => { handleStatusChange('Done'); handleLateToggle(true); }}
                                   className={`flex-1 py-1.5 px-2 rounded text-[10px] font-bold border transition-all ${
                                     currentStatus === 'Done' && item.isLate
                                       ? 'bg-red-500/20 border-red-500 text-red-400' 
                                       : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                   }`}
                                 >
                                   С опозданием
                                 </button>
                            </div>
                            
                            {item.isLate && currentStatus === 'Done' && (
                                 <div className="animate-fade-in bg-red-500/5 p-2 rounded border border-red-500/10">
                                     <label className="text-[9px] text-red-300 font-bold mb-1 block">На сколько опоздали?</label>
                                     <input 
                                        type="text" 
                                        placeholder="Например: 2 дня"
                                        value={item.lateDuration || ''}
                                        onChange={handleLateDurationChange}
                                        className="w-full bg-black/30 border border-red-500/30 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-red-500"
                                     />
                                 </div>
                            )}
                        </div>
                     </div>
                 )}

                 {/* Editable TextArea */}
                 <div className="flex-1 flex flex-col">
                   <label className="text-[10px] uppercase text-slate-500 font-bold mb-1.5 block">
                      {isReport ? 'Содержание отчета' : 'Заметки / Результат'}
                   </label>
                   <textarea 
                      value={item.report || ''}
                      onChange={handleReportChange}
                      placeholder={isReport ? "Вставьте ссылку на отчет или краткое содержание..." : "Комментарий к задаче..."}
                      className="flex-1 w-full bg-black/20 border border-white/10 rounded p-2 text-xs text-slate-200 focus:outline-none focus:border-white/20 resize-none"
                   />
                 </div>
               </>
             )}

             {/* ========================================================= */}
             {/* MODE: READ (EYE BUTTON) - READ ONLY TEXT + REACTIONS      */}
             {/* ========================================================= */}
             {mode === 'read' && (
               <>
                 <div className="flex-1 flex flex-col min-h-0">
                    <label className="text-[10px] uppercase text-slate-500 font-bold mb-2 block">
                        Отчет исполнителя
                    </label>
                    <div className="flex-1 w-full bg-black/20 border border-white/5 rounded-lg p-4 text-sm text-slate-200 overflow-y-auto custom-scrollbar leading-7 whitespace-pre-wrap font-light tracking-wide shadow-inner">
                        {item.report ? item.report : <span className="text-slate-600 italic">Отчет еще не добавлен...</span>}
                    </div>
                 </div>

                 {/* Reaction Controls - ONLY IN READ MODE */}
                 <div className="pt-4 border-t border-white/5 shrink-0">
                    <label className="text-[10px] uppercase text-slate-500 font-bold mb-2 block text-center">
                        Ваша реакция
                    </label>
                    <div className="flex justify-center gap-6">
                        <button 
                            onClick={() => handleReaction('happy')}
                            className={`p-2 rounded-full transition-all hover:scale-110 ${item.reaction === 'happy' ? 'bg-purple-500/20 text-purple-300 scale-110 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
                            title="Радостный"
                        >
                            <Smile size={28} />
                        </button>
                        <button 
                            onClick={() => handleReaction('like')}
                            className={`p-2 rounded-full transition-all hover:scale-110 ${item.reaction === 'like' ? 'bg-blue-500/20 text-blue-300 scale-110 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
                            title="Палец вверх"
                        >
                            <ThumbsUp size={28} />
                        </button>
                        <button 
                            onClick={() => handleReaction('sad')}
                            className={`p-2 rounded-full transition-all hover:scale-110 ${item.reaction === 'sad' ? 'bg-red-500/20 text-red-300 scale-110 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
                            title="Грустный"
                        >
                            <Frown size={28} />
                        </button>
                    </div>
                 </div>
               </>
             )}

           </div>
        </div>

      </div>
    </div>
  );
};

export default Card;