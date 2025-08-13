import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Zap, Clock, Star, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Symbol {
  id: number;
  shape: string;
  number: number;
  matched: boolean;
}

const ProcessingGame = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<"menu" | "playing" | "completed">("menu");
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [targetSymbol, setTargetSymbol] = useState<Symbol | null>(null);
  const [correctMatches, setCorrectMatches] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [streakCount, setStreakCount] = useState(0);

  const shapes = ["●", "■", "▲", "♦", "★", "♠", "♥", "♣"];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const generateSymbols = useCallback(() => {
    const symbolCount = Math.min(12 + currentRound * 2, 24);
    const newSymbols: Symbol[] = [];

    for (let i = 0; i < symbolCount; i++) {
      newSymbols.push({
        id: i,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        number: numbers[Math.floor(Math.random() * numbers.length)],
        matched: false
      });
    }

    // Ensure there's at least one target symbol
    const targetIndex = Math.floor(Math.random() * newSymbols.length);
    const target = { ...newSymbols[targetIndex] };
    
    // Add 2-3 more matching symbols
    const matchCount = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < matchCount; i++) {
      const randomIndex = Math.floor(Math.random() * newSymbols.length);
      newSymbols[randomIndex] = {
        ...newSymbols[randomIndex],
        shape: target.shape,
        number: target.number
      };
    }

    setSymbols(newSymbols);
    setTargetSymbol(target);
  }, [currentRound]);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setCurrentRound(1);
    setRoundsCompleted(0);
    setCorrectMatches(0);
    setStreakCount(0);
    setTimeLeft(60);
    generateSymbols();
  };

  const handleSymbolClick = (symbolId: number) => {
    const clickedSymbol = symbols.find(s => s.id === symbolId);
    if (!clickedSymbol || clickedSymbol.matched || !targetSymbol) return;

    const isMatch = clickedSymbol.shape === targetSymbol.shape && 
                   clickedSymbol.number === targetSymbol.number;

    setSymbols(prev => prev.map(s => 
      s.id === symbolId ? { ...s, matched: true } : s
    ));

    if (isMatch) {
      setCorrectMatches(prev => prev + 1);
      setStreakCount(prev => prev + 1);
      setScore(prev => prev + (10 * Math.max(1, streakCount / 3)));
    } else {
      setStreakCount(0);
      setScore(prev => Math.max(0, prev - 5));
    }

    // Check if all matching symbols are found
    const allMatches = symbols.filter(s => 
      s.shape === targetSymbol.shape && s.number === targetSymbol.number
    ).length;
    
    if (correctMatches + 1 >= allMatches) {
      setTimeout(() => {
        nextRound();
      }, 1000);
    }
  };

  const nextRound = () => {
    setRoundsCompleted(prev => prev + 1);
    
    if (roundsCompleted + 1 >= 5) {
      setGameState("completed");
    } else {
      setCurrentRound(prev => prev + 1);
      setCorrectMatches(0);
      setTimeLeft(60);
      generateSymbols();
    }
  };

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      nextRound();
    }
  }, [gameState, timeLeft]);

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-rose-50/30">
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
              <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-300 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Zap className="h-10 w-10 text-white" />
              </div>
              
              <h1 className="text-4xl font-bold mb-4">Processing Speed</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Boost your cognitive processing speed with fast symbol matching challenges
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-glass/50">
                  <h3 className="font-semibold mb-2">Symbol Matching</h3>
                  <p className="text-sm text-muted-foreground">Match target symbols quickly</p>
                </div>
                <div className="p-4 rounded-lg bg-glass/50">
                  <h3 className="font-semibold mb-2">Processing Speed</h3>
                  <p className="text-sm text-muted-foreground">Think and react faster</p>
                </div>
                <div className="p-4 rounded-lg bg-glass/50">
                  <h3 className="font-semibold mb-2">Mental Speed</h3>
                  <p className="text-sm text-muted-foreground">Build cognitive efficiency</p>
                </div>
              </div>
              
              <Button onClick={startGame} className="btn-primary text-lg px-8 py-3">
                Start Speed Challenge
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "completed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-rose-50/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card p-8">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-success to-success-light w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Lightning Fast!</h2>
              <p className="text-xl text-muted-foreground mb-6">
                You completed all processing speed challenges
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-lg bg-glass/50">
                  <h3 className="text-2xl font-bold text-success">{score}</h3>
                  <p className="text-muted-foreground">Total Score</p>
                </div>
                <div className="p-6 rounded-lg bg-glass/50">
                  <h3 className="text-2xl font-bold text-primary">{roundsCompleted}/5</h3>
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-rose-50/30">
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
              <span className="text-sm font-medium">Round {currentRound} of 5</span>
              <span className="text-sm text-muted-foreground">
                Streak: {streakCount} | Matches: {correctMatches}
              </span>
            </div>
            <Progress value={(currentRound / 5) * 100} className="h-2" />
          </div>

          {/* Target Symbol */}
          {targetSymbol && (
            <Card className="glass-card mb-6">
              <CardHeader>
                <CardTitle className="text-center">Find All Matching Symbols</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-primary-light text-white text-3xl font-bold mb-4">
                    {targetSymbol.shape}{targetSymbol.number}
                  </div>
                  <p className="text-muted-foreground">
                    Click all symbols that match: <strong>{targetSymbol.shape}{targetSymbol.number}</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Symbols Grid */}
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {symbols.map((symbol) => (
              <Button
                key={symbol.id}
                variant="outline"
                className={`
                  aspect-square p-0 text-2xl font-bold transition-all duration-200
                  ${symbol.matched 
                    ? (symbol.shape === targetSymbol?.shape && symbol.number === targetSymbol?.number
                        ? "bg-success text-white border-success scale-110" 
                        : "bg-destructive text-white border-destructive scale-90 opacity-50")
                    : "hover:scale-105 hover:shadow-lg"
                  }
                `}
                onClick={() => handleSymbolClick(symbol.id)}
                disabled={symbol.matched}
              >
                {symbol.shape}{symbol.number}
              </Button>
            ))}
          </div>

          {/* Game Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success">{correctMatches}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{streakCount}</div>
                <div className="text-sm text-muted-foreground">Streak</div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">{Math.round(score / Math.max(1, currentRound))}</div>
                <div className="text-sm text-muted-foreground">Avg/Round</div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-secondary">{currentRound}</div>
                <div className="text-sm text-muted-foreground">Level</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingGame;