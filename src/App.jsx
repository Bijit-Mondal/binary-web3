import { useState } from "react";
import Main from "./components/Main.jsx";
import MatchDetails from "./components/UpComingMatchesCards.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx"; // Updated Header
import { useEffect } from "react";
import axios from "axios";
import { Loader } from "lucide-react";

function App() {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadAllUpComingMatches() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/ipl/contests/schedule`,
        );
        const data = response.data;
        console.log(data.data);
        setUpcomingMatches(data.data.matches.slice(0, 20));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    loadAllUpComingMatches();
  }, []);
  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader className="mx-auto animate-spin" />;
      </div>
    );
  }
  return (
    <Main>
      <div className="h-full w-full bg-white relative">
        <Header /> {/* Header now includes Wallet Login */}
        <div className="flex flex-col gap-2 p-4">
          <h2 className="font-medium text-lg">upcoming matches</h2>
          <div className="space-y-2 h-[77vh] overflow-y-scroll">
            {upcomingMatches.map((match) => (
              <MatchDetails
                key={match.matchId}
                id={match.matchId}
                team1={match.awayTeamId}
                team2={match.homeTeamId}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </Main>
  );
}

export default App;
