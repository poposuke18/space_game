// src/components/game/reports/EventHistory.tsx

import React from 'react';
import { X, Search } from 'lucide-react';
import type { MonthlyEvent, EventType } from '@/types/events';

interface EventHistoryModalProps {
  events: MonthlyEvent[];
  onClose: () => void;
}

export const EventHistoryModal = ({ events, onClose }: EventHistoryModalProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<EventType | 'ALL'>('ALL');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'ALL' || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    // 年と月で降順ソート（新しい順）
    const dateA = a.date.year * 12 + a.date.month;
    const dateB = b.date.year * 12 + b.date.month;
    return dateB - dateA;
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full h-[80vh]">
        {/* ヘッダー */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">コロニー歴史記録</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 検索・フィルター */}
        <div className="p-4 border-b border-gray-700 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="イベントを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as EventType | 'ALL')}
              className="bg-gray-700 rounded-lg px-4 py-2 text-white"
            >
              <option value="ALL">すべてのイベント</option>
              <option value="RESOURCE_CHANGE">リソース変動</option>
              <option value="RANDOM_EVENT">ランダムイベント</option>
              <option value="MILESTONE">達成イベント</option>
              <option value="CRISIS">危機イベント</option>
              <option value="DIPLOMATIC">外交イベント</option>
              <option value="MILITARY">軍事イベント</option>
            </select>
          </div>
        </div>

        {/* イベントリスト */}
        <div className="p-4 overflow-y-auto h-[calc(80vh-200px)]">
          <div className="space-y-4">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <span className="text-sm text-gray-400">
                    {event.date.year}年{event.date.month}月
                  </span>
                </div>
                <p className="text-gray-300 mb-2">{event.description}</p>
                {event.impact.length > 0 && (
                  <div className="text-sm text-gray-400">
                    <span className="font-semibold">影響：</span>
                    {event.impact.map((impact, index) => (
                      <span key={index} className="ml-2">{impact.description}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};