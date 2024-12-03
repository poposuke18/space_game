// src/components/game/events/EventChoiceModal.tsx

'use client';

import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import type { RandomEvent, EventChoice } from '@/types/events/random';
import { useEventStore } from '@/lib/store/eventStore';

interface EventChoiceModalProps {
  event: RandomEvent;
  onClose: () => void;
}

export const EventChoiceModal = ({ event, onClose }: EventChoiceModalProps) => {
  const handleEventChoice = useEventStore(state => state.handleEventChoice);

  const handleChoice = (choice: EventChoice) => {
    handleEventChoice(event, choice);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl">
        {/* ヘッダー */}
        <div className="flex items-start justify-between p-6 border-b border-gray-700">
          <div className="pr-6">
            <h2 className="text-2xl font-bold text-white mb-2">{event.title}</h2>
            <p className="text-gray-300">{event.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 選択肢 */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">対応を選択してください：</h3>
          
          {event.choices?.map((choice) => (
            <div key={choice.id} className="space-y-4">
              <button
                onClick={() => handleChoice(choice)}
                className="w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-lg font-medium text-white">{choice.text}</span>
                </div>
                
                {/* 影響の予測 */}
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="pt-2 space-y-1">
                    <div className="text-gray-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>予測される影響：</span>
                    </div>
                    {Object.entries(choice.effects.resources).map(([resource, amount]) => (
                      <div key={resource} className={amount > 0 ? 'text-green-400' : 'text-red-400'}>
                        {resource}: {amount > 0 ? '+' : ''}{amount}
                      </div>
                    ))}
                    {choice.effects.support && (
                      <div className={choice.effects.support > 0 ? 'text-green-400' : 'text-red-400'}>
                        支持率: {choice.effects.support > 0 ? '+' : ''}{choice.effects.support}%
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* フッター */}
        <div className="p-6 border-t border-gray-700">
          <p className="text-sm text-gray-400 text-center">
            ※選択した対応は取り消すことができません
          </p>
        </div>
      </div>
    </div>
  );
};