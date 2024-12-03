// src/app/research/page.tsx

'use client';

import React from 'react';
import GameLayout from '@/components/game/layout/GameLayout';
import { 
  Microscope, 
  Shield, 
  Sprout, 
  Zap 
} from 'lucide-react';

export default function ResearchPage() {
  // 仮の研究プロジェクトデータ
  const projects = [
    {
      id: '1',
      name: '高効率エネルギー変換',
      category: 'ENERGY',
      description: 'エネルギー生産効率を20%向上させる新技術の研究',
      progress: 65,
      timeRemaining: 3,
      icon: <Zap className="w-5 h-5" />,
      status: 'IN_PROGRESS'
    },
    {
      id: '2',
      name: '先進農業システム',
      category: 'AGRICULTURE',
      description: '食料生産量を倍増させる水耕栽培技術の開発',
      progress: 30,
      timeRemaining: 5,
      icon: <Sprout className="w-5 h-5" />,
      status: 'IN_PROGRESS'
    },
    {
      id: '3',
      name: '新型パワードスーツ',
      category: 'MILITARY',
      description: '戦闘能力を大幅に向上させる次世代装備の開発',
      progress: 0,
      timeRemaining: 8,
      icon: <Shield className="w-5 h-5" />,
      status: 'NOT_STARTED'
    },
    {
      id: '4',
      name: '生体強化研究',
      category: 'MEDICAL',
      description: '宇宙環境での人体耐性を向上させる技術開発',
      progress: 45,
      timeRemaining: 4,
      icon: <Microscope className="w-5 h-5" />,
      status: 'IN_PROGRESS'
    }
  ];

  return (
    <GameLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">研究開発</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            新規プロジェクト
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {project.icon}
                  <div>
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <span className="text-sm text-gray-400">
                      残り {project.timeRemaining} ターン
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  進捗: {project.progress}%
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4">
                {project.description}
              </p>

              {/* 進捗バー */}
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              {/* アクションボタン */}
              <div className="mt-4 flex justify-end gap-2">
                {project.status === 'NOT_STARTED' ? (
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    研究開始
                  </button>
                ) : (
                  <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                    詳細
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </GameLayout>
  );
}