// src/components/game/military/TrainingCoursesList.tsx

'use client';

import React, { useState } from 'react';
import { TrainingCourseDetailModal } from './TrainingCourseDetailModal';
import { useMilitaryStore } from '@/lib/store/militaryStore';
import { Shield, Award, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import type { TrainingCourse } from '@/types/military';

export const TrainingCoursesList = () => {
  const { courses } = useMilitaryStore();
  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse | null>(null);

  const getStatusIcon = (level: TrainingCourse['level']) => {
    switch (level) {
      case 'NOT_STARTED':
        return <Clock className="w-5 h-5 text-gray-400" />;
      case 'IN_PROGRESS':
        return <Shield className="w-5 h-5 text-blue-500" />;
      case 'COMPLETED':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'ADVANCED':
        return <Award className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (level: TrainingCourse['level']) => {
    switch (level) {
      case 'NOT_STARTED': return '未開始';
      case 'IN_PROGRESS': return '訓練中';
      case 'COMPLETED': return '完了';
      case 'ADVANCED': return '上級資格取得';
      default: return '';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">訓練コース一覧</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{course.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusIcon(course.level)}
                  <span className="text-sm text-gray-300">
                    {getStatusText(course.level)}
                  </span>
                  {course.requiredForCitizenship && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      市民権必須
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">訓練期間</div>
                <div className="text-white">{course.durationWeeks}週間</div>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4">{course.description}</p>

            {course.prerequisites.length > 0 && (
              <div className="border-t border-gray-700 pt-4">
                <div className="flex items-center gap-2 text-sm text-yellow-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>前提条件: {course.prerequisites.join(', ')}</span>
                </div>
              </div>
            )}

            {course.level === 'IN_PROGRESS' && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>進捗</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

{/* コース詳細モーダル */}
{selectedCourse && (
        <TrainingCourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onApply={() => {
            // 訓練申請機能は次のステップで実装します
            console.log(`Apply for training: ${selectedCourse.name}`);
          }}
        />
      )}      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          {/* モーダルの内容は次のステップで実装します */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3>{selectedCourse.name}</h3>
            <button onClick={() => setSelectedCourse(null)}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
};