import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Brain, Clock, Star, CheckCircle, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Position {
  x: number;
  y: number;
}

interface PathStep {
  direction: "up" | "down" | "left" | "right";
  steps: number;
}

const SpatialGame = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<"menu" | "memorize" | "navigate" | "completed">("menu");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [path, setPath] = useState<PathStep[]>([]);
  const [currentPosition, setCurrentPosition] = useState<Position>({ x: 4, y: 4 });
  const [targetPosition, setTargetPosition] = useState<Position>({ x: 4, y: 4 });
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 4, y: 4 });
  const [showSolution, setShowSolution] = useState(false);
  const [levelsCompleted, setLevelsCompleted] = useState(0);

  const gridSize = 9;

  const generatePath = useCallback(() => {
    const directions: Array<"up" | "down" | "left" | "right"> = ["up", "down", "left", "right"];
    const steps = Math.min(3 + currentLevel, 6);
    const newPath: PathStep[] = [];
    let pos = { x: 4, y: 4 }; // Start in center

    for (let i = 0; i < steps; i++) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const stepCount = Math.floor(Math.random() * 2) + 1; // 1-2 steps
      
      // Check bounds
      let newPos = { ...pos };
      if (direction === "up" && newPos.y - stepCount >= 0) newPos.y -= stepCount;
      else if (direction === "down" && newPos.y + stepCount < gridSize) newPos.y += stepCount;
      else if (direction === "left" && newPos.x - stepCount >= 0) newPos.x -= stepCount;
      else if (direction === "right" && newPos.x + stepCount < gridSize) newPos.x += stepCount;
      else continue; // Skip if out of bounds

      newPath.push({ direction, steps: stepCount });
      pos = newPos;
    }

    setPath(newPath);
    setTargetPosition(pos);
    setCurrentPosition({ x: 4, y: 4 });
    setPlayerPosition({ x: 4, y: 4 });
  }, [currentLevel]);

  const startGame = () => {
    setGameState("memorize");
    setScore(0);
    setCurrentLevel(1);
    setLevelsCompleted(0);
    setTimeLeft(10);
    setShowSolution(false);
    generatePath();
  };

  const startNavigation = () => {
    setGameState("navigate");
    setTimeLeft(30);
    setShowSolution(false);
  };

  const movePlayer = (direction: "up" | "down" | "left" | "right") => {
    setPlayerPosition(prev => {
      const newPos = { ...prev };
      switch (direction) {
        case "up":
          if (newPos.y > 0) newPos.y--;
          break;
        case "down":
          if (newPos.y < gridSize - 1) newPos.y++;
          break;
        case "left":
          if (newPos.x > 0) newPos.x--;
          break;
        case "right":
          if (newPos.x < gridSize - 1) newPos.x++;
          break;
      }
      return newPos;
    });
  };

  const checkAnswer = () => {
    const distance = Math.abs(playerPosition.x - targetPosition.x) + Math.abs(playerPosition.y - targetPosition.y);
    const levelScore = Math.max(0, 100 - distance * 10);
    
    setScore(prev => prev + levelScore);
    setLevelsCompleted(prev => prev + 1);

    if (levelsCompleted + 1 >= 5) {
      setGameState("completed");
    } else {
      setCurrentLevel(prev => prev + 1);
      setTimeout(() => {
        generatePath();
        setGameState("memorize");
        setTimeLeft(10);
      }, 2000);
    }
  };

  useEffect(() => {
    if ((gameState === "memorize" || gameState === "navigate") && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === "memorize" && timeLeft === 0) {
      startNavigation();
    } else if (gameState === "navigate" && timeLeft === 0) {
      checkAnswer();
    }
  }, [gameState, timeLeft]);

  const getDirectionArrow = (direction: string) => {
    switch (direction) {
      case "up": return "↑";
      case "down": return "↓";
      case "left": return "←";
      case "right": return "→";
      default: return "";
    }
  };

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-cyan-50/30">
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
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-300 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Brain className="h-10 w-10 text-white" />
              </div>
              
              <h1 className="text-4xl font-bold mb-4">Spatial Navigation</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Train your spatial memory by following directions and navigating to target locations
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-glass/50">
                  <h3 className="font-semibold mb-2">Spatial Memory</h3>
                  <p className="text-sm text-muted-foreground">Remember navigation paths</p>
                </div>
                <div className="p-4 rounded-lg bg-glass/50">
                  <h3 className="font-semibold mb-2">3D Thinking</h3>
                  <p className="text-sm text-muted-foreground">Visualize spatial relationships</p>
                </div>
                <div className="p-4 rounded-lg bg-glass/50">
                  <h3 className="font-semibold mb-2">Route Planning</h3>
                  <p className="text-sm text-muted-foreground">Navigate efficiently</p>
                </div>
              </div>
              
              <Button onClick={startGame} className="btn-primary text-lg px-8 py-3">
                Start Navigation Challenge
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "completed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-cyan-50/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card p-8">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-success to-success-light w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Navigation Master!</h2>
              <p className="text-xl text-muted-foreground mb-6">
                You completed all spatial navigation challenges
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-lg bg-glass/50">
                  <h3 className="text-2xl font-bold text-success">{score}</h3>
                  <p className="text-muted-foreground">Total Score</p>
                </div>
                <div className="p-6 rounded-lg bg-glass/50">
                  <h3 className="text-2xl font-bold text-primary">{levelsCompleted}/5</h3>
                  <p className="text-muted-foreground">Levels Completed</p>
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-cyan-50/30">
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
              <span className="text-sm font-medium">Level {currentLevel} of 5</span>
              <span className="text-sm text-muted-foreground">
                {gameState === "memorize" ? "Memorize the path" : "Navigate to target"}
              </span>
            </div>
            <Progress value={(currentLevel / 5) * 100} className="h-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Instructions/Path Display */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-center">
                  {gameState === "memorize" ? "Memorize This Path" : "Follow the Path"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {gameState === "memorize" && (
                  <div className="space-y-3">
                    <p className="text-center text-muted-foreground mb-4">
                      Starting from center, follow these directions:
                    </p>
                    {path.map((step, index) => (
                      <div key={index} className="flex items-center justify-center gap-3 p-3 rounded-lg bg-glass/50">
                        <span className="text-2xl">{getDirectionArrow(step.direction)}</span>
                        <span className="font-semibold">
                          {step.direction.toUpperCase()} {step.steps} step{step.steps > 1 ? 's' : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {gameState === "navigate" && (
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Navigate to the target location using the arrow buttons below the grid.
                    </p>
                    <div className="p-4 rounded-lg bg-glass/50">
                      <p className="text-sm text-muted-foreground">Target Position</p>
                      <p className="font-bold">Row {targetPosition.y + 1}, Column {targetPosition.x + 1}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation Grid */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-center">Navigation Grid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-9 gap-1 mb-4 aspect-square">
                  {Array.from({ length: gridSize * gridSize }, (_, i) => {
                    const x = i % gridSize;
                    const y = Math.floor(i / gridSize);
                    const isStart = x === 4 && y === 4;
                    const isTarget = x === targetPosition.x && y === targetPosition.y;
                    const isPlayer = x === playerPosition.x && y === playerPosition.y;

                    return (
                      <div
                        key={i}
                        className={`
                          aspect-square rounded border-2 flex items-center justify-center text-xs font-bold
                          ${isStart ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white/50"}
                          ${isTarget && gameState === "navigate" ? "border-green-500 bg-green-100" : ""}
                          ${isPlayer && gameState === "navigate" ? "border-red-500 bg-red-100" : ""}
                        `}
                      >
                        {isStart && "S"}
                        {isTarget && gameState === "navigate" && "T"}
                        {isPlayer && gameState === "navigate" && "P"}
                      </div>
                    );
                  })}
                </div>

                {gameState === "navigate" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
                      <div></div>
                      <Button onClick={() => movePlayer("up")} variant="outline" className="p-2">
                        <Navigation className="h-4 w-4 rotate-0" />
                      </Button>
                      <div></div>
                      
                      <Button onClick={() => movePlayer("left")} variant="outline" className="p-2">
                        <Navigation className="h-4 w-4 -rotate-90" />
                      </Button>
                      <div className="flex items-center justify-center">
                        <span className="text-sm font-medium">Move</span>
                      </div>
                      <Button onClick={() => movePlayer("right")} variant="outline" className="p-2">
                        <Navigation className="h-4 w-4 rotate-90" />
                      </Button>
                      
                      <div></div>
                      <Button onClick={() => movePlayer("down")} variant="outline" className="p-2">
                        <Navigation className="h-4 w-4 rotate-180" />
                      </Button>
                      <div></div>
                    </div>

                    <Button onClick={checkAnswer} className="btn-primary w-full">
                      Submit Position
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpatialGame;