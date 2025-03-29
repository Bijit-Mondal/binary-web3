const PlayerCard = ({ playerName, credits, selected, onSelectToggle }) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <img
        src={"https://api.dicebear.com/8.x/micah/svg?seed=" + playerName}
        alt={playerName}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{playerName}</h3>
        <p className="text-gray-600">Selected by {Math.random() * 100}%</p>
      </div>
    </div>
  );
};

export default PlayerCard;
