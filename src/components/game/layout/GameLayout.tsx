// src/components/game/layout/GameLayout.tsx

import React from 'react';
import { useEventStore } from '@/lib/store/eventStore';
import { EventChoiceModal } from '../events/EventChoiceModal';
import { NavSidebar } from './NavSidebar';
import { StatusBar } from './StatusBar';
import { TurnControl } from '../turn/TurnControl';

const GameLayout = ({ children }: { children: React.ReactNode }) => {
  const { currentEvent, showEventChoice, closeEventChoice } = useEventStore();

  return (
    <div className="flex h-screen bg-background">
      <NavSidebar />
      
      <main className="flex-1 flex flex-col">
        <StatusBar />
        
        <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-800">
          {children}
        </div>

        <TurnControl />
      </main>

      {/* イベント選択モーダル */}
      {showEventChoice && currentEvent && (
        <EventChoiceModal
          event={currentEvent}
          onClose={closeEventChoice}
        />
      )}
    </div>
  );
};

export default GameLayout;