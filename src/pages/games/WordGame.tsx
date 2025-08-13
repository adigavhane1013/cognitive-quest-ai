
import { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const WORD_LISTS = {
  easy: ["cat", "dog", "sun", "car", "hat", "run", "big", "red"],
  medium: ["apple", "chair", "happy", "water", "green", "music", "laugh", "quick"],
  hard: ["elephant", "mountain", "beautiful", "adventure", "butterfly", "telephone", "wonderful", "remember"]
};

const WordGame = () => {
  const [level, setLevel] = useState<"easy" | "medium" | "hard">("easy");
  const [phase, setPhase] = useState<"study" | "recall" | "result">("study");
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [recalledWords, setRecalledWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [round, setRound] = useState(1);

  useEffect(() => { document.title = "Word Memory – MCI Cognitive Care"; }, []);

  const wordCount = useMemo(() => {
    return { easy: 4, medium: 6, hard: 8 }[level];
  }, [level]);

  const studyTime = useMemo(() => {
    return { easy: 10, medium: 15, hard: 20 }[level];
  }, [level]);

  useEffect(() => {
    startRound();
  }, [level]);

  useEffect(() => {
    if (phase === "study" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === "study" && timeLeft === 0) {
      setPhase("recall");
    }
  }, [timeLeft, phase]);

  const startRound = () => {
    const words = WORD_LISTS[level]
      .sort(() => Math.random() - 0.5)
      .slice(0, wordCount);
    setCurrentWords(words);
    setRecalledWords([]);
    setUserInput("");
    setPhase("study");
    setTimeLeft(studyTime);
  };

  const handleWordSubmit = () => {
    const word = userInput.trim().toLowerCase();
    if (word && !recalledWords.includes(word)) {
      if (currentWords.includes(word)) {
        setRecalledWords([...recalledWords, word]);
        setScore(s => s + 10);
      }
      setUserInput("");
    }
  };

  const handleFinishRecall = () => {
    setPhase("result");
  };

  const handleNextLevel = () => {
    if (level === "easy") setLevel("medium");
    else if (level === "medium") setLevel("hard");
    setRound(r => r + 1);
  };

  const handleRestart = () => {
    setLevel("easy");
    setRound(1);
    setScore(0);
    startRound();
  };

  const correctCount = recalledWords.filter(word => currentWords.includes(word)).length;
  const accuracy = currentWords.length > 0 ? Math.round((correctCount / currentWords.length) * 100) : 0;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link to="/games" className="btn-secondary px-4 py-2 text-sm">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Games
              </Link>
              <Badge className="bg-purple-500 text-white">Adaptive</Badge>
            </div>
            <Button className="btn-success" onClick={handleRestart}>
              <RefreshCw className="h-4 w-4 mr-2" /> Restart
            </Button>
          </div>

          <Card className="glass-card border-0 p-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>Word Memory</span>
                <div className="flex gap-4 text-sm">
                  <span>🎯 Round: <strong>{round}</strong></span>
                  <span>📚 Level: <strong className="capitalize">{level}</strong></span>
                  <span>⭐ Score: <strong className="text-success">{score}</strong></span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {phase === "study" && (
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Eye className="h-5 w-5 text-primary" />
                    <span className="text-lg font-semibold">Study these words</span>
                    <span className="text-2xl font-bold text-primary ml-4">⏱️ {timeLeft}s</span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
                    {currentWords.map((word, idx) => (
                      <div 
                        key={idx}
                        className="p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border border-glass-border"
                      >
                        <span className="text-lg font-semibold capitalize">{word}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {phase === "recall" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <EyeOff className="h-5 w-5 text-accent" />
                      <span className="text-lg font-semibold">Recall the words</span>
                    </div>
                    <p className="text-muted-foreground">Type the words you remember, one at a time</p>
                  </div>

                  <div className="flex gap-3 max-w-md mx-auto">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleWordSubmit()}
                      placeholder="Type a word..."
                      className="flex-1 px-4 py-3 rounded-lg border border-glass-border bg-glass/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button onClick={handleWordSubmit} className="btn-primary">
                      Add
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <p className="text-center text-sm text-muted-foreground">
                      Recalled: {recalledWords.length} words
                    </p>
                    
                    {recalledWords.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {recalledWords.map((word, idx) => (
                          <Badge 
                            key={idx}
                            className={`${currentWords.includes(word) ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}`}
                          >
                            {word}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="text-center">
                      <Button onClick={handleFinishRecall} className="btn-secondary">
                        Finish Recall
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {phase === "result" && (
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold">Round Complete!</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto">
                    <div className="p-4 rounded-lg bg-glass/50">
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                      <p className="text-2xl font-bold text-success">{accuracy}%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-glass/50">
                      <p className="text-sm text-muted-foreground">Correct</p>
                      <p className="text-2xl font-bold">{correctCount}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-glass/50">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold">{currentWords.length}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-glass/50">
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className="text-2xl font-bold text-success">{score}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Original words:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {currentWords.map((word, idx) => (
                        <Badge key={idx} variant="outline" className="bg-glass/30 border-glass-border">
                          {word}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <Button onClick={startRound} className="btn-primary">
                      <RefreshCw className="h-4 w-4 mr-2" /> Same Level
                    </Button>
                    {level !== "hard" && accuracy >= 70 && (
                      <Button onClick={handleNextLevel} className="btn-success">
                        Next Level
                      </Button>
                    )}
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

export default WordGame;
