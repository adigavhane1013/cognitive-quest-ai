import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressData {
  streak: number;
  totalGames: number;
  badges: string[];
  weeklyScore: number;
  challenges: Array<{
    id: string;
    title: string;
    description: string;
    progress: number;
    total: number;
    completed: boolean;
  }>;
}

interface ProgressContextType {
  progress: ProgressData;
  updateProgress: (updates: Partial<ProgressData>) => void;
  addBadge: (badge: string) => void;
  incrementStreak: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressData>({
    streak: 0,
    totalGames: 0,
    badges: [],
    weeklyScore: 0,
    challenges: [
      {
        id: '1',
        title: 'Daily Brain Training',
        description: 'Complete 3 games today',
        progress: 0,
        total: 3,
        completed: false
      },
      {
        id: '2',
        title: 'Memory Master',
        description: 'Score 80% or higher in memory games',
        progress: 0,
        total: 1,
        completed: false
      }
    ]
  });

  const updateProgress = (updates: Partial<ProgressData>) => {
    setProgress(prev => ({ ...prev, ...updates }));
  };

  const addBadge = (badge: string) => {
    setProgress(prev => ({
      ...prev,
      badges: [...prev.badges, badge]
    }));
  };

  const incrementStreak = () => {
    setProgress(prev => ({
      ...prev,
      streak: prev.streak + 1
    }));
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress, addBadge, incrementStreak }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};