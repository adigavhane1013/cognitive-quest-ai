import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const AttentionGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(true);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const areaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { document.title = "Attention Focus – MCI Cognitive Care"; }, []);

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 0) { setIsRunning(false); return; }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const parent = areaRef.current?.getBoundingClientRect();
      const width = parent ? parent.width : 600;
      const height = parent ? parent.height : 360;
      const size = 56;
      const x = rand(0, width - size);
      const y = rand(0, height - size);
      setPos({ x, y });
    }, 900);
    return () => clearInterval(interval);
  }, [isRunning]);

  const onHit = () => {
    if (!isRunning) return;
    setScore((s) => s + 1);
    // small speed up every 5 hits could be added here
  };

  const handleRestart = () => {
    setScore(0);
    setTimeLeft(30);
    setIsRunning(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link to="/games" className="btn-secondary px-4 py-2 text-sm">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Games
            </Link>
            <div className="flex items-center gap-3">
              <Badge className="bg-secondary text-secondary-foreground">Focus</Badge>
              <Button className="btn-success" onClick={handleRestart}>
                <RefreshCw className="h-4 w-4 mr-2" /> Restart
              </Button>
            </div>
          </div>

          <Card className="glass-card border-0 p-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex flex-wrap items-center gap-4 justify-between">
                <span>Attention Focus</span>
                <div className="flex gap-4 text-sm">
                  <span>⏳ Time: <strong>{timeLeft}s</strong></span>
                  <span>⭐ Score: <strong className="text-success">{score}</strong></span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                ref={areaRef}
                className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/20 overflow-hidden"
              >
                {/* Target */}
                <button
                  onClick={onHit}
                  aria-label="focus-target"
                  style={{ left: pos.x, top: pos.y }}
                  className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-success to-success-light shadow-lg border-2 border-success/50 hover:scale-105 transition-transform"
                />
              </div>

              {!isRunning && (
                <div className="mt-6 p-6 text-center rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-glass-border">
                  <h3 className="text-2xl font-bold mb-2">Great Focus!</h3>
                  <p className="text-muted-foreground mb-4">You clicked <span className="text-success font-semibold">{score}</span> targets.</p>
                  <div className="flex gap-3 justify-center">
                    <Button className="btn-primary" onClick={handleRestart}>Play Again</Button>
                    <Link to="/games" className="btn-secondary px-6 py-3 inline-flex items-center">Choose Another Game</Link>
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

export default AttentionGame;
