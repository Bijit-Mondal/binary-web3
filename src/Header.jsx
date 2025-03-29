import React from "react";
import useWallet from "./hooks/useWallet"; // Import wallet hook

const Header = () => {
  const { account, balance, connectWallet, disconnectWallet } = useWallet();

  // Function to format balance to 4 decimal places
  const formatBalance = (bal) => {
    return bal ? parseFloat(bal).toFixed(4) : "0.0000";
  };

  return (
    <header className="bg-gray-100 text-gray-800 p-4 flex justify-between items-center shadow-md rounded-lg w-full max-w-4xl mx-auto">
      <h1 className="text-lg font-semibold">TheEleven</h1>
      {account ? (
        <div className="bg-gray-200 p-2 rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-700">💰 {formatBalance(balance)} AVAX</p>
          <p className="text-sm text-gray-700">🔗 {account.substring(0, 4)}...{account.slice(-4)}</p>
          <button 
            onClick={disconnectWallet} 
            className="bg-gray-700 text-white px-3 py-1 text-sm rounded-md hover:bg-gray-800 transition mt-2 w-full">
            Disconnect
          </button>
        </div>
      ) : (
        <button 
          onClick={connectWallet} 
          className="bg-gray-700 text-white px-4 py-2 text-sm rounded-md hover:bg-gray-800 transition">
          Connect Wallet
        </button>
      )}
    </header>
  );
};

export default Header;