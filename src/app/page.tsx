'use client';

import GameLayout from '@/components/game/layout/GameLayout';
import { CitizenshipManagement } from '@/components/game/citizenship/CitizenshipManagement';

export default function Home() {
  return (
    <GameLayout>
      <CitizenshipManagement />
    </GameLayout>
  );
}