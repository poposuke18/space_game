// src/app/citizens/page.tsx

'use client';

import React from 'react';
import GameLayout from '@/components/game/layout/GameLayout';
import { CitizenshipManagement } from '@/components/game/citizenship/CitizenshipManagement';

export default function CitizensPage() {
  return (
    <GameLayout>
      <CitizenshipManagement />
    </GameLayout>
  );
}