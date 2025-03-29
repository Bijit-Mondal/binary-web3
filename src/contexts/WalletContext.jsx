import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const WalletContext = createContext(undefined);

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(localStorage.getItem("walletAddress") || null);
  const [balance, setBalance] = useState(localStorage.getItem("walletBalance") || "0");

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          updateBalance(accounts[0]);
        } else {
          disconnectWallet();
        }
      });
    }
  }, []);

  const updateBalance = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balanceWei = await provider.getBalance(address);
      const formattedBalance = ethers.formatEther(balanceWei);
      setBalance(formattedBalance);
      localStorage.setItem("walletBalance", formattedBalance);
    } catch (error) {
      console.error("Failed to update balance", error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask.");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      localStorage.setItem("walletAddress", accounts[0]);
      updateBalance(accounts[0]);
    } catch (error) {
      console.error("Wallet connection failed", error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance("0");
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("walletBalance");
  };

  return (
    <WalletContext.Provider value={{ account, balance, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
