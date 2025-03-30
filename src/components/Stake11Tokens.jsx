import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractAbi from "../abis/TheElevenPlatform.json";
import d11TokenAbi from "../abis/TheElevenToken.json";
import useWallet from "../hooks/useWallet";
import Footer from "./Footer";
import Main from "./Main";
import Header from "./Header";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { selectedContestEntryFee } from "../allSates";
import { Loader } from "lucide-react";
import axios from "axios";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const D11_TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS;
// const requiredTokens = 199;

const StakeD11Tokens = ({ onStake }) => {
    const [requiredTokens, setRequiredTokens] = useState(0);
    const [platformFees, setPlatformFees] = useState(2);
    const { account } = useWallet();
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [tokenBalance, setTokenBalance] = useState("0");
    const [loading, setLoading] = useState(false);
    const totalFee = (requiredTokens * platformFees) / 100;
    const totalPayable = requiredTokens + totalFee;
    const navigate = useNavigate();

    const selectedContestEntryFeeVal = useAtomValue(selectedContestEntryFee);
    const selectedContestEntryFeeLocal = localStorage.getItem(
        "selectedContestEntryFee"
    );

    if (!selectedContestEntryFeeVal && !selectedContestEntryFeeLocal) {
        navigate("/");
        return;
    }

    useEffect(() => {
        if (account) fetchD11Balance();
        console.log(
            "Selected Contest Entry Fee Value:",
            parseFloat(selectedContestEntryFeeLocal),
            selectedContestEntryFeeLocal,
            selectedContestEntryFee
        );
        setRequiredTokens(
            selectedContestEntryFeeVal ||
                parseFloat(selectedContestEntryFeeLocal) ||
                0
        );
    }, [account]);

    const fetchD11Balance = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                contractAbi,
                provider
            );
            const balance = await contract.d11Balance(account);
            setTokenBalance(ethers.formatUnits(balance, 18));
        } catch (error) {
            console.error("Failed to fetch d11 balance", error);
        }
    };

    const handleStake = () => {
        const totalRequired = requiredTokens * 1.02;
        if (totalRequired > tokenBalance) {
            setError(
                `You need at least ${totalRequired.toFixed(
                    2
                )} d11 tokens (including 2% fee).`
            );
            setShowModal(true);
            return;
        }
        setError("");
        setShowModal(true);
    };

    const submitForm = async () => {
        try {
            const finalData = JSON.parse(localStorage.getItem("finalData"));
            let { matchId, contestId, players } = finalData;
            const viceCaptainSelectionId = localStorage.getItem(
                "viceCaptainSelectionId"
            );
            const captainSelectionId =
                localStorage.getItem("captainSelectionId");

            players = players.map((player) => {
                if (player.playerId === viceCaptainSelectionId) {
                    return { ...player, isViceCaptain: true };
                }
                if (player.playerId === captainSelectionId) {
                    return { ...player, isCaptain: true };
                }
                return player;
            });
            console.log({ contestId, matchId, players });
            const payload = {
                userId: "8",
                matchId, // Replace with actual match ID
                contestId, // Replace with actual contest ID
                teamName: "My Team", // Replace with actual team name
                players, // Add remaining 8 players
            };

            const response = await axios.post(
                import.meta.env.VITE_BASE_URL + "/ipl/contests/team/bymatch",
                payload
            );
            if (response.data.success) {
                console.log("Team submitted successfully:", response.data);
                alert("Team submitted successfully!");
                localStorage.removeItem("selectedPlayersAllState");
                localStorage.removeItem("captainSelectionId");
                localStorage.removeItem("viceCaptainSelectionId");
                localStorage.removeItem("finalData");
                localStorage.removeItem("selectedContestEntryFee");
                localStorage.removeItem("selectedContestId");
                navigate("/dashboard");
                return;
            } else {
                console.error("Failed to submit team:", response.data);
                setError("Failed to submit team. Please try again.");
                return;
            }
            // Clear local storage after successful submission

            // Handle success (e.g., navigate or show success message)
            alert("Team submitted successfully!");
        } catch (error) {
            console.error("Error submitting team:", error);
            setError("Failed to submit team. Please try again.");
        }
    };

    // const confirmStake = () => {
    //     onStake(requiredTokens);
    //     setShowModal(false);
    // };

    const confirmStake = async () => {
        if (!account) {
            setError("Please connect your wallet first.");
            return;
        }

        try {
            setError("");
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                contractAbi,
                signer
            );

            const amountInWei = ethers.parseUnits(totalPayable.toFixed(2), 18);

            setLoading(true);

            // Approve contract to spend d11 tokens if required
            const d11TokenContract = new ethers.Contract(
                D11_TOKEN_ADDRESS,
                d11TokenAbi,
                signer
            );
            let allowance;
            try {
                allowance = await d11TokenContract.allowance(
                    account,
                    CONTRACT_ADDRESS
                );
            } catch (error) {
                console.error("Error fetching allowance:", error);
                setError("Transaction failed. Please try again.");
                setLoading(false);
                setShowModal(false);
                return;
            }

            if (allowance < amountInWei) {
                try {
                    const approveTx = await d11TokenContract.approve(
                        CONTRACT_ADDRESS,
                        amountInWei
                    );
                    await approveTx.wait();
                } catch (err) {
                    console.error("Error approving tokens:", err);
                    setError("Transaction failed. Please try again.");
                    setLoading(false);
                    setShowModal(false);
                    return;
                }
            }

            // Execute stake (or placeBet) function in smart contract
            const tx = await contract.placeBet(amountInWei);
            await tx.wait();
            setLoading(false);
            console.log("Transaction successful:", tx);

            setShowModal(false);

            // Show success popup
            alert(
                "🎉 Congratulations! Your tokens have been staked successfully!"
            );

            await submitForm();

            // Refresh balance
            fetchD11Balance();
        } catch (error) {
            console.error("Transaction failed:", error);
            setError("Transaction failed. Please try again.");
            setLoading(false);
            setShowModal(false);
        }
    };

    return (
        <Main>
            <div className="h-full w-full bg-white relative">
                {loading && (
                    <div className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-gray-800 opacity-75 z-[100]">
                        <Loader className="animate-spin text-white" />
                    </div>
                )}
                <Header />
                <div className="w-full max-w-lg bg-white p-8 rounded-2xl m-auto mt-1/2">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                        Stake Tokens
                    </h2>
                    <p className="text-lg text-gray-700 text-center">
                        Required Tokens:{" "}
                        <span className="font-semibold">
                            {requiredTokens} d11
                        </span>
                    </p>
                    <p className="text-lg text-gray-700 text-center">
                        Platform Fee (2%):{" "}
                        <span className="font-semibold">
                            {totalFee.toFixed(2)} d11
                        </span>
                    </p>
                    <p className="text-lg text-gray-700 text-center mb-4">
                        Total Payable:{" "}
                        <span className="font-semibold">
                            {totalPayable.toFixed(2)} d11
                        </span>
                    </p>
                    <p className="text-lg text-gray-700 text-center mb-4">
                        Your Balance:{" "}
                        <span className="font-semibold">
                            {tokenBalance} d11
                        </span>
                    </p>
                    {error && (
                        <p className="text-sm text-red-600 mt-2 text-center">
                            {error}
                        </p>
                    )}
                    <button
                        onClick={handleStake}
                        className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white transition-all text-lg font-semibold rounded-xl shadow-md mt-4"
                    >
                        Stake Tokens
                    </button>

                    {showModal && (
                        <motion.div
                            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <motion.div
                                className="bg-white p-6 rounded-lg shadow-lg w-96 text-center"
                                initial={{ y: -50 }}
                                animate={{ y: 0 }}
                                exit={{ y: -50 }}
                            >
                                {tokenBalance >= requiredTokens * 1.02 ? (
                                    <>
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            Confirm Stake
                                        </h3>
                                        <p className="text-gray-700 my-4">
                                            You are about to stake{" "}
                                            <span className="font-semibold">
                                                {totalPayable} d11
                                            </span>{" "}
                                            tokens (including 2% fee).
                                        </p>
                                        <div className="flex justify-center space-x-4">
                                            <button
                                                onClick={confirmStake}
                                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setShowModal(false)
                                                }
                                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-2xl font-bold text-red-600">
                                            Insufficient Balance
                                        </h3>
                                        <p className="text-gray-700 my-4">
                                            You need more d11 tokens to stake.
                                            Please buy more using AVAX.
                                        </p>
                                        <div className="flex justify-center space-x-4">
                                            <button
                                                onClick={() =>
                                                    navigate("/profile")
                                                }
                                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                                            >
                                                Buy d11
                                            </button>
                                            <button
                                                onClick={() =>
                                                    navigate("/dashboard")
                                                }
                                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </Main>
    );
};

export default StakeD11Tokens;
