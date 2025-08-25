import React from 'react';
import { useProgress } from '../contexts/ProgressContext';
import StreakTracker from './progress/StreakTracker';
import AchievementsBadges from './progress/AchievementsBadges';
import ChallengesPanel from './challenges/ChallengesPanel';
import { Play, Trophy, Target } from 'lucide-react';

const Dashboard = () => {
  const { progress } = useProgress();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to Cognitive Quest AI
        </h1>
        <p className="text-muted-foreground">
          Train your brain with personalized cognitive exercises
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center space-x-3 mb-4">
            <Play className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Quick Start</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Jump into a brain training session
          </p>
          <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
            Start Training
          </button>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center space-x-3 mb-4">
            <Trophy className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Progress</h2>
          </div>
          <StreakTracker />
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Total Games: {progress.totalGames}</p>
            <p className="text-sm text-muted-foreground">Weekly Score: {progress.weeklyScore}</p>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Achievements</h2>
          </div>
          <AchievementsBadges />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChallengesPanel />
        
        <div className="bg-card rounded-lg p-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Memory Challenge</span>
              <span className="text-sm text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Logic Puzzle</span>
              <span className="text-sm text-muted-foreground">1 day ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Attention Training</span>
              <span className="text-sm text-muted-foreground">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;