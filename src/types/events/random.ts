// src/types/events/random.ts

export type RandomEventCategory = 
  | '自然災害'        // 隕石、太陽フレアなど
  | '異星生物'        // バグズの活動
  | '社会'           // 市民の活動、デモなど
  | '設備'           // 施設の事故や故障
  | '発見'           // 新技術や資源の発見
  | '外交';          // 他コロニーとの関係

export type EventChoice = {
  id: string;
  text: string;
  effects: {
    resources: { [key: string]: number };
    support?: number;
    description: string;
  };
};

export interface RandomEvent {
  id: string;
  title: string;
  category: RandomEventCategory;
  description: string;
  probability: number;        // 0-1の発生確率
  condition?: {              // イベントの発生条件
    resources?: { [key: string]: number };
    turn?: number;
    requiredEvents?: string[];
  };
  choices?: EventChoice[];    // プレイヤーの選択肢
  immediateEffects?: {       // 即時効果（選択肢なし）
    resources: { [key: string]: number };
    support?: number;
    description: string;
  };
}