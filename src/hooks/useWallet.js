import { useState, useEffect } from "react";
import { ethers } from "ethers";

const useWallet = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(localStorage.getItem("walletAddress") || null);
  const [balance, setBalance] = useState(localStorage.getItem("walletBalance") || "0");

  useEffect(() => {
    if (window.ethereum) {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(newProvider);
      
      // Reconnect wallet if stored in localStorage
      if (account) {
        updateBalance(account);
      }
    }
  }, []);

  const updateBalance = async (address) => {
    try {
      if (!provider) return;
      const balanceWei = await provider.getBalance(address);
      const formattedBalance = ethers.formatEther(balanceWei);
      setBalance(formattedBalance);
      localStorage.setItem("walletBalance", formattedBalance);
    } catch (error) {
      console.error("Failed to update balance", error);
    }
  };

  const connectWallet = async () => {
    if (!provider) {
      alert("Please install MetaMask.");
      return;
    }
    try {
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

  return { account, balance, connectWallet, disconnectWallet };
};

export default useWallet;
