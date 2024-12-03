// src/components/game/citizenship/CitizenshipManagement.tsx

import React from 'react';
import { useCitizenshipStore } from '@/lib/store/citizenshipStore';
import { Users, Award, GraduationCap, Shield } from 'lucide-react';
import { CitizenList } from './CitizenList';
import { TrainingCoursesList } from '../military/TrainingCoursesList';

type TabType = 'overview' | 'citizens' | 'training';

export const CitizenshipManagement = () => {
    const { stats } = useCitizenshipStore();
    const [activeTab, setActiveTab] = React.useState<TabType>('overview');

  const citizenClasses = [
    {
      type: "市民",
      count: stats.citizens,
      description: "連邦軍での義務兵役を完了し、完全な市民権を持つ者",
      requirements: [
        "2年間の連邦軍での義務兵役",
        "市民権試験の合格",
        "憲法と歴史の理解"
      ],
      benefits: [
        "投票権",
        "公職就任権",
        "高度な教育へのアクセス",
        "コロニー政策への参加権"
      ],
      icon: <Award className="w-6 h-6" />
    },
    {
      type: "市民候補",
      count: stats.trainees,
      description: "現在義務兵役中または市民権取得過程にある者",
      requirements: [
        "基礎訓練の完了",
        "市民権予備試験の合格"
      ],
      benefits: [
        "市民権取得支援",
        "軍事訓練へのアクセス",
        "基本的な生活保障"
      ],
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      type: "一般居住者",
      count: stats.civilians,
      description: "コロニーの一般居住者",
      requirements: [
        "コロニー在住許可",
        "基本法の遵守"
      ],
      benefits: [
        "基本的な生活権",
        "職業選択の自由",
        "一般教育へのアクセス"
      ],
      icon: <Users className="w-6 h-6" />
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          概要
        </button>
        <button
          onClick={() => setActiveTab('citizens')}
          className={`px-4 py-2 rounded ${
            activeTab === 'citizens'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          市民管理
        </button>
        <button
          onClick={() => setActiveTab('training')}
          className={`px-4 py-2 rounded flex items-center gap-2 ${
            activeTab === 'training'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          <Shield className="w-4 h-4" />
          訓練
        </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">市民権管理システム</h2>
            <div className="text-sm text-gray-500">
              総人口: {stats.totalPopulation.toLocaleString()} 人
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {citizenClasses.map((citizenClass) => (
              <div key={citizenClass.type} 
                   className="bg-gray-800 text-white rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  {citizenClass.icon}
                  <div>
                    <h3 className="text-xl font-semibold">{citizenClass.type}</h3>
                    <p className="text-sm text-gray-300">
                      {citizenClass.count.toLocaleString()} 人
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-300">{citizenClass.description}</p>

                <div>
                  <h4 className="font-semibold mb-2">要件:</h4>
                  <ul className="text-sm space-y-1">
                    {citizenClass.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-blue-400 rounded-full" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">権利:</h4>
                  <ul className="text-sm space-y-1">
                    {citizenClass.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-green-400 rounded-full" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'citizens' ? (
        <CitizenList />
      ) : (
        <TrainingCoursesList />
      )}
    </div>
  );
};