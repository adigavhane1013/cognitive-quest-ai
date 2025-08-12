import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import GamesSection from "@/components/GamesSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Dashboard />
        <GamesSection />
      </main>
    </div>
  );
};

export default Index;
