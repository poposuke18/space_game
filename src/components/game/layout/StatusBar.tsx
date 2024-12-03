// src/components/game/layout/StatusBar.tsx

import React from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { useTurnStore } from '@/lib/store/turnStore';
import { AlertTriangle, AlertCircle } from 'lucide-react';

export const StatusBar = () => {
  const { resources, status, turn } = useGameStore();
  const { currentDate } = useTurnStore();

  const getAlertColor = (alertLevel: string) => {
    switch (alertLevel) {
      case 'CRITICAL': return 'bg-red-600';
      case 'HIGH': return 'bg-red-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'LOW': return 'bg-blue-500';
      default: return 'bg-blue-600';
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 1 });
  };

  return (
    <header className="h-16 bg-gray-800 text-white px-6 flex items-center justify-between">
      <div className="flex gap-8">
        {Object.values(resources).map((resource) => (
          <div key={resource.type} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                {resource.name}
                {resource.alertLevel !== 'NONE' && (
                  <AlertTriangle 
                    className={`w-4 h-4 ${
                      resource.alertLevel === 'CRITICAL' ? 'text-red-500 animate-pulse' : 'text-yellow-500'
                    }`} 
                  />
                )}
              </span>
              <span>
                {formatNumber(resource.current)}
                {resource.max ? ` / ${formatNumber(resource.max)}` : ''} {resource.unit}
              </span>
            </div>
            <div className="w-32 h-2 bg-gray-700 rounded-full">
              <div
                className={`h-full rounded-full transition-all duration-300 ${getAlertColor(resource.alertLevel)}`}
                style={{
                  width: `${(resource.current / resource.max) * 100}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {status === 'GAME_OVER' && (
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="w-5 h-5" />
            <span>コロニー崩壊</span>
          </div>
        )}
        <div className="text-right">
          <div className="text-sm">第{turn}期</div>
          <div className="text-sm text-gray-400">
            {currentDate.year}年{currentDate.month}月
          </div>
        </div>
      </div>
    </header>
  );
};