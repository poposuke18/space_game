// src/lib/store/turnStore.ts

import { create } from 'zustand';
import { useGameStore } from './gameStore';
import type { MonthlyEvent } from '@/types/events';
import { useEconomyStore } from './economyStore';
import { useEventStore } from './eventStore';

interface GameDate {
  year: number;
  month: number;
}

interface TurnState {
  currentDate: GameDate;
  isProcessing: boolean;
  reportDate: GameDate;
  availableActions: number;
  usedActions: number;
  monthlyEvents: MonthlyEvent[];
  showReport: boolean;
  pendingMonthEnd: boolean;  // 追加: 月次処理の保留状態
  
  // アクション
  advanceMonth: () => void;
  useAction: () => boolean;
  resetActions: () => void;
  addEvent: (event: Omit<MonthlyEvent, 'id' | 'date'>) => void;
  closeReport: () => void;
  processMonthEnd: () => void;  // 追加: 月次処理用の関数
}

export const useTurnStore = create<TurnState>((set, get) => ({
  currentDate: {
    year: 2157,
    month: 3,
  },
  reportDate: {
    year: 2157,
    month: 3,
  },
  isProcessing: false,
  availableActions: 3,
  usedActions: 0,
  monthlyEvents: [],
  showReport: false,
  pendingMonthEnd: false,

  advanceMonth: () => {
    set({ isProcessing: true });

    // 1. まず月を進める
    set(state => {
      const newMonth = state.currentDate.month + 1;
      const newYear = newMonth > 12 
        ? state.currentDate.year + 1 
        : state.currentDate.year;

      return {
        currentDate: {
          year: newYear,
          month: newMonth > 12 ? 1 : newMonth,
        }
      };
    });

    // 2. イベントのチェックと生成
    const eventStore = useEventStore.getState();
    const randomEvent = eventStore.generateRandomEvent();

    if (randomEvent?.choices) {
      // 選択が必要なイベントがある場合、月次処理は保留
      set({ pendingMonthEnd: true });
    } else {
      // 選択が不要な場合、すぐに月次処理を実行
      get().processMonthEnd();
    }

    set({ isProcessing: false });
  },

  processMonthEnd: () => {
    const gameStore = useGameStore.getState();
    const economyStore = useEconomyStore.getState();

    // 1. 経済レポート生成と処理
    const detailedIncome = economyStore.calculateDetailedIncome();
    const detailedExpenses = economyStore.calculateDetailedExpenses();
    const totalIncome = Object.values(detailedIncome).reduce((sum, val) => sum + val, 0);
    const totalExpenses = Object.values(detailedExpenses).reduce((sum, val) => sum + val, 0);
    const netChange = totalIncome - totalExpenses;

    get().addEvent({
      type: 'RESOURCE_CHANGE',
      title: '月次財務報告',
      description: '今月の収支状況をご報告します。',
      impact: [
        {
          resourceType: 'CREDITS',
          amount: totalIncome,
          description: `総収入: +${totalIncome.toLocaleString()} Cr`
        },
        {
          resourceType: 'CREDITS',
          amount: -totalExpenses,
          description: `総支出: -${totalExpenses.toLocaleString()} Cr`
        },
        {
          resourceType: 'CREDITS',
          amount: netChange,
          description: `純利益: ${netChange > 0 ? '+' : ''}${netChange.toLocaleString()} Cr`
        }
      ],
      severity: netChange >= 0 ? 'POSITIVE' : 'NEGATIVE'
    });

    // 2. 人口変動の処理
    const popChange = Math.floor(gameStore.resources.POPULATION.current * (Math.random() * 0.02 - 0.01));
    if (Math.abs(popChange) > 0) {
      get().addEvent({
        type: 'RESOURCE_CHANGE',
        title: '人口動態報告',
        description: popChange > 0 
          ? '新規入植者の受け入れにより人口が増加しました。'
          : '一部の市民が他のコロニーへ移住しました。',
        impact: [{
          resourceType: 'POPULATION',
          amount: popChange,
          description: `人口変動: ${popChange > 0 ? '+' : ''}${popChange.toLocaleString()} 人`
        }],
        severity: popChange > 0 ? 'POSITIVE' : 'NEGATIVE'
      });
    }

    // 他のリソース消費と報告
    const foodConsumption = Math.floor(gameStore.resources.POPULATION.current * 0.1);
    const energyConsumption = Math.floor(gameStore.resources.POPULATION.current * 0.2);
    const supportChange = Math.floor(Math.random() * 5 - 2);

    // 食料消費レポート
    get().addEvent({
      type: 'RESOURCE_CHANGE',
      title: '食料供給状況',
      description: '今月の食料消費量をご報告します。',
      impact: [{
        resourceType: 'FOOD',
        amount: -foodConsumption,
        description: `食料消費: -${foodConsumption.toLocaleString()} トン`
      }],
      severity: 'NEUTRAL'
    });

    // エネルギー消費レポート
    get().addEvent({
      type: 'RESOURCE_CHANGE',
      title: 'エネルギー使用状況',
      description: '今月のエネルギー消費量をご報告します。',
      impact: [{
        resourceType: 'ENERGY',
        amount: -energyConsumption,
        description: `エネルギー消費: -${energyConsumption.toLocaleString()} MW`
      }],
      severity: 'NEUTRAL'
    });

    // 支持率変動レポート
    if (supportChange !== 0) {
      get().addEvent({
        type: 'RESOURCE_CHANGE',
        title: '市民支持率調査',
        description: supportChange > 0 
          ? '施策が好評価を受け、支持率が上昇しました。'
          : '一部施策への不満により、支持率が低下しました。',
        impact: [{
          resourceType: 'SUPPORT',
          amount: supportChange,
          description: `支持率変動: ${supportChange > 0 ? '+' : ''}${supportChange}%`
        }],
        severity: supportChange > 0 ? 'POSITIVE' : 'NEGATIVE'
      });
    }

    // リソースの更新処理
    gameStore.updateResource('CREDITS', netChange);
    gameStore.updateResource('POPULATION', popChange);
    gameStore.updateResource('FOOD', -foodConsumption);
    gameStore.updateResource('ENERGY', -energyConsumption);
    gameStore.updateResource('SUPPORT', supportChange);

    // レポート表示
    set({
      pendingMonthEnd: false,
      showReport: true,
      reportDate: get().currentDate
    });
  },

  useAction: () => {
    const { availableActions, usedActions } = get();
    if (usedActions >= availableActions) return false;

    set(state => ({
      usedActions: state.usedActions + 1
    }));
    return true;
  },

  resetActions: () => {
    set({
      usedActions: 0
    });
  },

  addEvent: (eventData) => set(state => {
    const newEvent = {
      ...eventData,
      id: crypto.randomUUID(),
      date: state.currentDate
    };

    return {
      monthlyEvents: [
        ...state.monthlyEvents,
        newEvent
      ]
    };
  }),

  closeReport: () => set({ showReport: false })
}));