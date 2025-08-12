import Header from "@/components/Header";
import GamesSection from "@/components/GamesSection";
import { useEffect } from "react";

const Games = () => {
  useEffect(() => {
    document.title = "MCI Cognitive Care – Games";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <GamesSection />
      </main>
    </div>
  );
};

export default Games;
