import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Target, Clock, Star, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  description: string;
  priority: "high" | "medium" | "low";
  category: "urgent" | "important" | "routine";
  completed: boolean;
}

const ExecutiveGame = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<"menu" | "playing" | "completed">("menu");
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [roundsCompleted, setRoundsCompleted] = useState(0);

  const generateTasks = useCallback(() => {
    const taskDescriptions = [
      "Complete monthly report",
      "Schedule team meeting",
      "Reply to client email",
      "Update project timeline",
      "Review budget proposal",
      "Prepare presentation slides",
      "Call insurance company",
      "Order office supplies",
      "Plan vacation activities",
      "Organize desk files"
    ];

    const priorities: Array<"high" | "medium" | "low"> = ["high", "medium", "low"];
    const categories: Array<"urgent" | "important" | "routine"> = ["urgent", "important", "routine"];

    const newTasks: Task[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      description: taskDescriptions[Math.floor(Math.random() * taskDescriptions.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      completed: false
    }));

    setTasks(newTasks);
  }, []);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setCurrentRound(1);
    setRoundsCompleted(0);
    setTimeLeft(60);
    setSelectedTasks([]);
    generateTasks();
  };

  const toggleTaskSelection = (taskId: number) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const submitSelection = () => {
    const highPriorityTasks = tasks.filter(t => t.priority === "high");
    const urgentTasks = tasks.filter(t => t.category === "urgent");
    
    let roundScore = 0;
    selectedTasks.forEach(taskId => {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        if (task.priority === "high") roundScore += 15;
        else if (task.priority === "medium") roundScore += 10;
        else roundScore += 5;
        
        if (task.category === "urgent") roundScore += 10;
        else if (task.category === "important") roundScore += 5;
      }
    });

    setScore(prev => prev + roundScore);
    setRoundsCompleted(prev => prev + 1);

    if (roundsCompleted + 1 >= 3) {
      setGameState("completed");
    } else {
      setCurrentRound(prev => prev + 1);
      setTimeLeft(60);
      setSelectedTasks([]);
      generateTasks();
    }
  };

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      submitSelection();
    }
  }, [gameState, timeLeft]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "urgent": return "🔥";
      case "important": return "⭐";
      case "routine": return "📋";
      default: return "📄";
    }
  };

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-indigo-50/30">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/games")}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
          
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card p-8">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-300 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Target className="h-10 w-10 text-white" />
              </div>
              
              <h1 className="text-4xl font-bold mb-4">Executive Function</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Enhance your planning and decision-making skills by prioritizing tasks efficiently
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-glass/50">
                  <h3 className="font-semibold mb-2">Planning</h3>
                  <p className="text-sm text-muted-foreground">Organize tasks by priority</p>
                </div>
                <div className="p-4 rounded-lg bg-glass/50">
                  <h3 className="font-semibold mb-2">Decision Making</h3>
                  <p className="text-sm text-muted-foreground">Choose optimal strategies</p>
                </div>
                <div className="p-4 rounded-lg bg-glass/50">
                  <h3 className="font-semibold mb-2">Time Management</h3>
                  <p className="text-sm text-muted-foreground">Work within time limits</p>
                </div>
              </div>
              
              <Button onClick={startGame} className="btn-primary text-lg px-8 py-3">
                Start Planning Challenge
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "completed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-indigo-50/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card p-8">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-success to-success-light w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Excellent Planning!</h2>
              <p className="text-xl text-muted-foreground mb-6">
                You completed all planning challenges
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-lg bg-glass/50">
                  <h3 className="text-2xl font-bold text-success">{score}</h3>
                  <p className="text-muted-foreground">Total Score</p>
                </div>
                <div className="p-6 rounded-lg bg-glass/50">
                  <h3 className="text-2xl font-bold text-primary">{roundsCompleted}/3</h3>
                  <p className="text-muted-foreground">Rounds Completed</p>
                </div>
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button onClick={startGame} className="btn-primary">
                  Play Again
                </Button>
                <Button onClick={() => navigate("/games")} variant="outline">
                  Back to Games
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-indigo-50/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/games")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Games
            </Button>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-xl font-bold">{timeLeft}s</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-muted-foreground" />
                <span className="text-xl font-bold">{score}</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Round {currentRound} of 3</span>
              <span className="text-sm text-muted-foreground">{selectedTasks.length} tasks selected</span>
            </div>
            <Progress value={(currentRound / 3) * 100} className="h-2" />
          </div>

          {/* Instructions */}
          <Card className="glass-card mb-6">
            <CardHeader>
              <CardTitle className="text-center">Task Prioritization Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Select the 3-4 most important tasks to complete first. Consider priority levels and urgency categories.
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <Badge className="bg-red-500/10 text-red-600 border-red-200">High Priority</Badge>
                <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-200">Medium Priority</Badge>
                <Badge className="bg-green-500/10 text-green-600 border-green-200">Low Priority</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {tasks.map((task) => (
              <Card
                key={task.id}
                className={`glass-card cursor-pointer transition-all duration-200 ${
                  selectedTasks.includes(task.id)
                    ? "ring-2 ring-primary scale-105"
                    : "hover:scale-102"
                }`}
                onClick={() => toggleTaskSelection(task.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                      <span className="text-lg">{getCategoryIcon(task.category)}</span>
                    </div>
                    {selectedTasks.includes(task.id) && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  
                  <h3 className="font-semibold mb-2">{task.description}</h3>
                  
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      {task.priority} priority
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {task.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              onClick={submitSelection}
              className="btn-primary text-lg px-8 py-3"
              disabled={selectedTasks.length === 0}
            >
              Submit Selection ({selectedTasks.length} tasks)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveGame;