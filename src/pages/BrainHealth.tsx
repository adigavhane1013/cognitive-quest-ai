import React from 'react';
import { BookOpen, Heart, Lightbulb, Coffee, Moon, Activity } from 'lucide-react';

const BrainHealth = () => {
  const articles = [
    {
      id: 1,
      title: "The Science of Neuroplasticity",
      excerpt: "Learn how your brain can change and adapt throughout your lifetime through targeted exercises and lifestyle choices.",
      readTime: "5 min read",
      category: "Science",
      icon: <Lightbulb className="h-5 w-5" />
    },
    {
      id: 2,
      title: "Nutrition for Cognitive Performance",
      excerpt: "Discover the foods that fuel your brain and enhance memory, focus, and overall cognitive function.",
      readTime: "7 min read",
      category: "Nutrition",
      icon: <Coffee className="h-5 w-5" />
    },
    {
      id: 3,
      title: "Sleep and Memory Consolidation",
      excerpt: "Understanding the critical role of sleep in memory formation and cognitive recovery.",
      readTime: "6 min read",
      category: "Sleep",
      icon: <Moon className="h-5 w-5" />
    },
    {
      id: 4,
      title: "Exercise and Brain Health",
      excerpt: "How physical activity boosts brain function, improves mood, and protects against cognitive decline.",
      readTime: "8 min read",
      category: "Exercise",
      icon: <Activity className="h-5 w-5" />
    }
  ];

  const tips = [
    {
      category: "Daily Habits",
      icon: <Heart className="h-6 w-6 text-red-500" />,
      items: [
        "Get 7-9 hours of quality sleep each night",
        "Stay hydrated - aim for 8 glasses of water daily",
        "Take regular breaks from screen time (20-20-20 rule)",
        "Practice deep breathing or meditation for 10 minutes"
      ]
    },
    {
      category: "Mental Stimulation",
      icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
      items: [
        "Learn a new skill or hobby regularly",
        "Read books from different genres",
        "Solve puzzles, crosswords, or brain teasers",
        "Engage in meaningful conversations"
      ]
    },
    {
      category: "Physical Health",
      icon: <Activity className="h-6 w-6 text-green-500" />,
      items: [
        "Exercise for at least 30 minutes, 5 days a week",
        "Include both cardio and strength training",
        "Take walks in nature when possible",
        "Practice yoga or tai chi for mind-body connection"
      ]
    },
    {
      category: "Nutrition",
      icon: <Coffee className="h-6 w-6 text-orange-500" />,
      items: [
        "Eat omega-3 rich foods (fish, walnuts, flaxseeds)",
        "Include antioxidant-rich berries and dark leafy greens",
        "Limit processed foods and excess sugar",
        "Consider brain-healthy supplements after consulting a doctor"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Brain Health Hub</h1>
        <p className="text-muted-foreground">
          Evidence-based articles and practical tips for optimal cognitive health
        </p>
      </div>

      {/* Featured Articles */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">Featured Articles</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <article key={article.id} className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex items-start space-x-3 mb-3">
                {article.icon}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                </div>
              </div>
              <button className="text-primary hover:text-primary/80 text-sm font-medium">
                Read Article →
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Brain Health Tips */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Daily Brain Health Tips</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tips.map((tipCategory, index) => (
            <div key={index} className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center space-x-3 mb-4">
                {tipCategory.icon}
                <h3 className="text-lg font-semibold text-foreground">{tipCategory.category}</h3>
              </div>
              
              <ul className="space-y-2">
                {tipCategory.items.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Action Cards */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Take Action Today</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary/10 rounded-lg p-6 border border-primary/20 text-center">
            <Moon className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Sleep Tracker</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor your sleep patterns for better cognitive recovery
            </p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors">
              Start Tracking
            </button>
          </div>

          <div className="bg-green-500/10 rounded-lg p-6 border border-green-500/20 text-center">
            <Activity className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Exercise Log</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Track physical activities that boost brain health
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600/90 transition-colors">
              Log Exercise
            </button>
          </div>

          <div className="bg-orange-500/10 rounded-lg p-6 border border-orange-500/20 text-center">
            <Coffee className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Nutrition Guide</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Personalized nutrition recommendations for brain health
            </p>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600/90 transition-colors">
              Get Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrainHealth;