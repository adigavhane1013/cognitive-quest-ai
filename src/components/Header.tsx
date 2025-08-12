import { useState } from "react";
import { Brain, Menu, X, Home, BarChart3, Gamepad2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="glass-card mx-4 mt-4 mb-6 relative overflow-hidden">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MCI Cognitive Care
              </h1>
              <p className="text-sm text-muted-foreground">Personalized Brain Training</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground hover:bg-glass transition-all duration-300 group"
            >
              <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link
              to="/games"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground hover:bg-glass transition-all duration-300 group"
            >
              <Gamepad2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Games</span>
            </Link>
            <Link
              to="/#progress"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-foreground hover:bg-glass transition-all duration-300 group"
            >
              <BarChart3 className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Progress</span>
            </Link>
            <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-glass cursor-pointer hover:bg-glass-border transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-success to-accent flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium">Mrs. Sharma</span>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-6 pt-6 border-t border-glass-border space-y-4 fade-in-up">
            <Link
              to="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:bg-glass transition-all duration-300"
              onClick={toggleMenu}
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link
              to="/games"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:bg-glass transition-all duration-300"
              onClick={toggleMenu}
            >
              <Gamepad2 className="h-5 w-5" />
              <span className="font-medium">Games</span>
            </Link>
            <Link
              to="/#progress"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:bg-glass transition-all duration-300"
              onClick={toggleMenu}
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">Progress</span>
            </Link>
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-glass">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-success to-accent flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium">Mrs. Sharma</span>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;