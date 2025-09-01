import { Brain } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center text-white">
        <Brain className="w-16 h-16 mx-auto mb-4 text-purple-300" />
        <h1 className="text-4xl font-bold mb-2">Cognitive Quest AI</h1>
        <p className="text-xl text-purple-200">Brain training through AI-powered challenges</p>
      </div>
    </div>
  );
};

export default Index;