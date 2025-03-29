const PlayerCard = ({
  playerName = "Sample Name",
  credits = 9,
  selected = false,
  onSelectToggle = () => {},
}) => {
  return (
    <div className="flex justify-between items-center gap-4 w-full pl-4 box-border py-4 border-b">
      <div className="flex gap-4 w-fit shrink-0 justify-center items-center">
        <img
          src={"https://api.dicebear.com/9.x/identicon/svg?seed=" + playerName}
          alt={playerName}
          className="w-8 h-8 object-cover rounded-full"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{playerName}</h3>
          <p className="text-gray-600 text-xs">
            Selected by {(Math.random() * 100).toFixed(2)}%
          </p>
        </div>
      </div>
      <div className="w-full flex gap-8 justify-end pr-12">
        {credits}
        <input type="checkbox" checked={selected} onChange={onSelectToggle} />
      </div>
    </div>
  );
};

export default PlayerCard;
