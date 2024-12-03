// src/app/facilities/page.tsx

'use client';

import React from 'react';
import GameLayout from '@/components/game/layout/GameLayout';
import { Building2, Factory, Boxes, Wheat, Zap } from 'lucide-react';

export default function FacilitiesPage() {
  // 仮の施設データ
  const facilities = [
    {
      type: 'RESIDENTIAL',
      name: '居住区画',
      count: 5,
      capacity: 5000,
      currentUsage: 4200,
      icon: <Building2 className="w-5 h-5" />,
      status: 'OPERATIONAL'
    },
    {
      type: 'INDUSTRIAL',
      name: '工業地区',
      count: 3,
      production: '850 units/month',
      icon: <Factory className="w-5 h-5" />,
      status: 'OPERATIONAL'
    },
    {
      type: 'STORAGE',
      name: '備蓄倉庫',
      capacity: '10000 units',
      currentStorage: '6500 units',
      icon: <Boxes className="w-5 h-5" />,
      status: 'OPERATIONAL'
    },
    {
      type: 'FARM',
      name: '農業区画',
      count: 2,
      production: '1200 food/month',
      icon: <Wheat className="w-5 h-5" />,
      status: 'MAINTENANCE'
    },
    {
      type: 'POWER',
      name: 'エネルギー施設',
      output: '8000 MW',
      consumption: '6500 MW',
      icon: <Zap className="w-5 h-5" />,
      status: 'OPERATIONAL'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPERATIONAL': return 'text-green-500';
      case 'MAINTENANCE': return 'text-yellow-500';
      case 'OFFLINE': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <GameLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">施設管理</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            新規建設
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <div 
              key={index}
              className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {facility.icon}
                  <div>
                    <h3 className="font-semibold text-lg">{facility.name}</h3>
                    <span className={`text-sm ${getStatusColor(facility.status)}`}>
                      {facility.status === 'OPERATIONAL' ? '稼働中' : 
                       facility.status === 'MAINTENANCE' ? 'メンテナンス中' : 'オフライン'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-400">
                {facility.count && (
                  <div className="flex justify-between">
                    <span>建設数:</span>
                    <span>{facility.count}</span>
                  </div>
                )}
                {facility.capacity && (
                  <div className="flex justify-between">
                    <span>収容可能:</span>
                    <span>{facility.capacity}</span>
                  </div>
                )}
                {facility.currentUsage && (
                  <div className="flex justify-between">
                    <span>現在の使用:</span>
                    <span>{facility.currentUsage}</span>
                  </div>
                )}
                {facility.production && (
                  <div className="flex justify-between">
                    <span>生産量:</span>
                    <span>{facility.production}</span>
                  </div>
                )}
                {facility.currentStorage && (
                  <div className="flex justify-between">
                    <span>保管量:</span>
                    <span>{facility.currentStorage}</span>
                  </div>
                )}
                {facility.output && (
                  <div className="flex justify-between">
                    <span>出力:</span>
                    <span>{facility.output}</span>
                  </div>
                )}
                {facility.consumption && (
                  <div className="flex justify-between">
                    <span>消費:</span>
                    <span>{facility.consumption}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </GameLayout>
  );
}