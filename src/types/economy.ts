// src/types/economy.ts

export type IncomeSource = {
    id: string;
    name: string;
    baseAmount: number;
    multiplier: number;
    description: string;
  };
  
  export type ExpenseCategory = {
    id: string;
    name: string;
    baseAmount: number;
    multiplier: number;
    isRequired: boolean;  // 必須支出かどうか
    description: string;
  };
  
  export type TaxRate = {
    id: string;
    name: string;
    rate: number;  // パーセンテージ
    description: string;
    affectsSupport: number;  // 支持率への影響（-1.0 to 1.0）
  };
  
  export type EconomicPolicy = {
    id: string;
    name: string;
    description: string;
    effects: {
      incomeMultiplier?: number;
      expenseMultiplier?: number;
      supportChange?: number;
      resourceEffects?: {
        type: string;
        amount: number;
      }[];
    };
    isActive: boolean;
    duration?: number;  // 期間（ターン数）
  };
  
  export interface EconomyState {
    incomeSources: Record<string, IncomeSource>;
    expenseCategories: Record<string, ExpenseCategory>;
    taxRates: Record<string, TaxRate>;
    activePolicies: EconomicPolicy[];
    
    // 統計
    monthlyStats: {
      totalIncome: number;
      totalExpenses: number;
      netProfit: number;
      taxRevenue: number;
      tradeBalance: number;
    };
  }