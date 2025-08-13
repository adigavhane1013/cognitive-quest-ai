
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Games from "./pages/Games";
import MemoryGame from "./pages/games/MemoryGame";
import AttentionGame from "./pages/games/AttentionGame";
import ReactionGame from "./pages/games/ReactionGame";
import PatternGame from "./pages/games/PatternGame";
import WordGame from "./pages/games/WordGame";
import MathGame from "./pages/games/MathGame";
import VisualGame from "./pages/games/VisualGame";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/memory" element={<MemoryGame />} />
          <Route path="/games/attention" element={<AttentionGame />} />
          <Route path="/games/reaction" element={<ReactionGame />} />
          <Route path="/games/pattern" element={<PatternGame />} />
          <Route path="/games/word" element={<WordGame />} />
          <Route path="/games/math" element={<MathGame />} />
          <Route path="/games/visual" element={<VisualGame />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
