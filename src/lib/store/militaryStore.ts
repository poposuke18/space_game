// src/lib/store/militaryStore.ts

import { create } from 'zustand';
import type { 
  TrainingCourse, 
  TrainingRecord, 
  Instructor,
  TrainingFacility 
} from '@/types/military';

interface MilitaryTrainingState {
  courses: TrainingCourse[];
  records: TrainingRecord[];
  instructors: Instructor[];
  facilities: TrainingFacility[];
  
  // 訓練コース関連のアクション
  startTraining: (citizenId: string, courseId: string) => void;
  updateProgress: (citizenId: string, courseId: string, progress: number) => void;
  completeTraining: (citizenId: string, courseId: string, performance: number) => void;
  addInstructorNote: (recordId: string, note: string) => void;
  reportIncident: (recordId: string, description: string, severity: 'LOW' | 'MEDIUM' | 'HIGH') => void;
}

// サンプルデータ
const initialCourses: TrainingCourse[] = [
  {
    id: '1',
    type: 'BASIC_TRAINING',
    name: '基礎軍事訓練',
    description: '連邦軍の基礎訓練プログラム。すべての市民権志願者の必須課程。',
    durationWeeks: 8,
    requiredForCitizenship: true,
    prerequisites: [],
    level: 'NOT_STARTED',
    progress: 0
  },
  {
    id: '2',
    type: 'POWERED_SUIT',
    name: 'パワードスーツ操縦訓練',
    description: '戦闘用パワードスーツの操縦技術と戦術運用を学ぶ。',
    durationWeeks: 12,
    requiredForCitizenship: false,
    prerequisites: ['BASIC_TRAINING'],
    level: 'NOT_STARTED',
    progress: 0
  },
  {
    id: '3',
    type: 'ALIEN_COMBAT',
    name: '異星生物戦闘訓練',
    description: '様々な異星生物との戦闘に特化した訓練プログラム。',
    durationWeeks: 10,
    requiredForCitizenship: false,
    prerequisites: ['BASIC_TRAINING', 'POWERED_SUIT'],
    level: 'NOT_STARTED',
    progress: 0
  }
];

export const useMilitaryStore = create<MilitaryTrainingState>((set) => ({
  courses: initialCourses,
  records: [],
  instructors: [],
  facilities: [],

  startTraining: (citizenId, courseId) => set((state) => {
    const newRecord: TrainingRecord = {
      id: crypto.randomUUID(),
      citizenId,
      courseId,
      startDate: new Date().toISOString(),
      performance: 0,
      instructorNotes: [],
      incidents: []
    };

    return {
      records: [...state.records, newRecord],
      courses: state.courses.map(course =>
        course.id === courseId
          ? { ...course, level: 'IN_PROGRESS' as const, progress: 0 }
          : course
      )
    };
  }),

  updateProgress: (citizenId, courseId, progress) => set((state) => ({
    courses: state.courses.map(course =>
      course.id === courseId
        ? { ...course, progress }
        : course
    )
  })),

  completeTraining: (citizenId, courseId, performance) => set((state) => ({
    records: state.records.map(record =>
      record.citizenId === citizenId && record.courseId === courseId
        ? {
            ...record,
            completionDate: new Date().toISOString(),
            performance
          }
        : record
    ),
    courses: state.courses.map(course =>
      course.id === courseId
        ? { ...course, level: 'COMPLETED' as const, progress: 100 }
        : course
    )
  })),

  addInstructorNote: (recordId, note) => set((state) => ({
    records: state.records.map(record =>
      record.id === recordId
        ? { ...record, instructorNotes: [...record.instructorNotes, note] }
        : record
    )
  })),

  reportIncident: (recordId, description, severity) => set((state) => ({
    records: state.records.map(record =>
      record.id === recordId
        ? {
            ...record,
            incidents: [
              ...record.incidents,
              { date: new Date().toISOString(), description, severity }
            ]
          }
        : record
    )
  }))
}));