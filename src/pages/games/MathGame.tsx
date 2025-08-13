
import { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

type Operation = "+" | "-" | "*" | "/";

const MathGame = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(true);
  const [currentProblem, setCurrentProblem] = useState<{
    num1: number;
    num2: number;
    operation: Operation;
    answer: number;
  } | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [problemCount, setProblemCount] = useState(0);

  useEffect(() => { document.title = "Math Challenge – MCI Cognitive Care"; }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
  }, [timeLeft, isRunning]);

  useEffect(() => {
    if (isRunning) {
      generateProblem();
    }
  }, [level, isRunning]);

  const generateProblem = () => {
    const operations: Operation[] = level >= 3 ? ["+", "-", "*", "/"] : level >= 2 ? ["+", "-", "*"] : ["+", "-"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1: number, num2: number, answer: number;
    
    if (level === 1) {
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
    } else if (level === 2) {
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
    } else {
      num1 = Math.floor(Math.random() * 100) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
    }

    switch (operation) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure positive result
        answer = num1 - num2;
        break;
      case "*":
        num1 = Math.floor(Math.random() * 12) + 2; // Smaller numbers for multiplication
        num2 = Math.floor(Math.random() * 12) + 2;
        answer = num1 * num2;
        break;
      case "/":
        answer = Math.floor(Math.random() * 12) + 2;
        num2 = Math.floor(Math.random() * 12) + 2;
        num1 = answer * num2; // Ensure clean division
        break;
      default:
        answer = num1 + num2;
    }

    setCurrentProblem({ num1, num2, operation, answer });
    setUserAnswer("");
    setFeedback("");
  };

  const handleSubmit = () => {
    if (!currentProblem || !userAnswer.trim()) return;

    const userNum = parseInt(userAnswer);
    if (userNum === currentProblem.answer) {
      setScore(s => s + level * 10 + streak * 2);
      setStreak(s => s + 1);
      setFeedback("Correct! 🎉");
      
      // Level up after 5 correct in a row
      if (streak >= 4 && level < 5) {
        setLevel(l => l + 1);
        setFeedback("Level up! 🚀");
      }
    } else {
      setStreak(0);
      setFeedback(`Incorrect. Answer was ${currentProblem.answer}`);
    }

    setProblemCount(c => c + 1);
    setTimeout(() => {
      if (isRunning) generateProblem();
    }, 1000);
  };

  const handleRestart = () => {
    setLevel(1);
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setIsRunning(true);
    setProblemCount(0);
    setFeedback("");
    generateProblem();
  };

  const accuracy = problemCount > 0 ? Math.round(((score / 10) / problemCount) * 100) : 0;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link to="/games" className="btn-secondary px-4 py-2 text-sm">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Games
              </Link>
              <Badge className="bg-orange-500 text-white">Scaling</Badge>
            </div>
            <Button className="btn-success" onClick={handleRestart}>
              <RefreshCw className="h-4 w-4 mr-2" /> Restart
            </Button>
          </div>

          <Card className="glass-card border-0 p-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>Math Challenge</span>
                <div className="flex gap-4 text-sm">
                  <span>⏳ Time: <strong>{timeLeft}s</strong></span>
                  <span>🎯 Level: <strong>{level}</strong></span>
                  <span>🔥 Streak: <strong>{streak}</strong></span>
                  <span>⭐ Score: <strong className="text-success">{score}</strong></span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {isRunning && currentProblem ? (
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Calculator className="h-6 w-6 text-orange-500" />
                    <span className="text-lg font-semibold">Solve the problem</span>
                  </div>

                  <div className="p-8 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl border border-orange-200">
                    <div className="text-4xl md:text-6xl font-bold text-orange-600 mb-6">
                      {currentProblem.num1} {currentProblem.operation} {currentProblem.num2} = ?
                    </div>
                    
                    <div className="flex gap-3 max-w-sm mx-auto">
                      <input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                        placeholder="Your answer"
                        className="flex-1 px-4 py-3 text-xl text-center rounded-lg border-2 border-orange-300 focus:outline-none focus:border-orange-500"
                        autoFocus
                      />
                      <Button onClick={handleSubmit} className="btn-primary text-lg px-6">
                        Submit
                      </Button>
                    </div>
                  </div>

                  {feedback && (
                    <div className={`p-4 rounded-lg text-lg font-semibold ${
                      feedback.includes("Correct") || feedback.includes("Level up") 
                        ? "bg-success/20 text-success" 
                        : "bg-warning/20 text-warning"
                    }`}>
                      {feedback}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold">Time's Up!</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto">
                    <div className="p-4 rounded-lg bg-glass/50">
                      <p className="text-sm text-muted-foreground">Final Score</p>
                      <p className="text-2xl font-bold text-success">{score}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-glass/50">
                      <p className="text-sm text-muted-foreground">Level</p>
                      <p className="text-2xl font-bold">{level}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-glass/50">
                      <p className="text-sm text-muted-foreground">Problems</p>
                      <p className="text-2xl font-bold">{problemCount}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-glass/50">
                      <p className="text-sm text-muted-foreground">Best Streak</p>
                      <p className="text-2xl font-bold text-orange-500">{streak}</p>
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

export default MathGame;
