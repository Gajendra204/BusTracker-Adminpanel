import { useState, useEffect } from "react";

interface Route {
  _id: string;
  busId?: string | { _id: string; assignedDriver?: { _id: string } };
}
interface Bus {
  _id: string;
  assignedDriver?: { _id: string };
}

export function useRouteAssignments(routes: Route[] = [], buses: Bus[] = []) {
  const [selectedBusForRoute, setSelectedBusForRoute] = useState<{ [routeId: string]: string }>({});
  const [selectedDriverForRoute, setSelectedDriverForRoute] = useState<{ [routeId: string]: string }>({});

  useEffect(() => {
    if (!routes || !buses) return;
    const newSelectedBus: { [routeId: string]: string } = {};
    const newSelectedDriver: { [routeId: string]: string } = {};
    routes.forEach((route) => {
      const busId = typeof route.busId === "string" ? route.busId : route.busId?._id;
      if (busId) {
        newSelectedBus[route._id] = busId;
        const bus = buses.find((b) => b._id === busId);
        if (bus && bus.assignedDriver) {
          newSelectedDriver[route._id] = bus.assignedDriver._id;
        } else {
          newSelectedDriver[route._id] = "";
        }
      }
    });
    setSelectedBusForRoute((prev) => ({ ...prev, ...newSelectedBus }));
    setSelectedDriverForRoute((prev) => ({ ...prev, ...newSelectedDriver }));
  }, [routes, buses]);

  const handleBusSelect = (routeId: string, busId: string) => {
    setSelectedBusForRoute((prev) => ({ ...prev, [routeId]: busId }));
    const bus = buses.find((b) => b._id === busId);
    setSelectedDriverForRoute((prev) => ({
      ...prev,
      [routeId]: bus?.assignedDriver?._id || "",
    }));
  };

  const handleDriverChange = (routeId: string, driverId: string) => {
    setSelectedDriverForRoute((prev) => ({ ...prev, [routeId]: driverId }));
  };

  return {
    selectedBusForRoute,
    selectedDriverForRoute,
    handleBusSelect,
    handleDriverChange,
    setSelectedBusForRoute,
    setSelectedDriverForRoute,
  };
} 