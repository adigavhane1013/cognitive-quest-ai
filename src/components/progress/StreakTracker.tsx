import React from 'react';
import { useProgress } from '../../contexts/ProgressContext';
import { Flame } from 'lucide-react';

const StreakTracker = () => {
  const { progress } = useProgress();

  return (
    <div className="flex items-center space-x-2">
      <Flame className="h-5 w-5 text-orange-500" />
      <div>
        <p className="text-lg font-semibold text-foreground">{progress.streak} days</p>
        <p className="text-sm text-muted-foreground">Current streak</p>
      </div>
    </div>
  );
};

export default StreakTracker;