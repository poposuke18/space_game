// src/data/randomEvents.ts

import type { RandomEvent } from '@/types/events/random';

export const randomEvents: RandomEvent[] = [
  // 自然災害イベント
  {
    id: 'meteor_shower',
    title: '隕石群接近',
    category: '自然災害',
    description: '隕石群がコロニーに接近しています。防衛システムの強化が必要です。',
    probability: 0.15,
    choices: [
      {
        id: 'boost_defense',
        text: '防衛システムを強化する',
        effects: {
          resources: {
            CREDITS: -5000,
            ENERGY: -1000
          },
          support: 5,
          description: '市民は安全対策に満足しています'
        }
      },
      {
        id: 'minimal_defense',
        text: '最小限の対応に留める',
        effects: {
          resources: {
            CREDITS: -1000,
            ENERGY: -200
          },
          support: -10,
          description: '市民は安全対策の不足に不安を感じています'
        }
      }
    ]
  },
  {
    id: 'solar_flare',
    title: '太陽フレア警報',
    category: '自然災害',
    description: '大規模な太陽フレアが予測されています。シールドの強化が必要です。',
    probability: 0.12,
    choices: [
      {
        id: 'strengthen_shields',
        text: 'シールドを最大出力にする',
        effects: {
          resources: {
            ENERGY: -2000
          },
          support: 0,
          description: '施設は無事に保護されました'
        }
      },
      {
        id: 'partial_protection',
        text: '重要施設のみ保護する',
        effects: {
          resources: {
            ENERGY: -800,
            CREDITS: -1000
          },
          support: -5,
          description: '一部の施設に軽微な損害が発生しました'
        }
      }
    ]
  },

  // 異星生物イベント
  {
    id: 'bugs_activity',
    title: 'バグズの活動探知',
    category: '異星生物',
    description: '周辺でバグズの活動が探知されました。',
    probability: 0.15,
    choices: [
      {
        id: 'increase_patrol',
        text: '哨戒を強化する',
        effects: {
          resources: {
            MILITARY: -500,
            ENERGY: -500
          },
          support: 0,
          description: '追加の軍事パトロールを実施しています'
        }
      },
      {
        id: 'fortify',
        text: '防衛施設を強化する',
        effects: {
          resources: {
            CREDITS: -3000,
            ENERGY: -300
          },
          support: 5,
          description: '市民は積極的な防衛対策を評価しています'
        }
      }
    ]
  },
  {
    id: 'unknown_organism',
    title: '未知の生物反応',
    category: '異星生物',
    description: 'コロニー近郊で未知の生物反応が検出されました。',
    probability: 0.1,
    choices: [
      {
        id: 'research_organism',
        text: '調査チームを派遣',
        effects: {
          resources: {
            CREDITS: -2000,
            MILITARY: -200
          },
          support: 5,
          description: '新しい知見が得られました'
        }
      },
      {
        id: 'quarantine',
        text: '隔離区域を設定',
        effects: {
          resources: {
            ENERGY: -500
          },
          support: -5,
          description: '一部地域への立ち入りが制限されました'
        }
      }
    ]
  },

  // 社会イベント
  {
    id: 'citizen_initiative',
    title: '市民による自主活動',
    category: '社会',
    description: '市民たちが自主的なコミュニティ活動を始めました。',
    probability: 0.2,
    choices: [
      {
        id: 'support_initiative',
        text: '活動を支援する',
        effects: {
          resources: {
            CREDITS: -1000
          },
          support: 10,
          description: '市民の自主性が高まりました'
        }
      },
      {
        id: 'observe',
        text: '様子を見守る',
        effects: {
          resources: {},
          support: 3,
          description: '市民の間で絆が深まっています'
        }
      }
    ]
  },
  {
    id: 'cultural_festival',
    title: '文化祭の開催提案',
    category: '社会',
    description: '市民たちがコロニー文化祭の開催を提案しています。',
    probability: 0.15,
    choices: [
      {
        id: 'full_support',
        text: '全面的に支援する',
        effects: {
          resources: {
            CREDITS: -3000,
            ENERGY: -500
          },
          support: 15,
          description: '市民の士気が大きく向上しました'
        }
      },
      {
        id: 'minimal_support',
        text: '最小限の支援を行う',
        effects: {
          resources: {
            CREDITS: -1000
          },
          support: 5,
          description: '市民主導で文化祭が開催されます'
        }
      }
    ]
  },

  // 発見イベント
  {
    id: 'energy_breakthrough',
    title: 'エネルギー効率の改善',
    category: '発見',
    description: '研究チームが新しいエネルギー効率化技術を発見しました。',
    probability: 0.12,
    immediateEffects: {
      resources: {
        ENERGY: 1000,
        CREDITS: -2000
      },
      support: 5,
      description: 'エネルギー生産効率が向上しました'
    }
  },
  {
    id: 'resource_discovery',
    title: '地下資源の発見',
    category: '発見',
    description: 'コロニー地下で有用な資源が発見されました。',
    probability: 0.1,
    immediateEffects: {
      resources: {
        CREDITS: 5000
      },
      support: 8,
      description: '新たな資源による収入が期待できます'
    }
  },

  // 設備イベント
  {
    id: 'facility_malfunction',
    title: '施設の故障',
    category: '設備',
    description: '重要施設で深刻な故障が発生しました。',
    probability: 0.15,
    choices: [
      {
        id: 'immediate_repair',
        text: '緊急修理を実施',
        effects: {
          resources: {
            CREDITS: -4000,
            ENERGY: -500
          },
          support: 0,
          description: '施設は正常に復旧しました'
        }
      },
      {
        id: 'temporary_fix',
        text: '一時的な応急処置',
        effects: {
          resources: {
            CREDITS: -1000
          },
          support: -5,
          description: '完全な修復には時間がかかりそうです'
        }
      }
    ]
  }

  // 以下、今後実装予定のイベント（コメントアウト）
  /*
  // 貿易システム実装後に追加
  {
    id: 'trade_opportunity',
    title: '貿易機会の発生',
    category: '外交',
    description: '近隣コロニーから取引の申し出があります。',
    probability: 0.2,
    requires: ['TRADE_SYSTEM'],
    choices: [...]
  },

  // 研究システム実装後に追加
  {
    id: 'research_breakthrough',
    title: '研究ブレークスルー',
    category: '発見',
    description: '研究チームが画期的な発見をしました。',
    probability: 0.15,
    requires: ['RESEARCH_SYSTEM'],
    choices: [...]
  }
  */
];