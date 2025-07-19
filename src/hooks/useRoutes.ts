import { useState } from "react";
import {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
  assignBusToRoute,
  
} from "../api/routes";
import {type IRoute,
  type CreateRouteData,
  type UpdateRouteData,
  type AssignBusData} from "../api/types"
import toast from "react-hot-toast";

export const useRoutes = () => {
  const [routes, setRoutes] = useState<IRoute[]>([]);
  const [currentRoute, setCurrentRoute] = useState<IRoute | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoutes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllRoutes();
      setRoutes(response.data);
    } catch (err:any) {
      toast.error("Failed to fetch routes");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRouteById = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getRouteById(id);
      setCurrentRoute(response.data);
    } catch (error) {
      toast.error("Failed to fetch route");
    } finally {
      setIsLoading(false);
    }
  };

  const addRoute = async (routeData: CreateRouteData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createRoute(routeData);
      setRoutes(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      toast.error("Failed to create route");
    } finally {
      setIsLoading(false);
    }
  };

  const modifyRoute = async (id: string, routeData: UpdateRouteData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await updateRoute(id, routeData);
      setRoutes(prev =>
        prev.map(route => (route._id === id ? response.data : route))
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to update route");
    } finally {
      setIsLoading(false);
    }
  };

  const removeRoute = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteRoute(id);
      setRoutes(prev => prev.filter(route => route._id !== id));
    } catch (error) {
      toast.error("Failed to delete route");
    } finally {
      setIsLoading(false);
    }
  };

  const assignBus = async (routeId: string, busData: AssignBusData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await assignBusToRoute(routeId, busData);
      setRoutes(prev =>
        prev.map(route => (route._id === routeId ? response.data : route))
      );
      return response.data;
    } catch (err:any) {
      setError(err.message || "Failed to assign bus to route");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    routes,
    currentRoute,
    isLoading,
    error,
    fetchRoutes,
    fetchRouteById,
    addRoute,
    modifyRoute,
    removeRoute,
    assignBus,
    setCurrentRoute,
  };
};