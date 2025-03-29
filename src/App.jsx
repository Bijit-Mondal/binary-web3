import { useState } from "react";
import Main from "./components/Main.jsx";
import MatchDetails from "./components/UpComingMatchesCards.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Main>
      <div className="h-full w-full bg-white relative">
        <Header />
        <div className="flex flex-col gap-2 p-4">
          <h2 className="font-medium text-lg">upcoming matches</h2>
          <div className="space-y-2">
            <MatchDetails />
            <MatchDetails />
            <MatchDetails />
          </div>
        </div>
        <Footer />
      </div>
    </Main>
  );
}

export default App;
