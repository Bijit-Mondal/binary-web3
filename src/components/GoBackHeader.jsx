import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GoBackHeader = ({ lastScreen = "go back" }) => {
  const navigate = useNavigate();
  // simple header with logo and app name
  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center">
        {/* <img
          src="https://api.dicebear.com/8.x/micah/svg?seed=a"
          alt="Logo"
          className="w-10 h-10 mr-2"
        /> */}
        <div className="mr-2 rounded-full border-2 p-1">
          <ArrowLeft className="w-8 h-8" onClick={() => navigate(-1)} />
        </div>
        <h1 className="text-xl font-medium">{lastScreen}</h1>
      </div>
    </header>
  );
};

export default GoBackHeader;
