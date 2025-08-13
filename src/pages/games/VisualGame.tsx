
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface Shape {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  shape: "circle" | "square" | "triangle";
  target: boolean;
}

const COLORS = ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400", "bg-pink-400"];

const VisualGame = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isRunning, setIsRunning] = useState(true);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [targetCount, setTargetCount] = useState(0);
  const [found, setFound] = useState(0);
  const [round, setRound] = useState(1);

  useEffect(() => { document.title = "Visual Processing – MCI Cognitive Care"; }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
  }, [timeLeft, isRunning]);

  useEffect(() => {
    generateShapes();
  }, [level]);

  const generateShapes = () => {
    const shapeCount = Math.min(15 + level * 3, 30);
    const targetCount = Math.min(3 + Math.floor(level / 2), 8);
    const newShapes: Shape[] = [];

    // Generate target shapes (red circles)
    for (let i = 0; i < targetCount; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 80 + 5, // 5% to 85% to keep shapes in bounds
        y: Math.random() * 80 + 5,
        color: "bg-red-500",
        size: 20 + Math.random() * 15,
        shape: "circle",
        target: true
      });
    }

    // Generate distractor shapes
    for (let i = targetCount; i < shapeCount; i++) {
      const shapeTypes: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"];
      const availableColors = COLORS.filter(c => c !== "bg-red-400"); // Avoid red for distractors
      
      newShapes.push({
        id: i,
        x: Math.random() * 80 + 5,
        y: Math.random() * 80 + 5,
        color: availableColors[Math.floor(Math.random() * availableColors.length)],
        size: 15 + Math.random() * 20,
        shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        target: false
      });
    }

    setShapes(newShapes);
    setTargetCount(targetCount);
    setFound(0);
  };

  const handleShapeClick = (shape: Shape) => {
    if (!isRunning) return;

    if (shape.target) {
      setFound(f => f + 1);
      setScore(s => s + level * 5);
      setShapes(shapes => shapes.filter(s => s.id !== shape.id));
      
      // Check if all targets found
      if (found + 1 >= targetCount) {
        setLevel(l => l + 1);
        setRound(r => r + 1);
        setTimeout(() => generateShapes(), 500);
      }
    } else {
      setScore(s => Math.max(0, s - 5));
    }
  };

  const handleRestart = () => {
    setLevel(1);
    setScore(0);
    setTimeLeft(45);
    setIsRunning(true);
    setRound(1);
    generateShapes();
  };

  const renderShape = (shape: Shape) => {
    const baseClasses = `absolute cursor-pointer transition-transform hover:scale-110 ${shape.color}`;
    const style = {
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      width: `${shape.size}px`,
      height: `${shape.size}px`,
    };

    if (shape.shape === "circle") {
      return (
        <div
          key={shape.id}
          onClick={() => handleShapeClick(shape)}
          className={`${baseClasses} rounded-full`}
          style={style}
        />
      );
    } else if (shape.shape === "square") {
      return (
        <div
          key={shape.id}
          onClick={() => handleShapeClick(shape)}
          className={`${baseClasses} rounded-lg`}
          style={style}
        />
      );
    } else {
      return (
        <div
          key={shape.id}
          onClick={() => handleShapeClick(shape)}
          className={`${baseClasses}`}
          style={{
            ...style,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
          }}
        />
      );
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link to="/games" className="btn-secondary px-4 py-2 text-sm">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Games
              </Link>
              <Badge className="bg-teal-500 text-white">Dynamic</Badge>
            </div>
            <Button className="btn-success" onClick={handleRestart}>
              <RefreshCw className="h-4 w-4 mr-2" /> Restart
            </Button>
          </div>

          <Card className="glass-card border-0 p-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>Visual Processing</span>
                <div className="flex gap-4 text-sm">
                  <span>⏳ Time: <strong>{timeLeft}s</strong></span>
                  <span>🎯 Round: <strong>{round}</strong></span>
                  <span>🔴 Found: <strong>{found}/{targetCount}</strong></span>
                  <span>⭐ Score: <strong className="text-success">{score}</strong></span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {isRunning ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Eye className="h-5 w-5 text-teal-500" />
                      <span className="text-lg font-semibold">Find all the red circles</span>
                    </div>
                    <p className="text-muted-foreground">Click only the red circles as quickly as possible</p>
                  </div>

                  <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl border-2 border-teal-200 h-96 md:h-[500px] overflow-hidden">
                    {shapes.map(renderShape)}
                  </div>

                  <div className="text-center">
                    <p className="text-lg">
                      <span className="text-teal-600 font-bold">Target:</span> Find {targetCount} red circles
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Avoid clicking other shapes (they'll cost you points!)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold">Game Complete!</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto">
                    <div className="p-4 rounded-lg bg-glass/50">
                      <p className="text-sm text-muted-foreground">Final Score</p>
                      <p className="text-2xl font-bold text-success">{score}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-glass/50">
                      <p className="text-sm text-muted-foreground">Rounds</p>
                      <p className="text-2xl font-bold">{round}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-glass/50">
                      <p className="text-sm text-muted-foreground">Level</p>
                      <p className="text-2xl font-bold">{level}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-glass/50">
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                      <p className="text-2xl font-bold text-teal-500">
                        {score > 0 ? Math.round((score / (round * 50)) * 100) : 0}%
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <Button onClick={handleRestart} className="btn-primary">
                      <RefreshCw className="h-4 w-4 mr-2" /> Play Again
                    </Button>
                    <Link to="/games" className="btn-secondary px-6 py-3 inline-flex items-center">
                      <ArrowLeft className="h-4 w-4 mr-2" /> Choose Another Game
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VisualGame;
