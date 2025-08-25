import React from 'react';
import { useProgress } from '../../contexts/ProgressContext';
import { Award } from 'lucide-react';

const AchievementsBadges = () => {
  const { progress } = useProgress();

  const allBadges = [
    { id: 'first-game', name: 'First Steps', description: 'Complete your first game' },
    { id: 'week-streak', name: 'Week Warrior', description: '7-day streak' },
    { id: 'memory-master', name: 'Memory Master', description: 'Excel in memory games' },
    { id: 'logic-guru', name: 'Logic Guru', description: 'Excel in logic puzzles' }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Award className="h-5 w-5 text-primary" />
        <span className="font-medium text-foreground">Badges Earned: {progress.badges.length}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {allBadges.map((badge) => {
          const isEarned = progress.badges.includes(badge.id);
          return (
            <div
              key={badge.id}
              className={`p-2 rounded-md border text-center ${
                isEarned 
                  ? 'bg-primary/10 border-primary text-primary' 
                  : 'bg-muted border-border text-muted-foreground'
              }`}
            >
              <div className="text-xs font-medium">{badge.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsBadges;