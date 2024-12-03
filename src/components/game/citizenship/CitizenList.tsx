import React, { useState } from 'react';
import { useCitizenshipStore } from '@/lib/store/citizenshipStore';
import { Shield, Award, Star, Search } from 'lucide-react';
import { CitizenDetailModal } from './CitizenDetailModal';
import type { Citizen } from '@/types/citizenship';

export const CitizenList = () => {
  const { citizens, updateCitizenStatus } = useCitizenshipStore();
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Citizen['status'] | 'ALL'>('ALL');

  const getStatusIcon = (status: Citizen['status']) => {
    switch (status) {
      case 'CITIZEN': return <Award className="w-4 h-4 text-green-500" />;
      case 'TRAINEE': return <Shield className="w-4 h-4 text-yellow-500" />;
      case 'CIVILIAN': return <Star className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredCitizens = citizens.filter(citizen => {
    const matchesSearch = citizen.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || citizen.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* 検索とフィルター */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="名前で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as Citizen['status'] | 'ALL')}
          className="bg-gray-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="ALL">すべての市民</option>
          <option value="CITIZEN">市民</option>
          <option value="TRAINEE">市民候補</option>
          <option value="CIVILIAN">一般居住者</option>
        </select>
      </div>

      {/* 市民リスト */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCitizens.map((citizen) => (
          <div
            key={citizen.id}
            onClick={() => setSelectedCitizen(citizen)}
            className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-lg">{citizen.name}</div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  {getStatusIcon(citizen.status)}
                  <span>
                    {citizen.status === 'CITIZEN' && '市民'}
                    {citizen.status === 'TRAINEE' && '市民候補'}
                    {citizen.status === 'CIVILIAN' && '一般居住者'}
                  </span>
                  {citizen.militaryService.started && (
                    <span className="text-blue-400">
                      • 軍務 {citizen.militaryService.yearsServed}/2年
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {Object.entries(citizen.contributions).map(([type, value]) => (
                  <div key={type} className="text-xs">
                    <div className="text-gray-400">{type}</div>
                    <div className="text-center">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 詳細モーダル */}
      {selectedCitizen && (
        <CitizenDetailModal
          citizen={selectedCitizen}
          onClose={() => setSelectedCitizen(null)}
          onUpdateStatus={(status) => {
            updateCitizenStatus(selectedCitizen.id, status);
            setSelectedCitizen(null);
          }}
        />
      )}
    </div>
  );
};