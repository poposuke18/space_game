// src/lib/store/eventStore.ts

import { create } from 'zustand';
import { randomEvents } from '@/data/randomEvents';
import type { RandomEvent, EventChoice } from '@/types/events/random';
import { useGameStore } from './gameStore';
import { useTurnStore } from './turnStore';

interface EventState {
  currentEvent: RandomEvent | null;
  handledEvents: string[];
  showEventChoice: boolean;
  
  // アクション
  generateRandomEvent: () => RandomEvent | null;
  handleEventChoice: (event: RandomEvent, choice: EventChoice) => void;
  handleImmediateEvent: (event: RandomEvent) => void;
  closeEventChoice: () => void;
}

export const useEventStore = create<EventState>((set, get) => ({
  currentEvent: null,
  handledEvents: [],
  showEventChoice: false,

  generateRandomEvent: () => {
    const gameStore = useGameStore.getState();
    const resources = gameStore.resources;

    // 条件を満たすイベントをフィルタリング
    const possibleEvents = randomEvents.filter(event => {
      // 既に処理済みのイベントを除外
      if (get().handledEvents.includes(event.id)) return false;

      // 条件チェック
      if (event.condition) {
        // リソース条件のチェック
        if (event.condition.resources) {
          for (const [key, value] of Object.entries(event.condition.resources)) {
            if (resources[key as keyof typeof resources].current < value) {
              return false;
            }
          }
        }
      }

      // 確率チェック
      return Math.random() < event.probability;
    });

    if (possibleEvents.length === 0) return null;

    // ランダムにイベントを選択
    const selectedEvent = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];

    // 選択肢があるイベントの場合は選択モーダルを表示
    if (selectedEvent.choices) {
      set({ 
        currentEvent: selectedEvent,
        showEventChoice: true
      });
    } else if (selectedEvent.immediateEffects) {
      // 即時効果のイベントは直接処理
      get().handleImmediateEvent(selectedEvent);
    }

    // イベントの報告を生成
    const turnStore = useTurnStore.getState();
    turnStore.addEvent({
      type: 'RANDOM_EVENT',
      title: selectedEvent.title,
      description: selectedEvent.description,
      impact: selectedEvent.immediateEffects ? [{
        description: selectedEvent.immediateEffects.description
      }] : [],
      severity: 'NEUTRAL'
    });

    return selectedEvent;
  },

  handleEventChoice: (event: RandomEvent, choice: EventChoice) => {
    const gameStore = useGameStore.getState();
    const turnStore = useTurnStore.getState();

    // リソースへの影響を適用
    Object.entries(choice.effects.resources).forEach(([resource, amount]) => {
      gameStore.updateResource(resource as keyof typeof gameStore.resources, amount);
    });

    // 支持率への影響を適用
    if (choice.effects.support) {
      gameStore.updateResource('SUPPORT', choice.effects.support);
    }

    // 選択結果のイベントレポートを生成
    turnStore.addEvent({
      type: 'RANDOM_EVENT',
      title: `${event.title}への対応`,
      description: choice.text,
      impact: [{
        description: choice.effects.description
      }],
      severity: choice.effects.support && choice.effects.support > 0 ? 'POSITIVE' : 'NEGATIVE'
    });

    // イベントを処理済みとしてマーク
    set(state => ({
      handledEvents: [...state.handledEvents, event.id],
      currentEvent: null,
      showEventChoice: false
    }));

    // イベント処理完了後、月次処理を実行
    turnStore.processMonthEnd();
  },

  handleImmediateEvent: (event: RandomEvent) => {
    if (!event.immediateEffects) return;

    const gameStore = useGameStore.getState();

    // リソースへの影響を適用
    Object.entries(event.immediateEffects.resources).forEach(([resource, amount]) => {
      gameStore.updateResource(resource as keyof typeof gameStore.resources, amount);
    });

    // 支持率への影響を適用
    if (event.immediateEffects.support) {
      gameStore.updateResource('SUPPORT', event.immediateEffects.support);
    }

    // イベントを処理済みとしてマーク
    set(state => ({
      handledEvents: [...state.handledEvents, event.id],
      currentEvent: null,
      showEventChoice: false
    }));
  },

  closeEventChoice: () => set({ showEventChoice: false })
}));