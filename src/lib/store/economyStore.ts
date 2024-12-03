// src/lib/store/economyStore.ts

import { create } from 'zustand';
import type { 
  EconomyState, 
  EconomicPolicy 
} from '@/types/economy';
import { useGameStore } from './gameStore';

interface EconomyStore extends EconomyState {
  // アクション
  setTaxRate: (id: string, newRate: number) => void;
  activatePolicy: (policy: EconomicPolicy) => void;
  deactivatePolicy: (policyId: string) => void;
  calculateDetailedIncome: () => Record<string, number>;
  calculateDetailedExpenses: () => Record<string, number>;
}

export const useEconomyStore = create<EconomyStore>((set, get) => ({
  // 収入源の定義
  incomeSources: {
    citizenTax: {
      id: 'citizenTax',
      name: '市民税',
      baseAmount: 10,  // 1人あたり10クレジット
      multiplier: 1.0,
      description: '市民一人あたりの基本税収'
    },
    corporateTax: {
      id: 'corporateTax',
      name: '法人税',
      baseAmount: 1000,  // 施設一つあたり1000クレジット
      multiplier: 1.0,
      description: '企業や施設からの税収'
    },
    tradeTax: {
      id: 'tradeTax',
      name: '貿易収入',
      baseAmount: 5000,
      multiplier: 1.0,
      description: '他のコロニーとの貿易による収入'
    }
  },

  // 支出カテゴリの定義
  expenseCategories: {
    maintenance: {
      id: 'maintenance',
      name: '施設維持費',
      baseAmount: 500,
      multiplier: 1.0,
      isRequired: true,
      description: '各施設の維持管理費用'
    },
    military: {
      id: 'military',
      name: '軍事費',
      baseAmount: 20,  // 1部隊あたり20クレジット
      multiplier: 1.0,
      isRequired: true,
      description: '軍事力の維持費用'
    },
    research: {
      id: 'research',
      name: '研究開発費',
      baseAmount: 5000,
      multiplier: 1.0,
      isRequired: false,
      description: '研究開発への投資'
    },
    welfare: {
      id: 'welfare',
      name: '福祉費',
      baseAmount: 5,  // 1人あたり5クレジット
      multiplier: 1.0,
      isRequired: true,
      description: '市民の福祉サービス費用'
    }
  },

  // 税率の定義
  taxRates: {
    citizenTax: {
      id: 'citizenTax',
      name: '市民税率',
      rate: 10,  // 10%
      description: '一般市民への課税率',
      affectsSupport: -0.5  // 税率が高いと支持率が下がる
    },
    corporateTax: {
      id: 'corporateTax',
      name: '法人税率',
      rate: 15,  // 15%
      description: '企業への課税率',
      affectsSupport: -0.3
    }
  },

  activePolicies: [],
  monthlyStats: {
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
    taxRevenue: 0,
    tradeBalance: 0
  },

  // アクションの実装
  setTaxRate: (id: string, newRate: number) => set(state => ({
    taxRates: {
      ...state.taxRates,
      [id]: {
        ...state.taxRates[id],
        rate: newRate
      }
    }
  })),

  activatePolicy: (policy: EconomicPolicy) => set(state => ({
    activePolicies: [...state.activePolicies, policy]
  })),

  deactivatePolicy: (policyId: string) => set(state => ({
    activePolicies: state.activePolicies.filter(p => p.id !== policyId)
  })),

  calculateDetailedIncome: () => {
    const state = get();
    const gameStore = useGameStore.getState();
    const detailedIncome: Record<string, number> = {};

    // 市民税収入の計算
    detailedIncome.citizenTax = 
      gameStore.resources.POPULATION.current * 
      state.incomeSources.citizenTax.baseAmount * 
      state.incomeSources.citizenTax.multiplier * 
      (state.taxRates.citizenTax.rate / 100);

    // 法人税収入の計算
    // TODO: 施設数に基づいて計算
    detailedIncome.corporateTax = 
      state.incomeSources.corporateTax.baseAmount * 
      state.incomeSources.corporateTax.multiplier * 
      (state.taxRates.corporateTax.rate / 100);

    // 貿易収入の計算
    detailedIncome.tradeTax = 
      state.incomeSources.tradeTax.baseAmount * 
      state.incomeSources.tradeTax.multiplier;

    // 政策による修正
    state.activePolicies.forEach(policy => {
      if (policy.effects.incomeMultiplier) {
        Object.keys(detailedIncome).forEach(key => {
          detailedIncome[key] *= policy.effects.incomeMultiplier || 1;
        });
      }
    });

    return detailedIncome;
  },

  calculateDetailedExpenses: () => {
    const state = get();
    const gameStore = useGameStore.getState();
    const detailedExpenses: Record<string, number> = {};

    // 施設維持費の計算
    // TODO: 実際の施設数に基づいて計算
    detailedExpenses.maintenance = 
      state.expenseCategories.maintenance.baseAmount * 
      state.expenseCategories.maintenance.multiplier;

    // 軍事費の計算
    detailedExpenses.military = 
      gameStore.resources.MILITARY.current * 
      state.expenseCategories.military.baseAmount * 
      state.expenseCategories.military.multiplier;

    // 研究開発費の計算
    detailedExpenses.research = 
      state.expenseCategories.research.baseAmount * 
      state.expenseCategories.research.multiplier;

    // 福祉費の計算
    detailedExpenses.welfare = 
      gameStore.resources.POPULATION.current * 
      state.expenseCategories.welfare.baseAmount * 
      state.expenseCategories.welfare.multiplier;

    // 政策による修正
    state.activePolicies.forEach(policy => {
      if (policy.effects.expenseMultiplier) {
        Object.keys(detailedExpenses).forEach(key => {
          detailedExpenses[key] *= policy.effects.expenseMultiplier || 1;
        });
      }
    });

    return detailedExpenses;
  }
}));