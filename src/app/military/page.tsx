// src/app/military/page.tsx

'use client';

import React from 'react';
import GameLayout from '@/components/game/layout/GameLayout';
import { TrainingCoursesList } from '@/components/game/military/TrainingCoursesList';
import { Shield, Users, Target } from 'lucide-react';

export default function MilitaryPage() {
  const [activeTab, setActiveTab] = React.useState<'training' | 'forces' | 'combat'>('training');

  return (
    <GameLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">軍事管理</h1>
        </div>

        {/* タブナビゲーション */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('training')}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              activeTab === 'training'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            <Shield className="w-4 h-4" />
            訓練プログラム
          </button>
          <button
            onClick={() => setActiveTab('forces')}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              activeTab === 'forces'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            <Users className="w-4 h-4" />
            部隊編成
          </button>
          <button
            onClick={() => setActiveTab('combat')}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              activeTab === 'combat'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            <Target className="w-4 h-4" />
            戦闘記録
          </button>
        </div>

        {/* タブコンテンツ */}
        {activeTab === 'training' && <TrainingCoursesList />}
        {activeTab === 'forces' && (
          <div className="text-gray-400">部隊編成システムは開発中です</div>
        )}
        {activeTab === 'combat' && (
          <div className="text-gray-400">戦闘記録システムは開発中です</div>
        )}
      </div>
    </GameLayout>
  );
}