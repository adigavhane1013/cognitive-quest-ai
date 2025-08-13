
import { useState } from "react";
import { Brain, Eye, Zap, Play, Star, Clock, Target, Puzzle, BookOpen, Calculator, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const GamesSection = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: "memory",
      title: "Memory Matching",
      description: "Test and improve your memory skills with adaptive card matching challenges",
      icon: Brain,
      color: "from-primary to-primary-light",
      difficulty: "Adaptive",
      duration: "5-10 min",
      lastScore: 95,
      improvement: "+8%",
      features: ["Card Pairs", "Progressive Difficulty", "Memory Boost"],
      status: "Recommended by AI"
    },
    {
      id: "attention",
      title: "Attention Focus",
      description: "Enhance your concentration with dynamic visual attention exercises",
      icon: Eye,
      color: "from-secondary to-secondary-light",
      difficulty: "Medium",
      duration: "3-8 min",
      lastScore: 82,
      improvement: "+5%",
      features: ["Visual Tracking", "Focus Training", "Speed Control"],
      status: "Perfect for you today"
    },
    {
      id: "reaction",
      title: "Reaction Speed",
      description: "Boost your cognitive processing speed with quick response challenges",
      icon: Zap,
      color: "from-success to-success-light",
      difficulty: "Dynamic",
      duration: "2-5 min",
      lastScore: 88,
      improvement: "+12%",
      features: ["Quick Response", "Hand-Eye Coordination", "Processing Speed"],
      status: "Great progress!"
    },
    {
      id: "pattern",
      title: "Pattern Recognition",
      description: "Develop logical thinking through sequence and pattern identification",
      icon: Puzzle,
      color: "from-accent to-accent-light",
      difficulty: "Progressive",
      duration: "4-8 min",
      lastScore: 78,
      improvement: "+15%",
      features: ["Sequence Logic", "Pattern Analysis", "Critical Thinking"],
      status: "Trending up!"
    },
    {
      id: "word",
      title: "Word Memory",
      description: "Strengthen verbal memory and language processing abilities",
      icon: BookOpen,
      color: "from-purple-500 to-purple-300",
      difficulty: "Adaptive",
      duration: "3-7 min",
      lastScore: 91,
      improvement: "+6%",
      features: ["Verbal Memory", "Language Skills", "Recall Training"],
      status: "Excellent retention!"
    },
    {
      id: "math",
      title: "Math Challenge",
      description: "Exercise working memory and numerical processing skills",
      icon: Calculator,
      color: "from-orange-500 to-orange-300",
      difficulty: "Scaling",
      duration: "3-6 min",
      lastScore: 84,
      improvement: "+10%",
      features: ["Mental Math", "Working Memory", "Problem Solving"],
      status: "Building confidence!"
    },
    {
      id: "visual",
      title: "Visual Processing",
      description: "Improve spatial awareness and visual-perceptual skills",
      icon: Layers,
      color: "from-teal-500 to-teal-300",
      difficulty: "Dynamic",
      duration: "4-9 min",
      lastScore: 86,
      improvement: "+7%",
      features: ["Spatial Skills", "Visual Perception", "3D Thinking"],
      status: "Sharp improvement!"
    }
  ];
  const navigate = useNavigate();

  const handlePlayGame = (gameId: string) => {
    setSelectedGame(gameId);
    navigate(`/games/${gameId}`);
    console.info(`Starting game: ${gameId}`);
  };

  return (
    <section id="games" className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Brain Training Games
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Personalized cognitive exercises powered by AI to maximize your mental fitness journey
          </p>
        </div>

        {/* AI Recommendation Banner */}
        <div className="glass-card p-6 mb-8 border border-accent/20 fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-accent to-accent-light">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-accent">AI Recommendation</h3>
                <p className="text-muted-foreground">
                  Based on your progress, Memory Matching is optimally challenging for you today
                </p>
              </div>
            </div>
            <Button 
              className="btn-primary"
              onClick={() => handlePlayGame("memory")}
            >
              Start Recommended
            </Button>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <Card 
              key={game.id} 
              className={`glass-card border-0 overflow-hidden scale-hover fade-in-up ${
                selectedGame === game.id ? 'ring-2 ring-primary' : ''
              }`}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${game.color} shadow-lg`}>
                    <game.icon className="h-8 w-8 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    {game.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold mt-4">{game.title}</CardTitle>
                <p className="text-muted-foreground text-sm leading-relaxed">{game.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Game Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-glass/50">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Duration</span>
                    </div>
                    <p className="font-bold">{game.duration}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-glass/50">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Difficulty</span>
                    </div>
                    <p className="font-bold">{game.difficulty}</p>
                  </div>
                </div>

                {/* Last Performance */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-success/10 to-success/5 border border-success/20">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Last Score</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-success">{game.lastScore}%</span>
                      <span className="text-sm text-success ml-2">{game.improvement}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-medium mb-2 text-sm text-muted-foreground">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {game.features.map((feature, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline" 
                        className="text-xs bg-glass/30 border-glass-border"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Play Button */}
                <Button 
                  className="btn-primary w-full mt-6"
                  onClick={() => handlePlayGame(game.id)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Play Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center fade-in-up" style={{ animationDelay: "1s" }}>
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">More Games Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              Our AI is continuously developing new cognitive challenges tailored to your unique needs and progress patterns.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="bg-glass/30 border-glass-border py-2 px-4">
                🧩 Strategy Games
              </Badge>
              <Badge variant="outline" className="bg-glass/30 border-glass-border py-2 px-4">
                🎵 Audio Memory
              </Badge>
              <Badge variant="outline" className="bg-glass/30 border-glass-border py-2 px-4">
                🎯 Executive Function
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
