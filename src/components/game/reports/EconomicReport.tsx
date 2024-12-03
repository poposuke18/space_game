// src/components/game/reports/EconomicReport.tsx

'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useEconomyStore } from '@/lib/store/economyStore';

interface EconomicReportProps {
  showDetails?: boolean;
}

export const EconomicReport: React.FC<EconomicReportProps> = ({ showDetails = false }) => {
  const { 
    calculateDetailedIncome,
    calculateDetailedExpenses,
    taxRates,
    activePolicies
  } = useEconomyStore();

  const income = calculateDetailedIncome();
  const expenses = calculateDetailedExpenses();
  
  const totalIncome = Object.values(income).reduce((sum, val) => sum + val, 0);
  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
  const netProfit = totalIncome - totalExpenses;

  const formatNumber = (num: number) => {
    return num.toLocaleString() + ' Cr';
  };

  return (
    <div className="space-y-4">
      {/* 概要 */}
      <div className="flex items-start gap-3">
        {netProfit >= 0 
          ? <TrendingUp className="w-5 h-5 text-green-500" />
          : <TrendingDown className="w-5 h-5 text-red-500" />
        }
        <div>
          <h3 className="text-lg font-semibold">財務状況</h3>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div>
              <div className="text-sm text-gray-400">総収入</div>
              <div className="text-green-500">{formatNumber(totalIncome)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">総支出</div>
              <div className="text-red-500">{formatNumber(totalExpenses)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">純利益</div>
              <div className={netProfit >= 0 ? 'text-green-500' : 'text-red-500'}>
                {formatNumber(netProfit)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <>
          {/* 収入の内訳 */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">収入内訳:</h4>
            <div className="space-y-2">
              {Object.entries(income).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm">{key}</span>
                  <span className="text-green-500">{formatNumber(value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 支出の内訳 */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">支出内訳:</h4>
            <div className="space-y-2">
              {Object.entries(expenses).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm">{key}</span>
                  <span className="text-red-500">{formatNumber(value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 現在の税率 */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">現在の税率:</h4>
            <div className="space-y-2">
              {Object.values(taxRates).map((tax) => (
                <div key={tax.id} className="flex justify-between items-center">
                  <span className="text-sm">{tax.name}</span>
                  <span>{tax.rate}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* アクティブな経済政策 */}
          {activePolicies.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">
                アクティブな経済政策:
              </h4>
              <div className="space-y-2">
                {activePolicies.map((policy) => (
                  <div key={policy.id} className="text-sm">
                    <div className="font-medium">{policy.name}</div>
                    <div className="text-gray-400">{policy.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};