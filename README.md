# Space Colony Management Game

## 概要
このゲームは、ロバート・ハインラインの「宇宙の戦士」の世界観をベースにした宇宙コロニー管理シミュレーションゲームです。プレイヤーはコロニーの執政官となり、様々な勢力とのバランスを取りながらコロニーの存続を図ります。

### 主要な特徴
- 市民権制度に基づく社会管理
- リソース管理（人口、食料、エネルギーなど）
- 軍事訓練と異星生物への対応
- 月次のイベントシステム
- 経済システムと市民の支持率管理

## インストール方法

```bash
# リポジトリのクローン
git clone [repository-url]
cd space-colony-game

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## プロジェクト構造

```
space-colony-game/
├── src/
│   ├── app/          
│   │   ├── layout.tsx              # アプリケーションの基本レイアウト
│   │   └── page.tsx                # メインページ
│   │
│   ├── components/   
│   │   ├── game/    
│   │   │   ├── citizenship/        # 市民権システム関連
│   │   │   │   ├── CitizenshipManagement.tsx    # 市民権管理メイン画面
│   │   │   │   └── CitizenList.tsx              # 市民一覧表示
│   │   │   │
│   │   │   ├── events/            # イベントシステム関連
│   │   │   │   └── EventChoiceModal.tsx         # イベント選択モーダル
│   │   │   │
│   │   │   ├── layout/            # ゲームUI基本レイアウト
│   │   │   │   ├── GameLayout.tsx              # ゲーム画面の基本レイアウト
│   │   │   │   ├── NavSidebar.tsx             # サイドナビゲーション
│   │   │   │   ├── StatusBar.tsx              # 上部ステータスバー
│   │   │   │   └── TurnControl.tsx            # ターン管理コントロール
│   │   │   │
│   │   │   ├── military/          # 軍事システム関連
│   │   │   │   └── TrainingCoursesList.tsx    # 訓練コース一覧
│   │   │   │
│   │   │   └── reports/           # レポート表示システム
│   │   │       ├── MonthlyReportModal.tsx     # 月次レポートモーダル
│   │   │       └── EventHistory.tsx           # イベント履歴表示
│   │   │
│   │   └── ui/                    # 共通UIコンポーネント
│   │       ├── progress.tsx             # プログレスバー
│   │       └── [その他UIコンポーネント]
│   │
│   ├── data/                      # ゲームデータ
│   │   └── randomEvents.ts        # ランダムイベントの定義
│   │
│   ├── lib/                       # ユーティリティと状態管理
│   │   ├── store/                 # Zustandストア
│   │   │   ├── economyStore.ts    # 経済システムの状態管理
│   │   │   ├── eventStore.ts      # イベントシステムの状態管理
│   │   │   ├── gameStore.ts       # ゲーム全体の状態管理
│   │   │   └── turnStore.ts       # ターン管理の状態管理
│   │   │
│   │   └── utils/                 # ユーティリティ関数
│   │       └── index.ts           # 共通ユーティリティ
│   │
│   └── types/                     # 型定義
│       ├── events.ts              # イベント関連の基本型定義
│       ├── economy.ts             # 経済システムの型定義
│       └── events/
│           └── random.ts          # ランダムイベントの型定義
│
├── public/                        # 静的ファイル
│
├── config/                        # 設定ファイル
│   ├── tsconfig.json             # TypeScript設定
│   └── tailwind.config.js        # Tailwind CSS設定
│
└── docs/                          # ドキュメント
    ├── README.md                  # プロジェクト概要
    ├── TECHNICAL.md              # 技術的な詳細
    └── GAME_SYSTEMS.md           # ゲームシステムの詳細
```

以下、重要なファイルの役割説明：

### コアコンポーネント
- `GameLayout.tsx`: ゲーム画面全体のレイアウトを管理
- `StatusBar.tsx`: リソース状態の表示を担当
- `TurnControl.tsx`: 月の進行とアクション管理を制御

### ステート管理
- `gameStore.ts`: ゲームの基本状態（リソース、ステータス）を管理
- `turnStore.ts`: ターン進行とイベント管理を制御
- `economyStore.ts`: 経済システムの状態を管理
- `eventStore.ts`: イベントの状態と処理を管理

### イベントシステム
- `randomEvents.ts`: 発生可能なイベントのデータ定義
- `EventChoiceModal.tsx`: イベント選択UIの実装
- `MonthlyReportModal.tsx`: 月次報告の表示を担当

### 市民権システム
- `CitizenshipManagement.tsx`: 市民権管理の中央画面
- `CitizenList.tsx`: 市民の一覧表示と管理

これらのファイルが連携して、ターンベースの宇宙コロニー管理シミュレーションを実現しています。それぞれのコンポーネントとストアは密接に連携しながらも、責務を明確に分離しています。


```

## 技術スタック
- Framework: Next.js 15.0.3
- Language: TypeScript
- State Management: Zustand
- Styling: Tailwind CSS
- UI Components: カスタムコンポーネント
- Icons: Lucide React

## 主要な機能

### 市民権システム
- 3段階の市民区分（市民、市民候補、一般居住者）
- 市民権取得のための要件管理
- 軍事訓練との連携

### リソース管理
- 人口管理
- 食料供給
- エネルギー生産
- 軍事力
- 市民支持率
- クレジット（通貨）

### イベントシステム
- ランダムイベントの発生
- プレイヤーの選択による結果の分岐
- 即時効果と長期的な影響の管理

### 経済システム
- 収入源の管理（税収、貿易など）
- 支出の管理（維持費、開発費など）
- 市民支持率への影響

## 詳細な仕様
- [技術的な詳細](./docs/TECHNICAL.md)
- [ゲームシステムの詳細](./docs/GAME_SYSTEMS.md)

## ゲームオーバー条件
- 人口が0になった場合
- 重要施設が全滅した場合
- 異星生物による完全占拠
- その他、段階的な崩壊条件あり

## 開発状況
現在実装済みの機能：
- 基本的なゲームループ（月次進行）
- リソース管理システム
- イベントシステム
- 市民権管理の基本機能
- 経済システムの基礎

開発中の機能：
- 施設建設システム
- 外交システム
- 研究開発システム
- 詳細な軍事システム

## ライセンス
[ライセンス情報を記載]