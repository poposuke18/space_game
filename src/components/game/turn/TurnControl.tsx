'use client';

import React, { useState } from 'react';
import { useTurnStore } from '@/lib/store/turnStore';
import { Calendar, Activity, History } from 'lucide-react';
import { MonthlyReportModal } from '../reports/MonthlyReportModal';
import { EventHistoryModal } from '../reports/EventHistory';

export const TurnControl = () => {
    const { 
        currentDate,
        reportDate, 
        availableActions, 
        usedActions, 
        advanceMonth,
        isProcessing,
        monthlyEvents,
        showReport,
        closeReport
      } = useTurnStore();
  const [showHistory, setShowHistory] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-6">
          {/* 日付表示 */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-white font-medium">
              {currentDate.year}年{currentDate.month}月
            </span>
          </div>

          {/* アクション残数 */}
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-400" />
            <span className="text-white">
              残りアクション: {availableActions - usedActions}
            </span>
          </div>

          {/* 履歴ボタン */}
          <button
            onClick={() => setShowHistory(true)}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <History className="w-5 h-5 text-gray-400" />
          </button>

          {/* ターン終了ボタン */}
          <button
            onClick={advanceMonth}
            disabled={isProcessing}
            className={`px-4 py-2 rounded-lg ${
              isProcessing
                ? 'bg-gray-600 text-gray-400'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } transition-colors`}
          >
            次の月へ
          </button>
        </div>
      </div>

      {/* 月次レポートモーダル */}
      {showReport && (
        <MonthlyReportModal
          events={monthlyEvents.filter(event => 
            event.date.year === reportDate.year && 
            event.date.month === reportDate.month
          )}
          date={reportDate}
          onClose={closeReport}
        />
      )}

      {/* 履歴モーダル */}
      {showHistory && (
        <EventHistoryModal
          events={monthlyEvents}
          onClose={() => setShowHistory(false)}
        />
      )}
    </>
  );
};