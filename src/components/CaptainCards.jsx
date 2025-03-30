const CaptainCard = ({
  playerName = "Sample Name",
  credits = 9,
  selectedCap = false,
  onSelectToggleCap = () => {},
  selectViceCap = false,
  onSelectToggleViceCap = () => {},
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
      <div className="w-full flex gap-4 justify-end pr-12">
        <button
          className={`w-12 h-12 rounded-full border ${selectedCap ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={onSelectToggleCap}
        >
          C
        </button>
        <button
          className={`w-12 h-12 rounded-full border ${selectViceCap ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={onSelectToggleViceCap}
        >
          VC
        </button>
      </div>
    </div>
  );
};

export default CaptainCard;
