import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import cricketImage from "../assets/PlayingCricket.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Main>
      <div className="h-full w-full bg-white relative">
        <Header />
        <div className="flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-md border border-gray-300 text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome to TheEleven
            </h1>
            <p className="text-lg text-gray-700 mt-4">
              The next-generation fantasy gaming platform powered by AI and
              Web3.
            </p>
            <div className="mt-6 space-y-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full py-3 hover:bg-gray-100 text-black transition-all text-lg font-semibold rounded-xl shadow-md border"
              >
                Enter Dashboard
              </button>
              <button
                onClick={() => navigate("/premium")}
                className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white transition-all text-lg font-semibold rounded-xl shadow-md"
              >
                Explore Premium Features
              </button>
            </div>
          </div>
        </div>

        {/* Cricket Image */}
        <div className="absolute bottom-0 right-10 opacity-70">
          <img
            src={cricketImage}
            alt="Cricket Illustration"
            className="w-70 h-70"
          />
        </div>
      </div>
    </Main>
  );
};

export default LandingPage;
