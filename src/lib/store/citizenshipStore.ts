// src/lib/store/citizenshipStore.ts

import { create } from 'zustand';
import { Citizen, CitizenshipStats } from '@/types/citizenship';

interface CitizenshipState {
  citizens: Citizen[];
  stats: CitizenshipStats;
  addCitizen: (citizen: Omit<Citizen, 'id'>) => void;
  updateCitizenStatus: (citizenId: string, status: Citizen['status']) => void;
  updateMilitaryService: (citizenId: string, yearsServed: number) => void;
  updateRequirements: (citizenId: string, requirementId: string, completed: boolean) => void;
}

export const useCitizenshipStore = create<CitizenshipState>((set) => ({
  citizens: [
    {
      id: '1',
      name: 'ジョニー・リコ',
      status: 'CITIZEN',
      militaryService: {
        started: true,
        completed: true,
        yearsServed: 2,
      },
      requirements: [
        { id: '1', name: '基礎訓練', description: '軍事基礎訓練の完了', completed: true },
        { id: '2', name: '市民権試験', description: '連邦市民権試験の合格', completed: true },
        { id: '3', name: '憲法理解', description: '連邦憲法の理解と誓約', completed: true }
      ],
      votingRights: true,
      contributions: {
        military: 850,
        civil: 320,
        research: 150
      }
    },
    {
      id: '2',
      name: 'カーミー・イバーニェス',
      status: 'TRAINEE',
      militaryService: {
        started: true,
        completed: false,
        yearsServed: 1,
      },
      requirements: [
        { id: '1', name: '基礎訓練', description: '軍事基礎訓練の完了', completed: true },
        { id: '2', name: '市民権試験', description: '連邦市民権試験の合格', completed: false },
        { id: '3', name: '憲法理解', description: '連邦憲法の理解と誓約', completed: false }
      ],
      votingRights: false,
      contributions: {
        military: 450,
        civil: 200,
        research: 80
      }
    },
    {
      id: '3',
      name: 'エイス',
      status: 'CIVILIAN',
      militaryService: {
        started: false,
        completed: false,
        yearsServed: 0,
      },
      requirements: [
        { id: '1', name: '基礎訓練', description: '軍事基礎訓練の完了', completed: false },
        { id: '2', name: '市民権試験', description: '連邦市民権試験の合格', completed: false },
        { id: '3', name: '憲法理解', description: '連邦憲法の理解と誓約', completed: false }
      ],
      votingRights: false,
      contributions: {
        military: 0,
        civil: 150,
        research: 300
      }
    }
  ],
  
  stats: {
    totalPopulation: 20000,
    citizens: 5420,
    trainees: 2180,
    civilians: 12400,
  },

  addCitizen: (newCitizen) => set((state) => ({
    citizens: [...state.citizens, { ...newCitizen, id: crypto.randomUUID() }],
    stats: {
      ...state.stats,
      [newCitizen.status.toLowerCase() + 's']: state.stats[newCitizen.status.toLowerCase() + 's' as keyof CitizenshipStats] + 1,
      totalPopulation: state.stats.totalPopulation + 1,
    },
  })),

  updateCitizenStatus: (citizenId, newStatus) => set((state) => {
    const citizen = state.citizens.find(c => c.id === citizenId);
    if (!citizen) return state;

    const oldStatus = citizen.status.toLowerCase() + 's';
    const newStatusKey = newStatus.toLowerCase() + 's';

    return {
      citizens: state.citizens.map(c => 
        c.id === citizenId ? { ...c, status: newStatus } : c
      ),
      stats: {
        ...state.stats,
        [oldStatus]: state.stats[oldStatus as keyof CitizenshipStats] - 1,
        [newStatusKey]: state.stats[newStatusKey as keyof CitizenshipStats] + 1,
      },
    };
  }),

  updateMilitaryService: (citizenId, yearsServed) => set((state) => ({
    citizens: state.citizens.map(c => 
      c.id === citizenId 
        ? {
            ...c,
            militaryService: {
              ...c.militaryService,
              yearsServed,
              completed: yearsServed >= 2,
            },
          }
        : c
    ),
  })),

  updateRequirements: (citizenId, requirementId, completed) => set((state) => ({
    citizens: state.citizens.map(c =>
      c.id === citizenId
        ? {
            ...c,
            requirements: c.requirements.map(r =>
              r.id === requirementId ? { ...r, completed } : r
            ),
          }
        : c
    ),
  })),
}));