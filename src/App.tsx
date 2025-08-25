import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './contexts/ProgressContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Analytics from './pages/Analytics';
import BrainHealth from './pages/BrainHealth';

function App() {
  return (
    <ProgressProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/brain-health" element={<BrainHealth />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;