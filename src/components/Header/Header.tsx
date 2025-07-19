import { User, LogOut, Bus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate("/login");
  };

  const goToProfile = () => {
    setIsProfileOpen(false);
    navigate("/profile");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bus className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 hidden sm:block">BusTracker</span>
          <span className="text-xl font-bold text-gray-900 sm:hidden">BusTracker</span>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          aria-label="Open user menu"
          className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-gray-300 transition"
        >
          <User className="w-5 h-5 text-gray-600" />
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-3 w-52 bg-white rounded-lg shadow-xl z-50 border border-gray-100 animate-fade-in">
            <div className="py-1">
              <button
                onClick={goToProfile}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                <User className="w-4 h-4 mr-2 text-blue-600" />
                <span>Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
