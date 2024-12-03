// src/lib/store/gameStore.ts

import { create } from 'zustand';

export type GameStatus = 'PLAYING' | 'GAME_OVER' | 'PAUSED';
export type AlertLevel = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type ResourceType = 'POPULATION' | 'FOOD' | 'ENERGY' | 'MILITARY' | 'SUPPORT' | 'CREDITS';

export interface Resource {
  type: ResourceType;
  name: string;
  current: number;
  max: number;
  min: number;
  criticalThreshold: number;
  warningThreshold: number;
  unit: string;
  alertLevel: AlertLevel;
  decayRate: number; // 1ターンごとの自然減少率
  timeToEffect?: number; // 危機的状況からの猶予ターン数
}

interface GameState {
  status: GameStatus;
  turn: number;
  difficulty: 'EASY' | 'NORMAL' | 'HARD';
  resources: Record<ResourceType, Resource>;
  alerts: Array<{
    id: string;
    type: AlertLevel;
    message: string;
    timestamp: number;
  }>;

 // アクション
 advanceTurn: () => void;
 checkGameOver: () => boolean;
 updateResource: (type: ResourceType, amount: number) => void;
 addAlert: (type: AlertLevel, message: string) => void;
 setDifficulty: (difficulty: 'EASY' | 'NORMAL' | 'HARD') => void;

   // 経済関連のアクション
   calculateIncome: () => number;  // 収入計算
   calculateExpenses: () => number;  // 支出計算
   processEconomics: () => void;  // ターン終了時の経済処理
}

export const useGameStore = create<GameState>((set, get) => ({
  status: 'PLAYING',
  turn: 1,
  difficulty: 'NORMAL',
  
  resources: {
    CREDITS: {
        type: 'CREDITS',
        name: 'クレジット',
        current: 100000,
        max: 1000000,
        min: -50000,  // マイナスまで許容（債務）
        criticalThreshold: 1000,
        warningThreshold: 10000,
        unit: 'Cr',
        alertLevel: 'NONE',
        decayRate: 0.02, // 固定支出による自然減少
      },
    POPULATION: {
      type: 'POPULATION',
      name: '人口',
      current: 20000,
      max: 25000,
      min: 0,
      criticalThreshold: 1000,
      warningThreshold: 5000,
      unit: '人',
      alertLevel: 'NONE',
      decayRate: 0.01, // 1%の自然減少
    },
    FOOD: {
      type: 'FOOD',
      name: '食料',
      current: 10000,
      max: 15000,
      min: 0,
      criticalThreshold: 1000,
      warningThreshold: 3000,
      unit: 'トン',
      alertLevel: 'NONE',
      decayRate: 0.05, // 5%の消費
      timeToEffect: 3, // 食料不足から人口減少までの猶予
    },
    ENERGY: {
      type: 'ENERGY',
      name: 'エネルギー',
      current: 8000,
      max: 10000,
      min: 0,
      criticalThreshold: 1000,
      warningThreshold: 2000,
      unit: 'MW',
      alertLevel: 'NONE',
      decayRate: 0.03,
      timeToEffect: 2,
    },
    MILITARY: {
      type: 'MILITARY',
      name: '軍事力',
      current: 5000,
      max: 8000,
      min: 0,
      criticalThreshold: 500,
      warningThreshold: 1000,
      unit: '部隊',
      alertLevel: 'NONE',
      decayRate: 0.02,
    },
    SUPPORT: {
      type: 'SUPPORT',
      name: '市民支持率',
      current: 100,
      max: 100,
      min: 0,
      criticalThreshold: 20,
      warningThreshold: 40,
      unit: '%',
      alertLevel: 'NONE',
      decayRate: 0.01,
      timeToEffect: 5,
    },
  },

  alerts: [],

  advanceTurn: () => {
    const state = get();
    const newResources = { ...state.resources };

    // リソースの自然減少を処理
    Object.values(newResources).forEach(resource => {
      const newValue = Math.max(
        resource.min,
        resource.current * (1 - resource.decayRate)
      );
      
      // アラートレベルの更新
      let alertLevel: AlertLevel = 'NONE';
      if (newValue <= resource.criticalThreshold) {
        alertLevel = 'CRITICAL';
      } else if (newValue <= resource.warningThreshold) {
        alertLevel = 'HIGH';
      }

      resource.current = newValue;
      resource.alertLevel = alertLevel;
    });

    get().processEconomics();
    
    if (get().checkGameOver()) {
      set({ status: 'GAME_OVER' });
    }

    set(state => ({
      turn: state.turn + 1,
      resources: newResources,
    }));

    // ゲームオーバーチェック
    if (get().checkGameOver()) {
      set({ status: 'GAME_OVER' });
    }
  },

  checkGameOver: () => {
    const state = get();
    const { POPULATION, FOOD, ENERGY, SUPPORT } = state.resources;

    // 即時ゲームオーバー条件
    if (POPULATION.current <= 0) return true;

    // 段階的なゲームオーバー条件
    if (FOOD.current <= 0 && FOOD.timeToEffect === 0) return true;
    if (ENERGY.current <= 0 && ENERGY.timeToEffect === 0) return true;
    if (SUPPORT.current <= SUPPORT.criticalThreshold && SUPPORT.timeToEffect === 0) return true;

    return false;
  },

  updateResource: (type: ResourceType, amount: number) => {
    set(state => {
      const resource = state.resources[type];
      const newValue = Math.max(
        resource.min,
        Math.min(resource.max, resource.current + amount)
      );

      return {
        resources: {
          ...state.resources,
          [type]: {
            ...resource,
            current: newValue,
          },
        },
      };
    });
  },

  addAlert: (type: AlertLevel, message: string) => {
    set(state => ({
      alerts: [
        ...state.alerts,
        {
          id: crypto.randomUUID(),
          type,
          message,
          timestamp: Date.now(),
        },
      ].slice(-5), // 最新の5件のみ保持
    }));
  },

  setDifficulty: (difficulty) => {
    set({ difficulty });
    // 難易度に応じてリソースの初期値や閾値を調整する処理を追加
  },

  calculateIncome: () => {
    const state = get();
    const { POPULATION, SUPPORT } = state.resources;
    
    // 基本収入の計算
    const taxIncome = POPULATION.current * 10; // 1人あたり10クレジットの税収
    const supportBonus = (SUPPORT.current / 100) * 0.2 + 1; // 支持率に応じたボーナス（最大1.2倍）
    
    return Math.floor(taxIncome * supportBonus);
  },

  calculateExpenses: () => {
    const state = get();
    const { POPULATION, MILITARY } = state.resources;
    
    // 基本支出の計算
    const basicExpenses = POPULATION.current * 5; // 1人あたり5クレジットの基本支出
    const militaryExpenses = MILITARY.current * 20; // 1部隊あたり20クレジットの軍事支出
    
    return Math.floor(basicExpenses + militaryExpenses);
  },

  processEconomics: () => {
    const income = get().calculateIncome();
    const expenses = get().calculateExpenses();
    const netChange = income - expenses;
    
    // クレジットの更新
    get().updateResource('CREDITS', netChange);
    
    // 収支レポートのアラート
    const message = `月次収支報告: 収入 ${income} Cr, 支出 ${expenses} Cr, 純利益 ${netChange} Cr`;
    get().addAlert(netChange >= 0 ? 'LOW' : 'HIGH', message);
  },
}));