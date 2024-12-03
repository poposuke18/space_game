// src/components/game/military/TrainingCourseDetailModal.tsx

import React from 'react';
import { 
  Shield, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Book, 
  Users,
  X 
} from 'lucide-react';
import type { TrainingCourse } from '@/types/military';

interface TrainingCourseDetailModalProps {
  course: TrainingCourse;
  onClose: () => void;
  onApply?: () => void;
}

export const TrainingCourseDetailModal = ({ 
  course, 
  onClose,
  onApply 
}: TrainingCourseDetailModalProps) => {
  const courseDetails = [
    {
      label: '訓練期間',
      value: `${course.durationWeeks}週間`,
      icon: <Clock className="w-5 h-5" />
    },
    {
      label: '市民権要件',
      value: course.requiredForCitizenship ? '必須' : '任意',
      icon: <Shield className="w-5 h-5" />
    },
    {
      label: '定員',
      value: '20名/クラス',
      icon: <Users className="w-5 h-5" />
    }
  ];

  const trainingContents = [
    '基本動作と規律訓練',
    '戦術理論の習得',
    '実戦シミュレーション',
    'チーム連携訓練',
    '非常時対応訓練'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="flex justify-between items-start p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">{course.name}</h2>
            <p className="text-gray-400 mt-1">{course.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* コース詳細情報 */}
        <div className="p-6 border-b border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courseDetails.map((detail, index) => (
              <div 
                key={index}
                className="bg-gray-700 p-4 rounded-lg flex items-center gap-3"
              >
                {detail.icon}
                <div>
                  <div className="text-sm text-gray-400">{detail.label}</div>
                  <div className="text-white font-medium">{detail.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 前提条件 */}
        {course.prerequisites.length > 0 && (
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">前提条件</h3>
                <ul className="space-y-2">
                  {course.prerequisites.map((prerequisite, index) => (
                    <li 
                      key={index}
                      className="flex items-center gap-2 text-gray-300"
                    >
                      <CheckCircle className="w-4 h-4 text-gray-500" />
                      {prerequisite}訓練の完了
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 訓練内容 */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-start gap-2">
            <Book className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">訓練内容</h3>
              <ul className="space-y-2">
                {trainingContents.map((content, index) => (
                  <li 
                    key={index}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {content}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="p-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={onApply}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            訓練申請
          </button>
        </div>
      </div>
    </div>
  );
};