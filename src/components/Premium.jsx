import { useState } from "react";
import { motion } from "framer-motion";

const premiumFeatures = [
  {
    title: "AI-Powered Team Selection",
    description:
      "Use AI to generate optimal teams based on historical data and performance trends.",
    details:
      "Users can pay additional d11 tokens to access AI-generated team recommendations. The AI analyzes past performances, trends, and game analytics to provide the best lineup recommendations.",
  },
  {
    title: "Subscription-Based Premium Access",
    description:
      "Subscribe using d11 tokens for exclusive benefits like unlimited AI picks and lower fees.",
    details:
      "Premium members get access to AI-powered team selection, exclusive contests with bigger prize pools, and lower betting fees. Subscription plans include 7-day, 30-day, and lifetime options.",
  },
  {
    title: "Exclusive High-Stakes Contests",
    description:
      "Join premium-only contests with larger prize pools and reduced entry fees.",
    details:
      "These contests are designed for high rollers who want to compete for bigger winnings. Only premium users can participate, ensuring a competitive environment.",
  },
  {
    title: "NFT Memberships for Lifetime Premium Access",
    description:
      "Own an exclusive NFT that grants permanent premium status on the platform.",
    details:
      "Limited edition NFTs grant lifetime premium access, eliminating the need for recurring subscriptions. They can be purchased with d11 tokens or AVAX.",
  },
  {
    title: "Referral & Affiliate Rewards",
    description: "Earn d11 tokens by inviting friends who deposit and play.",
    details:
      "Users can refer friends and earn bonuses when they join, deposit, or subscribe to premium features. Additional rewards apply for high-value referrals.",
  },
];

export default function Premium() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <main className="h-full w-full bg-white relative flex justify-center p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-md border border-gray-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Premium Features
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition-all"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedFeature(feature)}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {selectedFeature && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg max-w-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {selectedFeature.title}
              </h3>
              <p className="text-gray-700 mt-2">{selectedFeature.details}</p>
              <button
                className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
                onClick={() => setSelectedFeature(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
