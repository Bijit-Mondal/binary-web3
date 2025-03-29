import { useState, useEffect } from "react";
import { ethers } from "ethers";

const useWallet = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(newProvider);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      alert("Please install MetaMask.");
      return;
    }
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);

      const balanceWei = await provider.getBalance(accounts[0]);
      setBalance(ethers.formatEther(balanceWei));
    } catch (error) {
      console.error("Wallet connection failed", error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
  };

  return { account, balance, connectWallet, disconnectWallet };
};

export default useWallet;
