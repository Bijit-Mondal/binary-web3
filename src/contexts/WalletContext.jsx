import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from 'ethers';
import React from 'react';

const WalletContext = createContext(undefined);

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState("0");
    const [isConnecting, setIsConnecting] = useState(false);

    const updateBalance = async (address) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const balanceWei = await provider.getBalance(address);
            setBalance(ethers.formatEther(balanceWei));
        } catch (error) {
            console.error("Failed to update balance", error);
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    updateBalance(accounts[0]);
                } else {
                    setAccount(null);
                    setBalance("0");
                }
            });
        }
    }, []);

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask.");
            return;
        }
        setIsConnecting(true);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            setAccount(accounts[0]);
            await updateBalance(accounts[0]);
        } catch (error) {
            console.error("Wallet connection failed", error);
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
        setBalance("0");
    };

    return (
        <WalletContext.Provider value={{ account, balance, isConnecting, connectWallet, disconnectWallet }}>
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