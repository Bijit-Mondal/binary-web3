import TeamLogo from "./TeamLogo";

const ContestsEnrolledCards = ({ contest, match }) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
                {contest.contestName}
            </h2>
            <p className="text-sm text-gray-500">
                Match: {match.matchType} - {match.venue}
            </p>
            <p className="text-sm text-gray-500">
                Match Date: {new Date(match.matchDate).toLocaleString()}
            </p>

            <div className="mt-3 flex justify-between text-sm text-gray-600">
                {/* <p>🏠 {match.homeTeamId}</p> */}
                <TeamLogo teamId={match.homeTeamId} />
                <p className="mt-4">🆚</p>
                {/* <p>🚀 {match.awayTeamId}</p> */}
                <TeamLogo teamId={match.awayTeamId} />
            </div>

            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <p className="text-gray-700 font-medium">
                    Total Spots: {contest.totalSpots}
                </p>
                <p className="text-gray-700 font-medium">
                    Filled Spots: {contest.filledSpots}
                </p>
                <p className="text-gray-700 font-medium">
                    Entry Fee: ₹{contest.entryFee}
                </p>
                <p className="text-gray-700 font-medium">
                    Prize Pool: ₹{contest.totalPrizePool}
                </p>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        contest.status === "CREATED"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                    }`}
                >
                    {contest.status}
                </span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                    View
                </button>
            </div>
        </div>
    );
};

export default ContestsEnrolledCards;
