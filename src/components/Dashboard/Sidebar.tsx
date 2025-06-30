import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Bus, Users, MapPin, User, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home, path: "/home" },
    { id: "buses", label: "Buses", icon: Bus, path: "/buses" },
    { id: "drivers", label: "Drivers", icon: Users, path: "/drivers" },
    { id: "routes", label: "Routes", icon: MapPin, path: "/routes" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center h-16 bg-gray-900 text-white">
          <Bus className="w-8 h-8 mr-2" />
          <span className="text-xl font-bold">BusTracker</span>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors ${
                    isActive ? "bg-gray-100 border-r-4 border-gray-900" : ""
                  }`
                }
                onClick={() => setIsMobileOpen(false)}
                end={item.path === "/home"}
              >
                <Icon className="w-5 h-5 mr-3 text-gray-600" />
                <span className="font-medium text-gray-700">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar
