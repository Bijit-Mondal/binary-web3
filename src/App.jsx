import { useState, useEffect } from "react";
import Main from "./components/Main.jsx";
import UpComingMatchesCards from "./components/UpComingMatchesCards.jsx"; // ✅ Correct component name
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
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
          `${import.meta.env.VITE_BASE_URL}/ipl/contests/schedule`
        );
        const data = response.data;
        setUpcomingMatches(data.data.matches.slice(0, 20));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadAllUpComingMatches();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader className="mx-auto animate-spin" />
      </div>
    );
  }

  return (
    <Main>
      <div className="h-full w-full bg-white relative">
        <Header />
        <div className="flex flex-col gap-2 p-4">
          <h2 className="font-medium text-lg">Upcoming Matches</h2>
          <div className="space-y-2 h-[77vh] overflow-y-scroll">
            <UpComingMatchesCards matches={upcomingMatches} /> {/* ✅ Use it here */}
          </div>
        </div>
        <Footer />
      </div>
    </Main>
  );
}

export default App;
