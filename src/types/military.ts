// src/types/military.ts

export type TrainingType = 
  | 'BASIC_TRAINING'        // 基礎訓練
  | 'POWERED_SUIT'         // パワードスーツ訓練
  | 'TACTICS'              // 戦術訓練
  | 'SURVIVAL'             // サバイバル訓練
  | 'WEAPONS'              // 武器訓練
  | 'ALIEN_COMBAT';        // 異星生物戦闘訓練

export type TrainingLevel = 
  | 'NOT_STARTED'          // 未開始
  | 'IN_PROGRESS'          // 訓練中
  | 'COMPLETED'            // 完了
  | 'ADVANCED';            // 上級資格取得

export type TrainingCourse = {
  id: string;
  type: TrainingType;
  name: string;
  description: string;
  durationWeeks: number;  // 訓練期間（週単位）
  requiredForCitizenship: boolean;  // 市民権に必要か
  prerequisites: TrainingType[];  // 前提条件となる訓練
  level: TrainingLevel;
  progress: number;  // 0-100のパーセンテージ
};

export type TrainingRecord = {
  id: string;
  citizenId: string;
  courseId: string;
  startDate: string;
  completionDate?: string;
  performance: number;  // 0-100のスコア
  instructorNotes: string[];
  incidents: {
    date: string;
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
  }[];
};

export type Instructor = {
  id: string;
  name: string;
  rank: string;
  specialties: TrainingType[];
  yearsOfExperience: number;
};

export type TrainingFacility = {
  id: string;
  name: string;
  type: 'BASIC' | 'ADVANCED' | 'SPECIALIZED';
  capacity: number;
  currentTrainees: number;
  availableCourses: TrainingType[];
  status: 'OPERATIONAL' | 'MAINTENANCE' | 'OFFLINE';
};