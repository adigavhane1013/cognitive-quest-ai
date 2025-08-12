import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface CardItem {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

const EMOJIS = ["🍎","🍊","🍇","🍉","🍌","🍒","🧠","⭐","🌙","🌸","🍀","🎈"];

const createDeck = (pairs: number): CardItem[] => {
  const selected = EMOJIS.slice(0, pairs);
  const deckValues = [...selected, ...selected];
  // shuffle
  for (let i = deckValues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deckValues[i], deckValues[j]] = [deckValues[j], deckValues[i]];
  }
  return deckValues.map((v, idx) => ({ id: idx, value: v, flipped: false, matched: false }));
};

const MemoryGame = () => {
  const [pairs, setPairs] = useState(6);
  const [deck, setDeck] = useState<CardItem[]>(() => createDeck(6));
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => { document.title = "Memory Matching – MCI Cognitive Care"; }, []);

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 0) { setIsRunning(false); return; }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, isRunning]);

  const allMatched = useMemo(() => deck.every(c => c.matched), [deck]);

  useEffect(() => {
    if (allMatched) setIsRunning(false);
  }, [allMatched]);

  const onCardClick = (idx: number) => {
    if (!isRunning) return;
    const card = deck[idx];
    if (card.flipped || card.matched) return;

    const newDeck = deck.map((c, i) => i === idx ? { ...c, flipped: true } : c);
    const newSelected = [...selected, idx];
    setDeck(newDeck);
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newSelected;
      const ca = newDeck[a];
      const cb = newDeck[b];
      if (ca.value === cb.value) {
        // Match
        setTimeout(() => {
          setDeck(prev => prev.map((c,i) => (i===a || i===b) ? { ...c, matched: true } : c));
          setMatches(m => m + 1);
          setScore(s => s + 10);
          setSelected([]);
          // Simple adaptive tweak: increase pairs when doing well
          if (matches + 1 === pairs && pairs < 8) {
            setPairs(p => p + 1);
          }
        }, 400);
      } else {
        setScore(s => Math.max(0, s - 2));
        setTimeout(() => {
          setDeck(prev => prev.map((c,i) => (i===a || i===b) ? { ...c, flipped: false } : c));
          setSelected([]);
        }, 700);
      }
    }
  };

  const handleRestart = () => {
    setDeck(createDeck(pairs));
    setSelected([]);
    setMoves(0);
    setMatches(0);
    setScore(0);
    setTimeLeft(60);
    setIsRunning(true);
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
              <Badge className="bg-primary text-primary-foreground">Adaptive</Badge>
            </div>
            <Button className="btn-success" onClick={handleRestart}>
              <RefreshCw className="h-4 w-4 mr-2" /> Restart
            </Button>
          </div>

          <Card className="glass-card border-0 p-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex flex-wrap items-center gap-4 justify-between">
                <span>Memory Matching</span>
                <div className="flex gap-4 text-sm">
                  <span>⏳ Time: <strong>{timeLeft}s</strong></span>
                  <span>🎯 Matches: <strong>{matches}</strong></span>
                  <span>🧩 Pairs: <strong>{pairs}</strong></span>
                  <span>📋 Moves: <strong>{moves}</strong></span>
                  <span>⭐ Score: <strong className="text-success">{score}</strong></span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
                {deck.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => onCardClick(i)}
                    className={`aspect-square rounded-2xl flex items-center justify-center text-2xl sm:text-3xl md:text-4xl select-none transition-transform duration-200 shadow-sm 
                      ${c.matched ? 'bg-success/20 border border-success/30' : 'bg-glass/60 border border-glass-border hover:scale-105'}
                    `}
                    aria-label="memory-card"
                  >
                    {(c.flipped || c.matched) ? c.value : "🂠"}
                  </button>
                ))}
              </div>

              {(!isRunning || allMatched) && (
                <div className="mt-6 p-6 text-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-glass-border">
                  <h3 className="text-2xl font-bold mb-2">Session Complete</h3>
                  <p className="text-muted-foreground mb-4">
                    {allMatched ? 'Great memory!' : 'Time up!'} Your score is <span className="text-success font-semibold">{score}</span>.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button className="btn-primary" onClick={handleRestart}>
                      <RefreshCw className="h-4 w-4 mr-2" /> Play Again
                    </Button>
                    <Link to="/games" className="btn-secondary px-6 py-3 inline-flex items-center">
                      <ArrowLeft className="h-4 w-4 mr-2" /> Choose Another Game
                    </Link>
                  </div>
                  <div className="mt-4 text-accent flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>AI will adjust difficulty next round</span>
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

export default MemoryGame;
