import { useState, useEffect } from "react";
import { Brain, TrendingUp, Award, Sparkles, Calendar, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [progressValue, setProgressValue] = useState(0);

  // Animated progress bar effect
  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(78), 500);
    return () => clearTimeout(timer);
  }, []);

  const recentGames = [
    { date: "Today", game: "Memory Matching", score: 95, improvement: "+8%" },
    { date: "Yesterday", game: "Attention Focus", score: 82, improvement: "+5%" },
    { date: "2 days ago", game: "Reaction Speed", score: 88, improvement: "+12%" },
    { date: "3 days ago", game: "Memory Matching", score: 87, improvement: "+3%" },
  ];

  const achievements = [
    { icon: Award, title: "7-Day Streak", color: "from-warning to-warning-light" },
    { icon: Target, title: "Perfect Score", color: "from-success to-success-light" },
    { icon: Sparkles, title: "AI Optimized", color: "from-accent to-accent-light" },
  ];

  return (
    <section id="dashboard" className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="glass-card p-8 mb-8 text-center bounce-in">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-success to-accent flex items-center justify-center shadow-lg">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Welcome back, Mrs. Sharma! 👋
              </h2>
              <p className="text-lg text-muted-foreground">
                Ready for your personalized brain training session?
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Progress Card */}
          <div className="lg:col-span-2">
            <Card id="progress" className="glass-card border-0 p-6 fade-in-up">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <span>Cognitive Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-medium">Overall Score</span>
                      <span className="text-2xl font-bold text-primary">{progressValue}%</span>
                    </div>
                    <Progress 
                      value={progressValue} 
                      className="h-4 bg-muted progress-glow animate-pulse-glow"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      🎯 You're performing excellently! The AI has optimized your challenges perfectly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                      <div className="text-2xl font-bold text-primary">92%</div>
                      <div className="text-sm text-muted-foreground">Memory</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5">
                      <div className="text-2xl font-bold text-secondary">78%</div>
                      <div className="text-sm text-muted-foreground">Attention</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5">
                      <div className="text-2xl font-bold text-success">84%</div>
                      <div className="text-sm text-muted-foreground">Reaction</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements Sidebar */}
          <div className="space-y-6">
            <Card className="glass-card border-0 p-6 fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-warning" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg glass-card-hover cursor-pointer"
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${achievement.color}`}>
                        <achievement.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-sm">{achievement.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 p-6 fade-in-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <span>AI Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="font-medium text-accent">Personalization Active</p>
                    <p className="text-muted-foreground mt-1">
                      Your difficulty is perfectly calibrated
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                    <p className="font-medium text-success">Recommendation</p>
                    <p className="text-muted-foreground mt-1">
                      Try Memory Matching for optimal challenge
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Games */}
        <Card className="glass-card border-0 p-6 mt-8 fade-in-up" style={{ animationDelay: "0.6s" }}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentGames.map((game, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg glass-card-hover"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                    <div>
                      <p className="font-medium">{game.game}</p>
                      <p className="text-sm text-muted-foreground">{game.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{game.score}%</p>
                    <p className="text-sm text-success font-medium">{game.improvement}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;