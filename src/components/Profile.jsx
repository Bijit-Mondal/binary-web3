import React, { useState } from "react";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import useWallet from "../hooks/useWallet";

export default function Profile() {
  const { account, balance } = useWallet();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleDeposit = async () => {
    if (!depositAmount || isNaN(Number(depositAmount)) || Number(depositAmount) <= 0) {
      return toast.error("Enter a valid deposit amount");
    }
    toast.success("Deposit successful!");
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || isNaN(Number(withdrawAmount)) || Number(withdrawAmount) <= 0) {
      return toast.error("Enter a valid withdraw amount");
    }
    toast.success("Withdrawal successful!");
  };

  return (
    <Main>
      <div className="h-full w-full bg-white relative">
        <Header />
        <div className="flex flex-col items-center justify-center p-6">
          <Toaster />
          <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-md border border-gray-300">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Profile</h2>
            {account ? (
              <div className="mt-6 text-center space-y-4">
                <p className="text-lg text-gray-700">Your AVAX Balance: <span className="font-bold">{balance ? parseFloat(balance).toFixed(4) : "0.0000"} AVAX</span></p>
                
                <input 
                  type="number" 
                  value={depositAmount} 
                  onChange={(e) => setDepositAmount(e.target.value)} 
                  className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-400 focus:ring-2 focus:ring-gray-600 outline-none bg-gray-200 placeholder-gray-500" 
                  placeholder="Enter AVAX amount"
                />
                <button 
                  onClick={handleDeposit} 
                  className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white transition-all text-lg font-semibold rounded-xl shadow-md">
                  Deposit AVAX
                </button>
                
                <input 
                  type="number" 
                  value={withdrawAmount} 
                  onChange={(e) => setWithdrawAmount(e.target.value)} 
                  className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-400 focus:ring-2 focus:ring-gray-600 outline-none bg-gray-200 placeholder-gray-500 mt-4" 
                  placeholder="Enter AVAX amount to withdraw"
                />
                <button 
                  onClick={handleWithdraw} 
                  className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white transition-all text-lg font-semibold rounded-xl shadow-md">
                  Withdraw AVAX
                </button>
              </div>
            ) : (
              <p className="text-lg text-gray-700 text-center">Connect your wallet to view your profile.</p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </Main>
  );
}
