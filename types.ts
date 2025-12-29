export enum CardType {
  TASK = 'TASK',       // Blue
  KPI = 'KPI',         // Green
  REPORT = 'REPORT',   // Yellow
  RISK = 'RISK'        // Red
}

export type TaskStatus = 'To Do' | 'In Progress' | 'Done' | 'Not Done';

export type ReactionType = 'happy' | 'like' | 'sad';

export interface RoadmapItem {
  id: string;
  title: string;
  type: CardType;
  description: string;
  owner?: string;
  deadline?: string;
  status?: TaskStatus;
  report?: string; // New field for user report
  metrics?: string[]; // Specifically for KPI cards
  deliverables?: string[]; // Specifically for Report/Task cards
  
  // New fields for Report metrics
  isLate?: boolean;
  lateDuration?: string; // e.g. "2 дня", "1 неделя"
  
  // Client feedback
  reaction?: ReactionType;
}

export interface Outcome {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface WeekData {
  id: string;
  title: string;
  subtitle: string;
  items: RoadmapItem[];
  outcomes?: Outcome[]; // Updated from string[] to Outcome[]
}

export interface FutureGoal {
  id: string;
  title: string;
  period: string;
  items: string[];
  kpi: string[];
}