import { Bus, MapPin, TrendingUp, User } from "lucide-react";
import { useDashboard } from "../../hooks/useDashboard";

const Dashboard = () => {
  const { busCount, driverCount, routeCount, loading } = useDashboard();

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Buses</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? "..." : busCount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Drivers</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? "..." : driverCount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Routes</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? "..." : routeCount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="bg-orange-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Students</p>
              <p className="text-2xl font-bold text-gray-900">245</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
