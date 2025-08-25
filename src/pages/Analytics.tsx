import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Brain, Clock, Target } from 'lucide-react';

const Analytics = () => {
  const performanceData = [
    { name: 'Mon', memory: 85, attention: 78, logic: 92 },
    { name: 'Tue', memory: 88, attention: 82, logic: 89 },
    { name: 'Wed', memory: 92, attention: 85, logic: 94 },
    { name: 'Thu', memory: 87, attention: 88, logic: 91 },
    { name: 'Fri', memory: 90, attention: 91, logic: 96 },
    { name: 'Sat', memory: 93, attention: 89, logic: 88 },
    { name: 'Sun', memory: 89, attention: 87, logic: 93 }
  ];

  const trendData = [
    { week: 'Week 1', score: 78 },
    { week: 'Week 2', score: 82 },
    { week: 'Week 3', score: 85 },
    { week: 'Week 4', score: 89 }
  ];

  const categoryData = [
    { name: 'Memory', value: 35, color: '#8884d8' },
    { name: 'Attention', value: 30, color: '#82ca9d' },
    { name: 'Logic', value: 25, color: '#ffc658' },
    { name: 'Processing', value: 10, color: '#ff7300' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track your cognitive performance and progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-foreground">89%</p>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">127</p>
              <p className="text-sm text-muted-foreground">Games Played</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-foreground">24h</p>
              <p className="text-sm text-muted-foreground">Total Time</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold text-foreground">15</p>
              <p className="text-sm text-muted-foreground">Streak Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Weekly Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }} 
              />
              <Bar dataKey="memory" fill="#8884d8" />
              <Bar dataKey="attention" fill="#82ca9d" />
              <Bar dataKey="logic" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Progress Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }} 
              />
              <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Game Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Cognitive Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h3 className="font-semibold text-primary mb-2">Memory Improvement</h3>
              <p className="text-sm text-muted-foreground">
                Your memory scores have improved by 15% over the last month. Keep practicing spatial memory exercises.
              </p>
            </div>
            
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <h3 className="font-semibold text-green-600 mb-2">Attention Focus</h3>
              <p className="text-sm text-muted-foreground">
                Excellent sustained attention performance. Your focus duration has increased significantly.
              </p>
            </div>
            
            <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <h3 className="font-semibold text-orange-600 mb-2">Logic Reasoning</h3>
              <p className="text-sm text-muted-foreground">
                Consider more challenging logic puzzles to continue improving your problem-solving skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;