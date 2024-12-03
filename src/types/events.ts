// src/types/events.ts

export type EventType = 
  | 'RESOURCE_CHANGE'   // リソースの変動
  | 'RANDOM_EVENT'      // ランダムイベント
  | 'MILESTONE'         // 達成イベント
  | 'CRISIS'           // 危機イベント
  | 'DIPLOMATIC'       // 外交イベント
  | 'MILITARY';        // 軍事イベント

export type MonthlyEvent = {
  id: string;
  type: EventType;
  title: string;
  description: string;
  impact: {
    resourceType?: string;
    amount?: number;
    description: string;
  }[];
  date: {
    year: number;
    month: number;
  };
  severity: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
};