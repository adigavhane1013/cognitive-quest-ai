import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const randomDelay = () => 800 + Math.random() * 1200; // 0.8 - 2s

const ReactionGame = () => {
  const [round, setRound] = useState(0);
  const [status, setStatus] = useState<"idle" | "waiting" | "ready" | "toosoon" | "done">("idle");
  const [times, setTimes] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => { document.title = "Reaction Speed – MCI Cognitive Care"; }, []);

  const avg = useMemo(() => {
    if (times.length === 0) return 0;
    return Math.round(times.reduce((a, b) => a + b, 0) / times.length);
  }, [times]);

  const startRound = () => {
    setStatus("waiting");
    const delay = randomDelay();
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setStatus("ready");
      setStartTime(performance.now());
    }, delay);
  };

  const onClickArea = () => {
    if (status === "idle") {
      startRound();
      return;
    }
    if (status === "waiting") {
      // too soon
      window.clearTimeout(timeoutRef.current);
      setStatus("toosoon");
      return;
    }
    if (status === "ready") {
      const end = performance.now();
      const ms = Math.round(end - (startTime || end));
      setTimes((t) => [...t, ms]);
      const next = round + 1;
      setRound(next);
      if (next >= 5) {
        setStatus("done");
      } else {
        // start next round after short pause
        setStatus("idle");
        window.setTimeout(() => startRound(), 600);
      }
      return;
    }
    if (status === "toosoon") {
      setStatus("idle");
      startRound();
      return;
    }
    if (status === "done") {
      // restart
      handleRestart();
    }
  };

  const handleRestart = () => {
    setRound(0);
    setTimes([]);
    setStartTime(null);
    setStatus("idle");
  };

  const getLabel = () => {
    switch (status) {
      case "idle": return "Tap to begin";
      case "waiting": return "Wait for green...";
      case "ready": return "Tap!";
      case "toosoon": return "Too soon! Tap to try again";
      case "done": return `Done! Avg: ${avg} ms (tap to restart)`;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link to="/games" className="btn-secondary px-4 py-2 text-sm">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Games
            </Link>
            <div className="flex items-center gap-3">
              <Badge className="bg-success text-success-foreground">Speed</Badge>
              <Button className="btn-success" onClick={handleRestart}>
                <RefreshCw className="h-4 w-4 mr-2" /> Restart
              </Button>
            </div>
          </div>

          <Card className="glass-card border-0 p-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>Reaction Speed</span>
                <span className="text-sm">Round {Math.min(round + (status === 'done' ? 0 : 1), 5)} / 5</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl overflow-hidden">
                <button
                  onClick={onClickArea}
                  className={`w-full h-72 sm:h-80 md:h-96 text-2xl font-bold tracking-wide transition-colors duration-200 
                    ${status === 'ready' ? 'bg-success text-success-foreground' : ''}
                    ${status === 'waiting' ? 'bg-warning text-warning-foreground' : ''}
                    ${status === 'idle' ? 'bg-primary text-primary-foreground' : ''}
                    ${status === 'toosoon' ? 'bg-destructive text-destructive-foreground' : ''}
                    ${status === 'done' ? 'bg-secondary text-secondary-foreground' : ''}
                  `}
                >
                  {getLabel()}
                </button>
              </div>

              {times.length > 0 && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">Your times: {times.map(t => `${t}ms`).join(' • ')}</p>
                  {status === 'done' && (
                    <p className="text-lg font-semibold mt-2">Average Reaction: <span className="text-success">{avg} ms</span></p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ReactionGame;
