import React from 'react';
import { useProgress } from '../../contexts/ProgressContext';
import { CheckCircle, Circle } from 'lucide-react';

const ChallengesPanel = () => {
  const { progress, updateProgress } = useProgress();

  const completeChallenge = (challengeId: string) => {
    const updatedChallenges = progress.challenges.map(challenge =>
      challenge.id === challengeId
        ? { ...challenge, completed: true, progress: challenge.total }
        : challenge
    );
    updateProgress({ challenges: updatedChallenges });
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h2 className="text-xl font-semibold text-foreground mb-4">Daily Challenges</h2>
      
      <div className="space-y-4">
        {progress.challenges.map((challenge) => (
          <div key={challenge.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {challenge.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <span className={`font-medium ${
                  challenge.completed ? 'text-green-500' : 'text-foreground'
                }`}>
                  {challenge.title}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {challenge.progress}/{challenge.total}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground ml-7">
              {challenge.description}
            </p>
            
            <div className="ml-7">
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                />
              </div>
            </div>
            
            {!challenge.completed && (
              <button
                onClick={() => completeChallenge(challenge.id)}
                className="ml-7 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Mark Complete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengesPanel;