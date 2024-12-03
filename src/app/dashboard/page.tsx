// src/app/dashboard/page.tsx

'use client';

import React from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { useTurnStore } from '@/lib/store/turnStore';
import GameLayout from '@/components/game/layout/GameLayout';
import { AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const { resources, alerts } = useGameStore();
  useTurnStore();

  return (
    <GameLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">コロニー状況</h1>

        {/* 重要指標 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(resources).map((resource) => (
            <div 
              key={resource.type} 
              className="bg-gray-800 p-6 rounded-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-white">{resource.name}</h3>
                  <p className="text-2xl font-bold">
                    {resource.current.toLocaleString()} {resource.unit}
                  </p>
                </div>
                {resource.alertLevel !== 'NONE' && (
                  <AlertTriangle className={`
                    w-5 h-5 
                    ${resource.alertLevel === 'CRITICAL' ? 'text-red-500' : 'text-yellow-500'}
                  `} />
                )}
              </div>

              <div className="text-sm text-gray-400">
                前月比: {/* ここに変動率を表示 */}
              </div>
            </div>
          ))}
        </div>

        {/* 最近のアラート */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">最近の報告</h2>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg"
              >
                <AlertTriangle className={`
                  w-5 h-5 
                  ${alert.type === 'CRITICAL' ? 'text-red-500' : 'text-yellow-500'}
                `} />
                <div>
                  <p className="text-white">{alert.message}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GameLayout>
  );
}