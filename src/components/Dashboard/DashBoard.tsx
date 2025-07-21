import { Bus, MapPin, TrendingUp, User } from "lucide-react";
import { useEffect, useState } from "react";
import {getAllDrivers } from "../../api/drivers";
import {getAllBuses } from "../../api/buses";
import { getAllRoutes } from "../../api/routes";


const Dashboard = () => {
  const [busCount, setBusCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);
  const [routeCount, setRouteCount] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
  try {
    const { data: buses } = await getAllBuses();
    const { data: drivers } = await getAllDrivers();
    const { data: routes } = await getAllRoutes();
    setBusCount(buses.length);
    setDriverCount(drivers.length);
    setRouteCount(routes.length);
  } catch (err) {
    setBusCount(0);
    setDriverCount(0);
  }
};

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
              <p className="text-2xl font-bold text-gray-900">{busCount}</p>
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
              <p className="text-2xl font-bold text-gray-900">{driverCount}</p>
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
              <p className="text-2xl font-bold text-gray-900">{routeCount}</p>
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
