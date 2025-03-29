import { Settings } from "lucide-react";
import { User } from "lucide-react";
import { Swords } from "lucide-react";
import { useLocation } from "react-router-dom";

// A bottom nav bar containing "Matches", "Profile", and "Settings" links
const Footer = () => {
  const pathname = useLocation().pathname;
  return (
    <footer className="bg-gray-300 text-gray-500 py-4 absolute bottom-0 w-full h-fit">
      <div className="flex justify-around items-center">
        <a
          href="/dashboard"
          className={`flex gap-2 justify-center items-center hover:text-gray-400 ${pathname === "/dashboard" || pathname === "/" ? "text-gray-800" : ""}`}
        >
          <Swords /> Matches
        </a>
        <a
          href="/profile"
          className={`flex gap-2 justify-center items-center hover:text-gray-400 ${pathname === "/profile" ? "text-gray-800" : ""}`}
        >
          <User /> Profile
        </a>
        <a
          href="/settings"
          className={`flex gap-2 justify-center items-center hover:text-gray-400 ${pathname === "/settings" ? "text-gray-800" : ""}`}
        >
          <Settings /> Settings
        </a>
      </div>
    </footer>
  );
};
export default Footer;
