// src/components/game/reports/MonthlyReportModal.tsx

import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, AlertTriangle, Star, FileText, Zap } from 'lucide-react';
import type { MonthlyEvent } from '@/types/events';

interface MonthlyReportModalProps {
  events: MonthlyEvent[];
  date: { year: number; month: number };
  onClose: () => void;
}

export const MonthlyReportModal = ({ events, date, onClose }: MonthlyReportModalProps) => {
  const [activeTab, setActiveTab] = useState<'regular' | 'events'>('regular');

  const getEventIcon = (severity: MonthlyEvent['severity']) => {
    switch (severity) {
      case 'POSITIVE':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'NEGATIVE':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Star className="w-5 h-5 text-blue-500" />;
    }
  };

  // イベントを通常報告とイベント報告に分類
  const regularReports = events.filter(event => event.type === 'RESOURCE_CHANGE');
  const specialEvents = events.filter(event => event.type !== 'RESOURCE_CHANGE');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {date.year}年{date.month}月の報告
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* タブ */}
        <div className="flex border-b border-gray-700">
          <button
            className={`flex items-center gap-2 px-6 py-3 ${
              activeTab === 'regular'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('regular')}
          >
            <FileText className="w-4 h-4" />
            通常報告
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-3 ${
              activeTab === 'events'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('events')}
          >
            <Zap className="w-4 h-4" />
            イベント報告
            {specialEvents.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-blue-500 rounded-full">
                {specialEvents.length}
              </span>
            )}
          </button>
        </div>

        {/* レポート内容 */}
        <div className="p-6 space-y-4">
          {activeTab === 'regular' ? (
            regularReports.length > 0 ? (
              regularReports.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-700 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    {getEventIcon(event.severity)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-gray-300">{event.description}</p>
                    </div>
                  </div>

                  {event.impact && event.impact.length > 0 && (
                    <div className="pl-8">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">影響：</h4>
                      <ul className="space-y-1">
                        {event.impact.map((impact, index) => (
                          <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            {impact.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center">通常報告はありません</div>
            )
          ) : (
            specialEvents.length > 0 ? (
              specialEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-700 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    {getEventIcon(event.severity)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-gray-300">{event.description}</p>
                    </div>
                  </div>

                  {event.impact && event.impact.length > 0 && (
                    <div className="pl-8">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">影響：</h4>
                      <ul className="space-y-1">
                        {event.impact.map((impact, index) => (
                          <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            {impact.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center">特別なイベントは発生しませんでした</div>
            )
          )}
        </div>

        {/* フッター */}
        <div className="p-6 border-t border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  );
};