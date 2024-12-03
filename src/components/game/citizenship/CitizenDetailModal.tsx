import React from 'react';
import { Citizen } from '@/types/citizenship';
import { Shield, GraduationCap, Award, Star } from 'lucide-react';

interface CitizenDetailModalProps {
  citizen: Citizen;
  onClose: () => void;
  onUpdateStatus: (status: Citizen['status']) => void;
}

export const CitizenDetailModal = ({ citizen, onClose }: CitizenDetailModalProps) => {
  const getStatusColor = (status: Citizen['status']) => {
    switch (status) {
      case 'CITIZEN': return 'text-green-500';
      case 'TRAINEE': return 'text-yellow-500';
      case 'CIVILIAN': return 'text-gray-500';
      default: return '';
    }
  };

  const getStatusText = (status: Citizen['status']) => {
    switch (status) {
      case 'CITIZEN': return '市民';
      case 'TRAINEE': return '市民候補';
      case 'CIVILIAN': return '一般居住者';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 text-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{citizen.name}</h2>
              <div className={`flex items-center gap-2 ${getStatusColor(citizen.status)}`}>
                {citizen.status === 'CITIZEN' && <Award className="w-4 h-4" />}
                {citizen.status === 'TRAINEE' && <Shield className="w-4 h-4" />}
                {citizen.status === 'CIVILIAN' && <Star className="w-4 h-4" />}
                <span>{getStatusText(citizen.status)}</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 軍事サービス */}
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            軍事サービス
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>服務年数</span>
              <span>{citizen.militaryService.yearsServed} / 2 年</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((citizen.militaryService.yearsServed / 2) * 100, 100)}%` }}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className={citizen.militaryService.completed ? 'text-green-500' : 'text-yellow-500'}>
                {citizen.militaryService.completed ? '義務兵役完了' : '義務兵役中'}
              </span>
            </div>
          </div>
        </div>

        {/* 市民権要件 */}
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            市民権要件
          </h3>
          <div className="space-y-3">
            {citizen.requirements.map((req) => (
              <div key={req.id} className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={req.completed}
                  readOnly
                  className="w-4 h-4 rounded"
                />
                <div>
                  <div className="font-medium">{req.name}</div>
                  <div className="text-sm text-gray-400">{req.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 貢献度 */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5" />
            市民貢献度
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-400">軍事貢献</div>
              <div className="text-lg font-bold">{citizen.contributions.military}</div>
            </div>
            <div className="text-center p-3 bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-400">市民貢献</div>
              <div className="text-lg font-bold">{citizen.contributions.civil}</div>
            </div>
            <div className="text-center p-3 bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-400">研究貢献</div>
              <div className="text-lg font-bold">{citizen.contributions.research}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};