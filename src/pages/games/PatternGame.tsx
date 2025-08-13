
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const COLORS = ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400", "bg-pink-400"];
const SHAPES = ["⭐", "●", "▲", "■", "♦", "♠"];

const generatePattern = (length: number) => {
  const pattern = [];
  for (let i = 0; i < length; i++) {
    pattern.push({
      color: COLORS[i % COLORS.length],
      shape: SHAPES[i % SHAPES.length],
      id: i
    });
  }
  return pattern;
};

const PatternGame = () => {
  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState(generatePattern(3));
  const [userPattern, setUserPattern] = useState<any[]>([]);
  const [showPattern, setShowPattern] = useState(true);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => { document.title = "Pattern Recognition – MCI Cognitive Care"; }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPattern(false);
    }, 2000 + level * 500);
    return () => clearTimeout(timer);
  }, [pattern, level]);

  const handleShapeClick = (shape: string, color: string) => {
    if (showPattern || isComplete) return;
    
    const newItem = { shape, color, id: userPattern.length };
    const newUserPattern = [...userPattern, newItem];
    setUserPattern(newUserPattern);

    const expectedItem = pattern[userPattern.length];
    if (shape === expectedItem.shape && color === expectedItem.color) {
      if (newUserPattern.length === pattern.length) {
        // Level complete
        setScore(s => s + level * 10);
        setFeedback("Perfect! Moving to next level...");
        setIsComplete(true);
        setTimeout(() => {
          setLevel(l => l + 1);
          setPattern(generatePattern(3 + level));
          setUserPattern([]);
          setShowPattern(true);
          setIsComplete(false);
          setFeedback("");
        }, 1500);
      }
    } else {
      setFeedback("Try again! Watch the pattern carefully.");
      setTimeout(() => {
        setUserPattern([]);
        setShowPattern(true);
        setFeedback("");
      }, 1000);
    }
  };

  const handleRestart = () => {
    setLevel(1);
    setPattern(generatePattern(3));
    setUserPattern([]);
    setShowPattern(true);
    setScore(0);
    setIsComplete(false);
    setFeedback("");
  };

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
              <Badge className="bg-accent text-accent-foreground">Progressive</Badge>
            </div>
            <Button className="btn-success" onClick={handleRestart}>
              <RefreshCw className="h-4 w-4 mr-2" /> Restart
            </Button>
          </div>

          <Card className="glass-card border-0 p-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>Pattern Recognition</span>
                <div className="flex gap-4 text-sm">
                  <span>🎯 Level: <strong>{level}</strong></span>
                  <span>⭐ Score: <strong className="text-success">{score}</strong></span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {showPattern ? (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    <span className="text-lg font-semibold">Memorize this pattern</span>
                  </div>
                  <div className="flex justify-center gap-4">
                    {pattern.map((item, idx) => (
                      <div 
                        key={idx}
                        className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center text-2xl text-white shadow-lg animate-pulse`}
                      >
                        {item.shape}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-lg font-semibold mb-2">Recreate the pattern</p>
                    <p className="text-muted-foreground">Click the shapes in the correct order</p>
                  </div>

                  {/* User's pattern so far */}
                  <div className="flex justify-center gap-4 min-h-[4rem]">
                    {userPattern.map((item, idx) => (
                      <div 
                        key={idx}
                        className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center text-2xl text-white shadow-lg`}
                      >
                        {item.shape}
                      </div>
                    ))}
                  </div>

                  {/* Shape selector */}
                  <div className="space-y-4">
                    <h3 className="text-center font-medium">Select shapes:</h3>
                    <div className="grid grid-cols-6 gap-3 max-w-sm mx-auto">
                      {SHAPES.map(shape => (
                        <div key={shape} className="space-y-2">
                          {COLORS.map(color => (
                            <button
                              key={`${shape}-${color}`}
                              onClick={() => handleShapeClick(shape, color)}
                              className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-lg text-white shadow-sm hover:scale-105 transition-transform`}
                            >
                              {shape}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {feedback && (
                <div className={`text-center p-4 rounded-lg ${
                  feedback.includes("Perfect") ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                }`}>
                  <p className="font-semibold">{feedback}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PatternGame;
