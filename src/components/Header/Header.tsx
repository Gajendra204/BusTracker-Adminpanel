import {LogOut, Bus } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-[90] flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bus className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 hidden sm:block">
            BusTracker
          </span>
          <span className="text-xl font-bold text-gray-900 sm:hidden">
            BusTracker
          </span>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center justify-end w-auto px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
      >
        <LogOut className="w-4 h-4 mr-2" />
        <span>Logout</span>
      </button>
    </header>
  );
};

export default Header;
